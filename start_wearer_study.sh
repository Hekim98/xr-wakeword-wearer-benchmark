#!/usr/bin/env bash
# ==============================================================================
# Smart Glasses Wearer Hotword Evaluation Rig — Turnkey Launcher
# Mode: Wearer Study (Human Wearer + Noise Environments, No Rotary Stage)
# Hardware:
#   1. RØDE Wireless PRO RX (Connected to Mac via USB-C)
#      -> Paired with TX1 Transmitter + Deity W.Lav micro 3mm on glasses
#   2. Companion Phone (Paired with glasses, connected to Mac via USB with ADB)
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${1:-8080}"

echo ""
echo "========================================================================"
echo "👓  SMART GLASSES WEARER HOTWORD EVALUATION RIG"
echo "    Mode:     Wearer Testing (Acoustic Noise Robustness)"
echo "    Hardware: RØDE Wireless PRO RX (USB) + Companion Phone (ADB)"
echo "========================================================================"
echo ""

# ------------------------------------------------------------------------------
# 1. Check Python 3 Environment
# ------------------------------------------------------------------------------
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 is not installed or not in PATH."
    echo "   Please install Python 3.9+ from https://www.python.org or via Homebrew: brew install python3"
    exit 1
fi

PY_VER=$(python3 --version 2>&1)
echo "🐍 Python Runtime: $PY_VER"

# Activate local virtualenv if it exists
if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
fi

# Ensure zaber-motion & reactivex are installed (for Bystander 360° Rotary Stage support)
if ! python3 -c "import zaber_motion, reactivex" 2>/dev/null; then
    echo "📦 Installing Zaber Rotary Stage packages ('zaber-motion', 'reactivex')..."
    INSTALLED=false
    if pip3 install --user --break-system-packages -r requirements.txt 2>/dev/null || python3 -m pip install --user --break-system-packages -r requirements.txt 2>/dev/null; then
        INSTALLED=true
    elif pip3 install --user -r requirements.txt 2>/dev/null || python3 -m pip install -r requirements.txt 2>/dev/null; then
        INSTALLED=true
    fi
    if [ "$INSTALLED" = false ]; then
        echo "📁 Setting up local Python virtual environment (.venv)..."
        python3 -m venv .venv
        source .venv/bin/activate
        pip install -r requirements.txt
    fi
    echo "✅ Zaber Stage dependencies ready!"
fi

# Check Zaber Rotary Stage USB Connection
ZABER_PORT=$(ls -1 /dev/cu.usbserial* /dev/cu.usbmodem* /dev/ttyUSB* 2>/dev/null | head -n 1 || true)
if [ -n "$ZABER_PORT" ]; then
    echo "🔄 Zaber Rotary Stage detected on: $ZABER_PORT"
    # Release port if held by an orphaned python process
    STALE_PIDS=$(lsof -t "$ZABER_PORT" 2>/dev/null || true)
    if [ -n "$STALE_PIDS" ]; then
        echo "   🔓 Releasing serial port from previous session (PID: $STALE_PIDS)..."
        kill -9 $STALE_PIDS 2>/dev/null || true
        sleep 0.5
    fi
else
    echo "ℹ️  No Zaber USB serial cable detected (Wearer mode or plug in USB for Bystander stage)."
fi

