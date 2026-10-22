#!/usr/bin/env bash
# ==============================================================================
# Smart Glasses Hotword & Bystander Evaluation Testbed Launcher
# Supports: Android XR Smart Glasses (Google Android XR) & Meta Ray-Ban (Meta AI)
# ==============================================================================
# Usage: ./start_testbed.sh [PORT] (Default port is 8080)
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

PORT="${1:-8080}"

echo ""
echo "========================================================================"
echo "🕶️  SMART GLASSES HOTWORD & BYSTANDER STUDY TESTBED"
echo "    Hardware: Zaber X-RSW60A Rotary Stage (360° Automated Positioning)"
echo "    Devices:  Android XR Smart Glasses (Android XR) | Meta Ray-Ban (Meta AI)"
echo "========================================================================"
echo "Step 1: Ensure Zaber rotary stage power and USB cable are connected."
echo "Step 2: (Optional) Connect Android XR Smart Glasses or Android phone via USB to configure wireless."
echo ""

# 1. Check Python 3
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: python3 is not installed or not found in PATH."
    echo "   Please install Python 3.9+ from https://www.python.org or via homebrew: brew install python3"
    exit 1
fi

PY_VERSION=$(python3 --version 2>&1)
echo "🐍 Python Runtime: $PY_VERSION"

# 2. Check and Install Dependencies
# Activate local virtualenv if it already exists
if [ -f ".venv/bin/activate" ]; then
    source .venv/bin/activate
fi

if ! python3 -c "import zaber_motion, reactivex" 2>/dev/null; then
    echo "📦 Required packages ('zaber-motion', 'reactivex') missing. Installing..."
    
    INSTALLED=false
    # 2A. Try install with --break-system-packages (for Homebrew / system Python 3.12+ PEP 668)
    if pip3 install --user --break-system-packages -r requirements.txt 2>/dev/null || python3 -m pip install --user --break-system-packages -r requirements.txt 2>/dev/null; then
        INSTALLED=true
    elif pip3 install --user -r requirements.txt 2>/dev/null || python3 -m pip install -r requirements.txt 2>/dev/null; then
        INSTALLED=true
    fi

    # 2B. If system strictly blocks user installation, create a self-contained local .venv
    if [ "$INSTALLED" = false ]; then
        echo "📁 Externally managed Python detected. Setting up local environment (.venv)..."
        python3 -m venv .venv
        source .venv/bin/activate
        pip install -r requirements.txt
        INSTALLED=true
    fi

    if [ "$INSTALLED" = true ]; then
        echo "✅ Dependencies installed successfully!"
    fi
fi

# 3. Detect Zaber Rotary Stage
ZABER_PORT=$(ls -1 /dev/cu.usbserial* /dev/cu.usbmodem* /dev/ttyUSB* 2>/dev/null | head -n 1 || true)
if [ -n "$ZABER_PORT" ]; then
    echo "🔄 Zaber Rotary Stage detected on: $ZABER_PORT"
    STALE_PIDS=$(lsof -t "$ZABER_PORT" 2>/dev/null || true)
    if [ -n "$STALE_PIDS" ]; then
        echo "   🔓 Releasing serial port from previous session (PID: $STALE_PIDS)..."
        kill -9 $STALE_PIDS 2>/dev/null || true
        sleep 0.5
    fi
else
    echo "⚠️  No Zaber USB serial device detected (/dev/cu.usbserial* or /dev/ttyUSB*)."
    echo "   Ensure the Zaber X-RSW60A power adapter and USB cable are securely plugged in."
    echo "   (Running in software-only mode until stage is plugged in)."
fi

# 4. Detect Local Computer Wi-Fi IP
COMPUTER_IP=""
for iface in en0 en1 en4 wlan0 eth0; do
    IP=$(ipconfig getifaddr "$iface" 2>/dev/null || true)
    if [ -n "$IP" ]; then
        COMPUTER_IP="$IP"
        break
    fi
done

if [ -z "$COMPUTER_IP" ]; then
    COMPUTER_IP=$(ifconfig 2>/dev/null | grep "inet " | grep -v "127.0.0.1" | grep -v "192.0.0." | awk '{print $2}' | head -n 1 || true)
fi

echo "💻 Computer Wi-Fi IP: ${COMPUTER_IP:-127.0.0.1}"

# 5. Detect and Configure Android Devices (Phone + Android XR Smart Glasses Glasses)
PHONE_WIRELESS_READY=false
PHONE_IP=""
GLASSES_DETECTED=false

