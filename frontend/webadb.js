// Minimal WebUSB ADB implementation for Chrome to do 'adb reverse' and 'am start'
// No local adb binary or terminal required!

class WebADB {
  constructor() {
    this.device = null;
    this.endpointIn = null;
    this.endpointOut = null;
    this.interfaceNumber = null;
  }

  async connect() {
    // ADB USB class: 255 (0xFF), subclass: 66 (0x42), protocol: 1 (0x01)
    this.device = await navigator.usb.requestDevice({
      filters: [{ classCode: 0xFF, subclassCode: 0x42, protocolCode: 0x01 }]
    });

    await this.device.open();
    await this.device.selectConfiguration(1);

    // Find the ADB interface
    const idx = this.device.configuration.interfaces.findIndex(iface =>
      iface.alternates.some(alt => alt.interfaceClass === 0xFF && alt.interfaceSubclass === 0x42 && alt.interfaceProtocol === 0x01)
    );

    if (idx === -1) throw new Error('No ADB interface found on this USB device.');
    this.interfaceNumber = idx;
    await this.device.claimInterface(this.interfaceNumber);

    const alt = this.device.configuration.interfaces[idx].alternates[0];
    this.endpointIn = alt.endpoints.find(e => e.direction === 'in').endpointNumber;
    this.endpointOut = alt.endpoints.find(e => e.direction === 'out').endpointNumber;

    // Send ADB CNXN (Connect) packet
    await this.sendPacket('CNXN', 0x01000000, 1048576, 'host::\0');
    await this.readPacket(); // Expect CNXN or AUTH
  }

  async sendPacket(command, arg0, arg1, data = '') {
    const encoder = new TextEncoder();
    const dataBuf = typeof data === 'string' ? encoder.encode(data) : data;

    // ADB Header: 24 bytes
    const buf = new ArrayBuffer(24 + dataBuf.byteLength);
    const view = new DataView(buf);

    const cmdCode = command.split('').reduce((acc, char, i) => acc | (char.charCodeAt(0) << (i * 8)), 0);
    const magic = cmdCode ^ 0xFFFFFFFF;

    view.setUint32(0, cmdCode, true);
    view.setUint32(4, arg0, true);
    view.setUint32(8, arg1, true);
    view.setUint32(12, dataBuf.byteLength, true);
    
    // Checksum
    let checksum = 0;
    for (let i = 0; i < dataBuf.byteLength; i++) checksum += dataBuf[i];
    view.setUint32(16, checksum & 0xFFFFFFFF, true);

    view.setUint32(20, magic, true);

    // Copy data
    new Uint8Array(buf, 24).set(new Uint8Array(dataBuf));

    await this.device.transferOut(this.endpointOut, buf);
  }

  async readPacket() {
    const res = await this.device.transferIn(this.endpointIn, 24);
    if (res.status !== 'ok') throw new Error('USB read failed');
    const view = new DataView(res.data.buffer);
    const dataLen = view.getUint32(12, true);

    let data = new Uint8Array(0);
    if (dataLen > 0) {
      const dataRes = await this.device.transferIn(this.endpointIn, dataLen);
      data = new Uint8Array(dataRes.data.buffer);
    }
    return {
      command: String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2), view.getUint8(3)),
      arg0: view.getUint32(4, true),
      arg1: view.getUint32(8, true),
      data: data
    };
  }

  async reversePort(port) {
    // Send reverse:forward:tcp:PORT;tcp:PORT
    const req = `reverse:forward:tcp:${port};tcp:${port}\0`;
    await this.sendPacket('OPEN', 1, 0, req);
    await this.readPacket(); // OKAY
  }

  async launchUrl(url) {
    // Send am start -a android.intent.action.VIEW -d URL
    const req = `shell:am start -a android.intent.action.VIEW -d "${url}"\0`;
    await this.sendPacket('OPEN', 2, 0, req);
    await this.readPacket(); // OKAY
  }
}

window.WebADB = WebADB;
