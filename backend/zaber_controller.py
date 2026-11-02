#!/usr/bin/env python3
"""Zaber Rotary Stage Controller for Hotword & Bystander Evaluation.

Controls the Zaber X-RSW60A motorized rotary stage to automate angular
positioning (0° to 360°) of smart glasses during wearer and bystander
hotword evaluation trials.

Supports two hardware backends automatically:
  1. Official `zaber_motion` library (if installed)
  2. Built-in Zero-Dependency POSIX Serial ASCII Driver (`os` + `termios` at 115200 8N1)
     which requires ZERO pip packages and works out-of-the-box on any macOS/Linux system.
"""

import fcntl
import glob
import logging
import os
import re
import select
import subprocess
import sys
import termios
import threading
import time
from typing import Any, Callable, Dict, Optional

logger = logging.getLogger("ZaberController")
if not logger.handlers:
    logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] [Zaber] %(message)s")

ZABER_AVAILABLE = False
try:
    from zaber_motion import Units
    from zaber_motion.ascii import Connection
    ZABER_AVAILABLE = True
except ImportError:
    logger.info("zaber_motion package not found — attempting quick install or using built-in Native POSIX ASCII Serial driver...")
    for install_cmd in (
        [sys.executable, "-m", "pip", "install", "--user", "--break-system-packages", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
        [sys.executable, "-m", "pip", "install", "--break-system-packages", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
        [sys.executable, "-m", "pip", "install", "--user", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
        [sys.executable, "-m", "pip", "install", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
    ):
        try:
            res = subprocess.run(install_cmd, capture_output=True, text=True, timeout=45)
            if res.returncode == 0:
                import importlib
                import site
                importlib.invalidate_caches()
                try:
                    user_site = site.getusersitepackages()
                    if user_site and user_site not in sys.path:
                        sys.path.insert(0, user_site)
                except Exception:
                    pass
                from zaber_motion import Units
                from zaber_motion.ascii import Connection
                ZABER_AVAILABLE = True
                logger.info("Successfully auto-installed and imported zaber_motion!")
                break
        except Exception:
            pass
    if not ZABER_AVAILABLE:
        logger.info("Using built-in Zero-Dependency Native POSIX Serial driver (115200 8N1 Zaber ASCII protocol).")


class _NativePosixZaberStage:
    """Zero-dependency POSIX serial driver for Zaber X-RSW60A using Zaber ASCII protocol (115200 8N1)."""

    REPLY_RE = re.compile(r"^@(\d+)\s+(\d+)\s+(OK|RJ)\s+(IDLE|BUSY)\s+(\S+)\s+(.*)$")

    def __init__(self, port: str):
        self.port = port
        self.fd: Optional[int] = None
        self.cycle_steps: int = 2400000  # Default X-RSW60A: 2,400,000 microsteps per 360°
        self.serial_number: str = "X-RSW60A"
        self.device_name: str = "Zaber X-RSW60A (Native Serial)"
        self.is_homed_flag: bool = True
        self._io_lock = threading.RLock()
        self._open()

    def _open(self):
        fd = os.open(self.port, os.O_RDWR | os.O_NOCTTY | os.O_NONBLOCK)
        flags = fcntl.fcntl(fd, fcntl.F_GETFL)
        fcntl.fcntl(fd, fcntl.F_SETFL, flags & ~os.O_NONBLOCK)

        attrs = termios.tcgetattr(fd)
        attrs[0] &= ~(
            termios.IGNBRK | termios.BRKINT | termios.PARMRK | termios.ISTRIP |
            termios.INLCR | termios.IGNCR | termios.ICRNL | termios.IXON |
            termios.IXOFF | termios.IXANY
        )
        attrs[1] &= ~termios.OPOST
        attrs[2] &= ~(termios.CSIZE | termios.PARENB | termios.CSTOPB)
        if hasattr(termios, "CRTSCTS"):
            attrs[2] &= ~termios.CRTSCTS
        attrs[2] |= (termios.CS8 | termios.CREAD | termios.CLOCAL)
        attrs[3] &= ~(termios.ECHO | termios.ECHONL | termios.ICANON | termios.ISIG | termios.IEXTEN)
        attrs[4] = termios.B115200
        attrs[5] = termios.B115200
        attrs[6][termios.VMIN] = 0
        attrs[6][termios.VTIME] = 2
        termios.tcsetattr(fd, termios.TCSANOW, attrs)
        termios.tcflush(fd, termios.TCIOFLUSH)
        self.fd = fd

    def close(self):
        with self._io_lock:
            if self.fd is not None:
                try:
                    os.close(self.fd)
                except Exception:
                    pass
                self.fd = None

    def send_command(self, cmd: str, timeout: float = 1.5) -> Optional[Dict[str, str]]:
        """Sends a Zaber ASCII command and parses the @01 reply line."""
        with self._io_lock:
            if self.fd is None:
                raise RuntimeError("Serial port is not open.")
            termios.tcflush(self.fd, termios.TCIFLUSH)
            payload = (cmd.strip() + "\r\n").encode("ascii")
            os.write(self.fd, payload)

            buf = b""
            deadline = time.time() + timeout
            while time.time() < deadline:
                rlist, _, _ = select.select([self.fd], [], [], 0.15)
                if rlist:
                    chunk = os.read(self.fd, 512)
                    if not chunk:
                        break
                    buf += chunk
                    while b"\n" in buf:
                        raw_line, buf = buf.split(b"\n", 1)
                        line = raw_line.decode("ascii", errors="ignore").strip()
                        m = self.REPLY_RE.match(line)
                        if m:
                            return {
                                "device": m.group(1),
                                "axis": m.group(2),
                                "reply_flag": m.group(3),
                                "status": m.group(4),
                                "warning": m.group(5),
                                "data": m.group(6).strip(),
                            }
            return None

    def probe_and_initialize(self) -> bool:
        """Queries device serial, cycle steps (360°), and current position."""
        reply = self.send_command("/1 0 get system.serial", timeout=1.2)
        if not reply:
            # Try broadcast query in case device number is not 1
            reply = self.send_command("/0 0 get system.serial", timeout=1.2)
        if not reply:
            return False

        if reply.get("data", "").isdigit():
            self.serial_number = reply["data"]

        cyc = self.send_command("/1 1 get limit.cycle.dist", timeout=1.0)
        if cyc and cyc.get("reply_flag") == "OK":
            try:
                val = int(float(cyc["data"].split()[0]))
                if val >= 36000:
                    self.cycle_steps = val
            except Exception:
                pass

        pos_rep = self.send_command("/1 1 get pos", timeout=1.0)
        if pos_rep:
            warn = pos_rep.get("warning", "--")
            self.is_homed_flag = warn not in ("WR", "WH", "NC")
        return True

    def is_homed(self) -> bool:
        rep = self.send_command("/1 1 get pos", timeout=1.0)
        if rep:
            warn = rep.get("warning", "--")
            self.is_homed_flag = warn not in ("WR", "WH", "NC")
        return self.is_homed_flag

    def wait_until_idle(self, timeout: float = 25.0):
        deadline = time.time() + timeout
        while time.time() < deadline:
            rep = self.send_command("/1 1 get pos", timeout=1.0)
            if rep and rep.get("status") == "IDLE":
                warn = rep.get("warning", "--")
                self.is_homed_flag = warn not in ("WR", "WH", "NC")
                return
            time.sleep(0.12)

    def home(self):
        rep = self.send_command("/1 1 home", timeout=2.0)
        if not rep or rep.get("reply_flag") != "OK":
            raise RuntimeError(f"Zaber home command rejected: {rep}")
        self.wait_until_idle(timeout=30.0)
        self.is_homed_flag = True

    def get_position_degrees(self) -> float:
        rep = self.send_command("/1 1 get pos", timeout=1.0)
        if rep and rep.get("reply_flag") == "OK":
            try:
                steps = float(rep["data"].split()[0])
                return ((steps / float(self.cycle_steps)) * 360.0) % 360.0
            except Exception:
                pass
        return 0.0

    def move_absolute_degrees(self, angle_deg: float):
        steps = int(round(((angle_deg % 360.0) / 360.0) * float(self.cycle_steps)))
        rep = self.send_command(f"/1 1 move abs {steps}", timeout=2.0)
        if not rep or rep.get("reply_flag") != "OK":
            raise RuntimeError(f"Zaber move abs {steps} rejected: {rep}")
        self.wait_until_idle(timeout=25.0)


class ZaberController:
    """Thread-safe controller for Zaber X-RSW60A rotary stage."""

    def __init__(self, port: Optional[str] = None):
        self.preferred_port = port or os.environ.get("ZABER_PORT", "")
        self.active_port: Optional[str] = None
        self.connection: Optional[Any] = None
        self.device: Optional[Any] = None
        self.axis: Optional[Any] = None
        self._native_stage: Optional[_NativePosixZaberStage] = None
        self.device_name: str = "Unknown"
        self.serial_number: str = "Unknown"

        self.is_connected: bool = False
        self.is_homed: bool = False
        self.is_moving: bool = False
        self.auto_rotate: bool = True
        self.invert_direction: bool = False

        self.current_angle: float = 0.0
        self.target_angle: float = 0.0
        self.last_error: Optional[str] = None

        self._lock = threading.RLock()
        self._move_thread: Optional[threading.Thread] = None
        self._listeners: list[Callable[[Dict[str, Any]], None]] = []
        self._last_connect_attempt: float = time.time()

    def add_listener(self, callback: Callable[[Dict[str, Any]], None]):
        """Register a callback for stage status events."""
        with self._lock:
            if callback not in self._listeners:
                self._listeners.append(callback)

    def _notify(self, event_type: str, data: Dict[str, Any]):
        """Notify registered listeners of status changes."""
        payload = {"event_type": event_type, "timestamp_ms": int(time.time() * 1000), **data}
        with self._lock:
            listeners = list(self._listeners)
        for cb in listeners:
            try:
                cb(payload)
            except Exception as e:
                logger.error("Error in status listener callback: %s", e)

    def find_serial_port(self) -> Optional[str]:
        """Finds the available Zaber USB serial port across macOS and Linux."""
        if self.preferred_port and glob.glob(self.preferred_port):
            return self.preferred_port
        for pattern in (
            "/dev/cu.usbserial*",
            "/dev/cu.usbmodem*",
            "/dev/cu.SLAB_USBtoUART*",
            "/dev/cu.wchusbserial*",
            "/dev/ttyUSB*",
            "/dev/ttyACM*",
        ):
            candidates = sorted(glob.glob(pattern))
            if candidates:
                return candidates[0]
        return None

    def _release_busy_port(self, target_port: str):
        """Releases stale processes holding the serial port."""
        try:
            out = subprocess.check_output(["lsof", "-t", target_port], text=True).strip()
            my_pid = str(os.getpid())
            for pid_str in out.splitlines():
                pid_str = pid_str.strip()
                if pid_str and pid_str != my_pid:
                    subprocess.run(["kill", "-9", pid_str], check=False)
            time.sleep(0.4)
        except Exception:
            pass

    def connect(self, port: Optional[str] = None) -> bool:
        """Connects to the Zaber device and initializes axis 1 (via zaber_motion or Native POSIX Serial)."""
        self._last_connect_attempt = time.time()

        with self._lock:
            self._last_connect_attempt = time.time()
            target_port = port or self.find_serial_port()
            if not target_port:
                self.last_error = "No USB serial port found for Zaber stage."
                logger.warning(self.last_error)
                return False

            if self.is_connected and self.active_port == target_port and port is None:
                if (self.connection and self.axis) or self._native_stage:
                    return True

            # Close any existing connections
            self._close_handles()

            # 1. Try zaber_motion if available
            if ZABER_AVAILABLE:
                try:
                    logger.info("Opening serial port via zaber_motion: %s...", target_port)
                    try:
                        self.connection = Connection.open_serial_port(target_port)
                    except Exception as open_err:
                        if "Busy" in str(open_err) or "already opened" in str(open_err):
                            logger.warning("Serial port %s is busy. Releasing stale holder processes...", target_port)
                            self._release_busy_port(target_port)
                            self.connection = Connection.open_serial_port(target_port)
                        else:
                            raise open_err

                    devices = self.connection.detect_devices()
                    if not devices:
                        raise RuntimeError(f"No Zaber devices detected on port {target_port}.")

                    self.device = devices[0]
                    self.axis = self.device.get_axis(1)
                    self.device_name = self.device.name
                    self.serial_number = str(self.device.serial_number)
                    self.active_port = target_port
                    self.is_connected = True
                    self.last_error = None

                    try:
                        self.is_homed = bool(self.axis.is_homed())
                        if not self.is_homed:
                            logger.info("Zaber stage is not homed yet — auto-homing to 0°...")
                            self.axis.home()
                            self.is_homed = True
                    except Exception as home_chk_err:
                        logger.warning("Homing check warning: %s", home_chk_err)

                    try:
                        self.current_angle = round(self.axis.get_position(Units.ANGLE_DEGREES), 2)
                        self.target_angle = self.current_angle
                    except Exception:
                        self.current_angle = 0.0

                    logger.info(
                        "Connected to %s (SN: %s) on %s at angle: %.2f° (homed=%s)",
                        self.device_name, self.serial_number, self.active_port, self.current_angle, self.is_homed
                    )
                    self._notify("STAGE_CONNECTED", self.get_status(auto_reconnect=False))
                    return True
                except Exception as zm_err:
                    logger.warning("zaber_motion connection attempt failed (%s), trying Native POSIX Serial driver...", zm_err)
                    self._close_handles()

            # 2. Fallback / Primary Zero-Dependency Native POSIX Serial Driver (115200 8N1)
            try:
                logger.info("Opening serial port via Native POSIX ASCII driver: %s...", target_port)
                try:
                    native = _NativePosixZaberStage(target_port)
                except OSError as os_err:
                    logger.warning("Serial port %s busy (%s). Releasing stale holder processes...", target_port, os_err)
                    self._release_busy_port(target_port)
                    native = _NativePosixZaberStage(target_port)

                if not native.probe_and_initialize():
                    native.close()
                    self.last_error = f"No Zaber ASCII response on port {target_port}."
                    logger.warning(self.last_error)
                    return False

                self._native_stage = native
                self.device_name = native.device_name
                self.serial_number = native.serial_number
                self.active_port = target_port
                self.is_connected = True
                self.last_error = None

                try:
                    self.is_homed = native.is_homed()
                    if not self.is_homed:
                        logger.info("Zaber stage is not homed yet — auto-homing to 0° via Native ASCII...")
                        native.home()
                        self.is_homed = True
                except Exception as home_err:
                    logger.warning("Native homing check warning: %s", home_err)

                try:
                    self.current_angle = round(native.get_position_degrees(), 2)
                    self.target_angle = self.current_angle
                except Exception:
                    self.current_angle = 0.0

                logger.info(
                    "Connected to %s (SN: %s, %d steps/rev) on %s at angle: %.2f° (homed=%s)",
                    self.device_name, self.serial_number, native.cycle_steps,
                    self.active_port, self.current_angle, self.is_homed
                )
                self._notify("STAGE_CONNECTED", self.get_status(auto_reconnect=False))
                return True

            except Exception as e:
                self.last_error = str(e)
                self._close_handles()
                logger.error("Failed to connect to Zaber stage on %s: %s", target_port, e)
                return False

    def _close_handles(self):
        if self.connection:
            try:
                self.connection.close()
            except Exception:
                pass
        if self._native_stage:
            try:
                self._native_stage.close()
            except Exception:
                pass
        self.connection = None
        self.device = None
        self.axis = None
        self._native_stage = None
        self.is_connected = False

    def home(self, wait: bool = True) -> bool:
        """Homes the rotary stage to establish the 0° absolute reference."""
        if not self.is_connected or (not self.axis and not self._native_stage):
            if not self.connect():
                return False

        def _do_home():
            with self._lock:
                self.is_moving = True
                self.last_error = None
            self._notify("STAGE_HOMING_STARTED", {"target_angle": 0.0})

            try:
                logger.info("Homing Zaber axis 1 to establish 0° reference...")
                if self.axis is not None:
                    self.axis.home()
                elif self._native_stage is not None:
                    self._native_stage.home()
                with self._lock:
                    self.current_angle = 0.0
                    self.target_angle = 0.0
                    self.is_homed = True
                    self.is_moving = False
                logger.info("Zaber stage successfully homed at 0.0°.")
                self._notify("STAGE_HOMED", self.get_status())
                return True
            except Exception as e:
                with self._lock:
                    self.last_error = str(e)
                    self.is_moving = False
                logger.error("Failed to home stage: %s", e)
                self._notify("STAGE_ERROR", {"error": str(e)})
                return False

        if wait:
            return _do_home()
        else:
            t = threading.Thread(target=_do_home, daemon=True)
            t.start()
            return True

    def move_to_angle(self, angle_deg: float, wait: bool = True) -> bool:
        """Moves stage to specified absolute angle (0.0° to 360.0°)."""
        if not self.is_connected or (not self.axis and not self._native_stage):
            if not self.connect():
                return False

        norm_angle = float(angle_deg) % 360.0
        if self.invert_direction:
            effective_angle = (360.0 - norm_angle) % 360.0
        else:
            effective_angle = norm_angle

        if abs(self.current_angle - effective_angle) < 0.15:
            logger.info("Stage already at %.2f° (delta < 0.15°). Skipping move.", effective_angle)
            self.target_angle = effective_angle
            return True

        def _do_move():
            with self._lock:
                self.is_moving = True
                self.target_angle = effective_angle
                self.last_error = None
            self._notify("STAGE_MOVE_STARTED", {
                "target_angle": effective_angle,
                "requested_angle": norm_angle,
                "current_angle": self.current_angle
            })

            try:
                logger.info("Rotating Zaber stage to %.2f° (requested: %.2f°)...", effective_angle, norm_angle)
                if self.axis is not None:
                    self.axis.move_absolute(effective_angle, Units.ANGLE_DEGREES)
                    new_pos = round(self.axis.get_position(Units.ANGLE_DEGREES), 2)
                elif self._native_stage is not None:
                    self._native_stage.move_absolute_degrees(effective_angle)
                    new_pos = round(self._native_stage.get_position_degrees(), 2)
                else:
                    raise RuntimeError("Stage handle lost.")
                with self._lock:
                    self.current_angle = new_pos
                    self.is_moving = False
                logger.info("Stage reached target position: %.2f°.", new_pos)
                self._notify("STAGE_MOVED", self.get_status())
                return True
            except Exception as e:
                with self._lock:
                    self.last_error = str(e)
                    self.is_moving = False
                logger.error("Failed to move stage to %.2f°: %s", effective_angle, e)
                self._notify("STAGE_ERROR", {"error": str(e), "target_angle": effective_angle})
                return False

        if wait:
            return _do_move()
        else:
            with self._lock:
                self._move_thread = threading.Thread(target=_do_move, daemon=True)
                self._move_thread.start()
            return True

    def handle_trial_event(self, trial_data: Dict[str, Any]) -> bool:
        """Automatically parses trial angle and rotates the stage if auto_rotate is enabled."""
        if not self.auto_rotate:
            return False

        deg_str = trial_data.get("degree")
        if not deg_str and "condition" in trial_data:
            cond = str(trial_data["condition"])
            if "Angle:" in cond:
                try:
                    deg_str = cond.split("Angle:")[1].strip().split()[0]
                except Exception:
                    pass

        if not deg_str:
            return False

        try:
            cleaned = str(deg_str).replace("°", "").replace("deg", "").strip()
            target_deg = float(cleaned)
            logger.info("Auto-rotator triggered for trial: %s, angle: %.1f°", trial_data.get("trial_id", "N/A"), target_deg)
            return self.move_to_angle(target_deg, wait=False)
        except Exception as e:
            logger.warning("Could not parse angle from '%s': %s", deg_str, e)
            return False

    def get_status(self, auto_reconnect: bool = True) -> Dict[str, Any]:
        """Returns the current state dictionary for API / UI responses."""
        if auto_reconnect and not self.is_connected:
            now = time.time()
            last_try = getattr(self, "_last_connect_attempt", 0.0)
            if (now - last_try) > 4.0 and self.find_serial_port():
                self._last_connect_attempt = now
                try:
                    self.connect()
                except Exception:
                    pass

        with self._lock:
            if self.is_connected and not self.is_moving:
                try:
                    if self.axis is not None:
                        self.current_angle = round(self.axis.get_position(Units.ANGLE_DEGREES), 2)
                    elif self._native_stage is not None:
                        self.current_angle = round(self._native_stage.get_position_degrees(), 2)
                except Exception as pos_err:
                    logger.warning("Zaber serial connection lost (%s). Marking disconnected for auto-recovery.", pos_err)
                    self._close_handles()
                    self.last_error = "USB connection lost — waiting for stage reconnect..."

            return {
                "zaber_library_available": True,
                "connected": self.is_connected,
                "homed": self.is_homed,
                "is_moving": self.is_moving,
                "auto_rotate": self.auto_rotate,
                "invert_direction": self.invert_direction,
                "current_angle": self.current_angle,
                "target_angle": self.target_angle,
                "device_name": self.device_name,
                "serial_number": self.serial_number,
                "port": self.active_port,
                "available_port": self.find_serial_port(),
                "last_error": self.last_error
            }

    def close(self):
        """Closes the serial port connection."""
        with self._lock:
            self._close_handles()
            logger.info("Zaber serial connection closed.")


stage_controller = ZaberController()
