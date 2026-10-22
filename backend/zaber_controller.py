#!/usr/bin/env python3
"""Zaber Rotary Stage Controller for Hotword Evaluation.

Controls the Zaber X-RSW60A motorized rotary stage to automate angular
positioning (0° to 360°) of the Android XR Smart Glasses smart glasses during wearer
and bystander hotword evaluation trials.
"""

import glob
import logging
import os
import subprocess
import sys
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
    logger.warning("zaber_motion library not found. Attempting automatic installation...")
    for install_cmd in (
        [sys.executable, "-m", "pip", "install", "--user", "--break-system-packages", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
        [sys.executable, "-m", "pip", "install", "--break-system-packages", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
        [sys.executable, "-m", "pip", "install", "--user", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
        [sys.executable, "-m", "pip", "install", "zaber-motion>=2.0.0", "reactivex>=4.0.0"],
    ):
        try:
            res = subprocess.run(install_cmd, capture_output=True, text=True, timeout=90)
            if res.returncode == 0:
                import site
                import importlib
                importlib.InvalidateCaches() if hasattr(importlib, "InvalidateCaches") else importlib.invalidate_caches()
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
        except Exception as inst_err:
            logger.debug("Auto-install attempt failed: %s", inst_err)
    if not ZABER_AVAILABLE:
        logger.warning("zaber_motion could not be auto-installed. Running in simulated fallback mode.")


class ZaberController:
    """Thread-safe controller for Zaber X-RSW60A rotary stage."""

    def __init__(self, port: Optional[str] = None):
        self.preferred_port = port or "/dev/cu.usbserial-USB0"
        self.active_port: Optional[str] = None
        self.connection: Optional[Any] = None
        self.device: Optional[Any] = None
        self.axis: Optional[Any] = None
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

    def connect(self, port: Optional[str] = None) -> bool:
        """Connects to the Zaber device and initializes axis 1."""
        self._last_connect_attempt = time.time()
        if not ZABER_AVAILABLE:
            self.last_error = "zaber_motion library not installed."
            return False

        with self._lock:
            self._last_connect_attempt = time.time()
            target_port = port or self.find_serial_port()
            if not target_port:
                self.last_error = "No USB serial port found for Zaber stage."
                logger.warning(self.last_error)
                return False

            if self.is_connected and self.connection and self.axis and self.active_port == target_port and port is None:
                return True

            try:
                # Close existing connection if open
                if self.connection:
                    try:
                        self.connection.close()
                    except Exception:
                        pass

                logger.info("Opening serial port: %s...", target_port)
                try:
                    self.connection = Connection.open_serial_port(target_port)
                except Exception as open_err:
                    if "Busy" in str(open_err) or "already opened" in str(open_err):
                        logger.warning("Serial port %s is busy. Releasing stale holder processes...", target_port)
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
                        self.connection = Connection.open_serial_port(target_port)
                    else:
                        raise open_err

                devices = self.connection.detect_devices()
                if not devices:
                    self.last_error = f"No Zaber devices detected on port {target_port}."
                    logger.warning(self.last_error)
                    self.connection.close()
                    self.connection = None
                    return False

                self.device = devices[0]
                self.axis = self.device.get_axis(1)
                self.device_name = self.device.name
                self.serial_number = str(self.device.serial_number)
                self.active_port = target_port
                self.is_connected = True
                self.last_error = None

                # Ensure axis is homed so absolute angle movements always succeed
                try:
                    self.is_homed = bool(self.axis.is_homed())
                    if not self.is_homed:
                        logger.info("Zaber stage is not homed yet — auto-homing to 0°...")
                        self.axis.home()
                        self.is_homed = True
                except Exception as home_chk_err:
                    logger.warning("Homing check warning: %s", home_chk_err)

                # Read current position
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

            except Exception as e:
                self.last_error = str(e)
                self.is_connected = False
                self.connection = None
                self.device = None
                self.axis = None
                logger.error("Failed to connect to Zaber stage: %s", e)
                return False

    def home(self, wait: bool = True) -> bool:
        """Homes the rotary stage to establish the 0° absolute reference."""
        if not self.is_connected or not self.axis:
            if not self.connect():
                return False

        def _do_home():
            with self._lock:
                self.is_moving = True
                self.last_error = None
            self._notify("STAGE_HOMING_STARTED", {"target_angle": 0.0})

            try:
                logger.info("Homing Zaber axis 1 to establish 0° reference...")
                self.axis.home()
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
        if not self.is_connected or not self.axis:
            if not self.connect():
                return False

        # Normalize target angle to [0, 360)
        norm_angle = float(angle_deg) % 360.0
        if self.invert_direction:
            effective_angle = (360.0 - norm_angle) % 360.0
        else:
            effective_angle = norm_angle

        # Check if already within tolerance (0.15°)
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
                self.axis.move_absolute(effective_angle, Units.ANGLE_DEGREES)
                new_pos = round(self.axis.get_position(Units.ANGLE_DEGREES), 2)
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
                if self._move_thread and self._move_thread.is_alive():
                    # Wait for previous move or let it complete
                    pass
                self._move_thread = threading.Thread(target=_do_move, daemon=True)
                self._move_thread.start()
            return True

    def handle_trial_event(self, trial_data: Dict[str, Any]) -> bool:
        """Automatically parses trial angle and rotates the stage if auto_rotate is enabled."""
        if not self.auto_rotate:
            return False

        # Extract angle from 'degree' or 'condition'
        deg_str = trial_data.get("degree")
        if not deg_str and "condition" in trial_data:
            # Check for pattern like "Angle: 90°" or "90°"
            cond = str(trial_data["condition"])
            if "Angle:" in cond:
                try:
                    deg_str = cond.split("Angle:")[1].strip().split()[0]
                except Exception:
                    pass

        if not deg_str:
            return False

        try:
            # Clean string like "90°" or "90 deg" -> 90.0
            cleaned = str(deg_str).replace("°", "").replace("deg", "").strip()
            target_deg = float(cleaned)
            logger.info("Auto-rotator triggered for trial: %s, angle: %.1f°", trial_data.get("trial_id", "N/A"), target_deg)
            # Move asynchronously so HTTP handling is not blocked
            return self.move_to_angle(target_deg, wait=False)
        except Exception as e:
            logger.warning("Could not parse angle from '%s': %s", deg_str, e)
            return False

    def get_status(self, auto_reconnect: bool = True) -> Dict[str, Any]:
        """Returns the current state dictionary for API / UI responses."""
        if auto_reconnect and not self.is_connected and ZABER_AVAILABLE:
            now = time.time()
            last_try = getattr(self, "_last_connect_attempt", 0.0)
            if (now - last_try) > 4.0 and self.find_serial_port():
                self._last_connect_attempt = now
                try:
                    self.connect()
                except Exception:
                    pass
        port_val = self.active_port if self.is_connected else ""
        return {
            "connected": self.is_connected,
            "device_name": self.device_name,
            "deviceName": self.device_name,
            "serial_number": self.serial_number,
            "serialNumber": self.serial_number,
            "port": port_val,
            "current_angle": self.current_angle,
            "currentAngle": self.current_angle,
            "target_angle": self.target_angle,
            "targetAngle": self.target_angle,
            "is_homed": self.is_homed,
            "isHomed": self.is_homed,
            "is_moving": self.is_moving,
            "isMoving": self.is_moving,
            "auto_rotate": self.auto_rotate,
            "autoRotate": self.auto_rotate,
            "invert_direction": self.invert_direction,
            "invertDirection": self.invert_direction,
            "last_error": self.last_error
        }

    def close(self):
        """Closes connection cleanly."""
        with self._lock:
            if self.connection:
                try:
                    self.connection.close()
                except Exception:
                    pass
                self.connection = None
                self.device = None
                self.axis = None
                self.is_connected = False
                logger.info("Zaber stage connection closed.")


# Global Singleton Instance
stage_controller = ZaberController()