if command -v adb &> /dev/null; then
    ALL_DEVICES=$(adb devices 2>/dev/null | grep -v "List of" | grep "device$" | awk '{print $1}' || true)
    
    for DEV in $ALL_DEVICES; do
        DEV_MODEL=$(adb -s "$DEV" shell getprop ro.product.model 2>/dev/null || true)
        
        # Check if device is Android XR Smart Glasses Glasses
        if [[ "$DEV_MODEL" == *"XR_DEV"* ]] || [[ "$DEV_MODEL" == *"xr_glasses"* ]] || [[ "$DEV_MODEL" == *"XR_GLASSES_DEV"* ]]; then
            GLASSES_DETECTED=true
            echo "🕶️  Android XR Smart Glasses Glasses detected: $DEV ($DEV_MODEL)"
            echo "   ⚡ Overriding wear detection state to WORN..."
            adb -s "$DEV" shell cmd xr_sensor wear_override on 2>/dev/null || true
            
            # Setup Wireless ADB if cabled
            if [[ "$DEV" != *":5555"* ]]; then
                G_IP=$(adb -s "$DEV" shell "ip -f inet addr show wlan0" 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d/ -f1 || true)
                if [ -n "$G_IP" ]; then
                    echo "   📶 Glasses Wi-Fi IP: $G_IP"
                    adb -s "$DEV" tcpip 5555 2>/dev/null || true
                    sleep 0.5
                    adb connect "$G_IP:5555" 2>/dev/null || true
                fi
            fi
        else
            # Android Phone
            if [[ "$DEV" != *":5555"* ]]; then
                echo "📱 Android Phone detected via USB: $DEV"
                PHONE_IP=$(adb -s "$DEV" shell "ip -f inet addr show wlan0" 2>/dev/null | grep "inet " | awk '{print $2}' | cut -d/ -f1 || true)
                if [ -n "$PHONE_IP" ]; then
                    echo "📶 Phone Wi-Fi IP: $PHONE_IP"
                    if ping -c 1 -t 2 "$PHONE_IP" &>/dev/null; then
                        echo "🔌 Activating Wireless ADB on phone..."
                        adb -s "$DEV" tcpip 5555 2>/dev/null || true
                        sleep 1
                        adb connect "$PHONE_IP:5555" 2>/dev/null || true
                        sleep 0.5
                        PHONE_WIRELESS_READY=true
                        
                        TARGET_URL="http://${COMPUTER_IP}:${PORT}"
                        echo "🌐 Opening test interface on phone: $TARGET_URL"
                        adb -s "$PHONE_IP:5555" shell "am start -n com.android.chrome/com.google.android.apps.chrome.Main -d '$TARGET_URL'" 2>/dev/null || true
                    else
                        adb -s "$DEV" reverse tcp:"$PORT" tcp:"$PORT" 2>/dev/null || true
                    fi
                else
                    adb -s "$DEV" reverse tcp:"$PORT" tcp:"$PORT" 2>/dev/null || true
                fi
            else
                echo "📱 Android Phone connected wirelessly via ADB: $DEV"
                PHONE_WIRELESS_READY=true
            fi
        fi
    done
else
    echo "ℹ️  'adb' command not found. (Not required for Meta Ray-Ban or manual testing)."
fi

echo ""
echo "========================================================================"
if [ "$PHONE_WIRELESS_READY" = true ]; then
    echo "🎉 WIRELESS CONFIGURATION COMPLETED!"
    echo "   👉 You can now unplug all USB cables from your phone & glasses."
    if [ "$GLASSES_DETECTED" = true ]; then
        echo "   🕶️  Glasses status: WORN (Override Active — Hotwords Fully Enabled!)"
    fi
    echo ""
    echo "📱 Mobile Evaluator UI: http://${COMPUTER_IP}:${PORT}"
else
    echo "🌐 TESTBED READY"
    if [ -n "$COMPUTER_IP" ]; then
        echo "📱 Phone / Evaluator URL (Same Wi-Fi): http://${COMPUTER_IP}:${PORT}"
    fi
    echo "💻 Computer Browser URL:                http://localhost:${PORT}"
fi
echo "========================================================================"
echo ""
echo "🚀 Starting Testbed Server on port ${PORT}..."
echo "   Press Ctrl+C at any time to shut down."
echo ""

# Free port 8080 if lingering from previous run
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

# Start backend server
exec python3 backend/server.py "$PORT"