# ------------------------------------------------------------------------------
# 2. Check & Configure RØDE Wireless PRO Audio Input (macOS)
# ------------------------------------------------------------------------------
echo "🎙️  Checking Audio Hardware..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    # Check if SwitchAudioSource is installed
    SWITCH_CMD=""
    if [ -x "/opt/homebrew/bin/SwitchAudioSource" ]; then
        SWITCH_CMD="/opt/homebrew/bin/SwitchAudioSource"
    elif [ -x "/usr/local/bin/SwitchAudioSource" ]; then
        SWITCH_CMD="/usr/local/bin/SwitchAudioSource"
    elif command -v SwitchAudioSource &> /dev/null; then
        SWITCH_CMD="$(command -v SwitchAudioSource)"
    fi

    # Attempt to install switchaudio-osx if missing and Homebrew is available
    if [ -z "$SWITCH_CMD" ] && command -v brew &> /dev/null; then
        echo "   📦 Installing 'switchaudio-osx' utility via Homebrew..."
        brew install switchaudio-osx 2>/dev/null || true
        if [ -x "/opt/homebrew/bin/SwitchAudioSource" ]; then
            SWITCH_CMD="/opt/homebrew/bin/SwitchAudioSource"
        elif command -v SwitchAudioSource &> /dev/null; then
            SWITCH_CMD="$(command -v SwitchAudioSource)"
        fi
    fi

    # Verify Wireless PRO RX connection
    AUDIO_DEVICES=""
    if [ -n "$SWITCH_CMD" ]; then
        AUDIO_DEVICES=$("$SWITCH_CMD" -a -t input 2>/dev/null || true)
    else
        AUDIO_DEVICES=$(system_profiler SPAudioDataType 2>/dev/null | grep -i "Wireless PRO" || true)
    fi

    if echo "$AUDIO_DEVICES" | grep -qi "Wireless PRO"; then
        echo "   ✅ RØDE Wireless PRO RX detected on USB!"
        if [ -n "$SWITCH_CMD" ]; then
            "$SWITCH_CMD" -t input -s "Wireless PRO RX" 2>/dev/null || true
            CURR_INPUT=$("$SWITCH_CMD" -c -t input 2>/dev/null || true)
            echo "   🔒 System default input locked to: \"$CURR_INPUT\""
        fi
    else
        echo "   ⚠️  WARNING: 'Wireless PRO RX' not found in connected audio inputs!"
        echo "      👉 Please plug the RØDE Wireless PRO RX receiver into your Mac via USB-C."
        echo "      👉 Turn on the TX1 transmitter with the Deity mic attached to the glasses."
        echo "      (The web interface will also alert you if Mac internal mic is active)."
    fi
fi

# ------------------------------------------------------------------------------
# 3. Check & Configure ADB Connection to Companion Phone
# ------------------------------------------------------------------------------
echo "📱 Checking Companion Phone Connection..."
PHONE_FOUND=false

if command -v adb &> /dev/null; then
    ADB_DEVS=$(adb devices 2>/dev/null | grep -v "List of" | grep "device$" | awk '{print $1}' || true)
    
    if [ -n "$ADB_DEVS" ]; then
        for DEV in $ADB_DEVS; do
            DEV_MODEL=$(adb -s "$DEV" shell getprop ro.product.model 2>/dev/null || echo "Android Device")
            echo "   ✅ Phone connected: $DEV ($DEV_MODEL)"
            # Reverse port 8080 so phone can also reach localhost:8080 if needed
            adb -s "$DEV" reverse tcp:"$PORT" tcp:"$PORT" 2>/dev/null || true
            echo "   🔄 Port forwarding active: adb reverse tcp:$PORT -> tcp:$PORT"
            PHONE_FOUND=true
            break
        done
    else
        echo "   ⚠️  No authorized phone detected via ADB."
        echo "      👉 Connect your Android companion phone via USB cable."
        echo "      👉 Ensure Developer Options & USB Debugging are enabled."
    fi
else
    echo "   ℹ️  'adb' command not found in PATH."
    echo "      (If testing with Meta Ray-Ban, ADB is optional)."
fi

# ------------------------------------------------------------------------------
# 4. Detect Wi-Fi IP (for optional phone browsing)
# ------------------------------------------------------------------------------
COMPUTER_IP=""
for iface in en0 en1 en4 wlan0 eth0; do
    IP=$(ipconfig getifaddr "$iface" 2>/dev/null || true)
    if [ -n "$IP" ]; then
        COMPUTER_IP="$IP"
        break
    fi
done

# ------------------------------------------------------------------------------
# 5. Launch Testbed Server & Open Browser
# ------------------------------------------------------------------------------
echo ""
echo "========================================================================"
echo "🚀 STARTING WEARER TESTBED..."
echo "   💻 Web App URL:   http://localhost:${PORT}/"
if [ -n "$COMPUTER_IP" ]; then
    echo "   📱 Network URL:  http://${COMPUTER_IP}:${PORT}/"
fi
echo "========================================================================"
echo "   👉 Press Ctrl+C in this terminal window to stop the server."
echo ""

# Free port if already in use
lsof -ti :"$PORT" 2>/dev/null | xargs kill -9 2>/dev/null || true
sleep 0.5

# Automatically open browser in background after 1 second
(
    sleep 1.2
    if [[ "$OSTYPE" == "darwin"* ]]; then
        open "http://localhost:${PORT}/" 2>/dev/null || true
    elif command -v xdg-open &> /dev/null; then
        xdg-open "http://localhost:${PORT}/" 2>/dev/null || true
    fi
) &

# Run server
exec python3 backend/server.py "$PORT"
