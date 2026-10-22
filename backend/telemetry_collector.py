#!/usr/bin/env python3
"""Telemetry Collector for Hotword Detection.

Continuously captures, filters, and normalizes device events (ADB logcat,
local file tail, or simulated device events for development).
"""

import collections
import datetime
import os
import re
import subprocess
import threading
import time
from typing import Callable, Dict, List, Optional, Any

# Standard Android / Google VoiceInteraction / Gemini hotword log patterns
HOTWORD_PATTERNS = [
    # 1. Hey Google detection
    (re.compile(r"(?:HotwordDetector|VoiceInteraction|SoundTrigger|AlwaysOnHotwordDetector|GsaVoice|Keyphrase|Assistant|SoundTriggerHelper).*?(?:detected|trigger|onDetected|recognition|onKeyphraseRecognition).*?(?:hey[_\s]*google)", re.IGNORECASE), "HEY_GOOGLE"),
    # 2. OK Google detection
    (re.compile(r"(?:HotwordDetector|VoiceInteraction|SoundTrigger|AlwaysOnHotwordDetector|GsaVoice|Keyphrase|Assistant|SoundTriggerHelper).*?(?:detected|trigger|onDetected|recognition|onKeyphraseRecognition).*?(?:ok[_\s]*google|okay[_\s]*google)", re.IGNORECASE), "OK_GOOGLE"),
    # 3. Hey Gemini detection
    (re.compile(r"(?:HotwordDetector|VoiceInteraction|SoundTrigger|AlwaysOnHotwordDetector|Gemini|GsaVoice).*?(?:detected|trigger|onDetected|recognition).*?(?:hey[_\s]*gemini)", re.IGNORECASE), "HEY_GEMINI"),
    # 4. Gemini Activity & Assistant Invocation
    (re.compile(r"(?:GeminiChatActivity|GeminiActivity|AssistantOverlay|opa_voice_search|assistant_invocation)", re.IGNORECASE), "GEMINI_TRIGGER"),
    # 5. Generic keyphrase trigger
    (re.compile(r"KeyphraseRecognitionExtra.*?id[:=\s]+([0-9]+).*?confidence[:=\s]+([0-9\.]+)", re.IGNORECASE), "KEYPHRASE_GENERIC"),
    # 6. Android SoundTrigger keyphrase recognition
    (re.compile(r"SoundTrigger.*?onKeyphraseRecognition", re.IGNORECASE), "SOUNDTRIGGER_KEYPHRASE"),
]

# Audio Input / VAD Onset patterns from logcat
AUDIO_ONSET_PATTERNS = [
    re.compile(r"(?:AudioRecord|AudioFlinger).*?(?:start|recording|active)", re.IGNORECASE),
    re.compile(r"(?:SoundTrigger|VoiceInteractionSession).*?(?:startRecognition|recognitionStarted|listening)", re.IGNORECASE),
    re.compile(r"(?:VAD|SpeechDetector).*?(?:speech_start|speech_detected|voice_onset)", re.IGNORECASE),
]

CONFIDENCE_PATTERN = re.compile(r"confidence[_\s:=]+([0-9\.]+)", re.IGNORECASE)


class TelemetryCollector:
    """External utility to continuously capture and filter raw logs from device."""

    def __init__(self, max_buffer_size: int = 5000):
        self.max_buffer_size = max_buffer_size
        self.log_buffer: collections.deque = collections.deque(maxlen=max_buffer_size)
        self.event_buffer: collections.deque = collections.deque(maxlen=max_buffer_size)
        self.listeners: List[Callable[[Dict[str, Any]], None]] = []
        self._lock = threading.Lock()
        self._running = False
        self._collector_thread: Optional[threading.Thread] = None
        self._adb_process: Optional[subprocess.Popen] = None
        self.source_mode = "simulated"  # "adb", "simulated", or "file"
        self.adb_device_id: Optional[str] = None
        self.file_path: Optional[str] = None

    @property
    def is_running(self) -> bool:
        return self._running

    def add_listener(self, callback: Callable[[Dict[str, Any]], None]):
        with self._lock:
            if callback not in self.listeners:
                self.listeners.append(callback)

    def remove_listener(self, callback: Callable[[Dict[str, Any]], None]):
        with self._lock:
            if callback in self.listeners:
                self.listeners.remove(callback)

    def _notify_listeners(self, event: Dict[str, Any]):
        with self._lock:
            listeners = list(self.listeners)
        for listener in listeners:
            try:
                listener(event)
            except Exception:
                pass

    def emit_event(self, event_type: str, data: Dict[str, Any]) -> Dict[str, Any]:
        """Manually emit an event (e.g. from frontend prompt/VAD or mock stream)."""
        now = time.time()
        event = {
            "timestamp_ms": int(now * 1000),
            "iso_time": datetime.datetime.fromtimestamp(now, datetime.timezone.utc).isoformat(),
            "event_type": event_type,
            **data
        }
        with self._lock:
            self.event_buffer.append(event)
        self._notify_listeners(event)
        return event

    def parse_log_line(self, line: str) -> Optional[Dict[str, Any]]:
        """Parses a raw log line for hotword detection signatures or audio onset."""
        line = line.strip()
        if not line:
            return None

        now = time.time()
        timestamp_ms = int(now * 1000)

        # 1. Check for Hotword Trigger
        detected_hotword = None
        for pattern, label in HOTWORD_PATTERNS:
            if pattern.search(line):
                detected_hotword = label
                break

        if detected_hotword:
            confidence = 1.0
            conf_match = CONFIDENCE_PATTERN.search(line)
            if conf_match:
                try:
                    confidence = float(conf_match.group(1))
                except ValueError:
                    confidence = 1.0

            event = {
                "timestamp_ms": timestamp_ms,
                "iso_time": datetime.datetime.fromtimestamp(now, datetime.timezone.utc).isoformat(),
                "event_type": "HOTWORD_TRIGGER",
                "detected_hotword": detected_hotword,
                "confidence": confidence,
                "raw_log": line,
                "source": self.source_mode
            }
            with self._lock:
                self.event_buffer.append(event)
            self._notify_listeners(event)
            return event

        # 2. Check for Audio / VAD Onset
        for pattern in AUDIO_ONSET_PATTERNS:
            if pattern.search(line):
                event = {
                    "timestamp_ms": timestamp_ms,
                    "iso_time": datetime.datetime.fromtimestamp(now, datetime.timezone.utc).isoformat(),
                    "event_type": "AUDIO_INPUT_ONSET",
                    "raw_log": line,
                    "source": self.source_mode
                }
                with self._lock:
                    self.event_buffer.append(event)
                self._notify_listeners(event)
                return event

        return None

    def start_adb_capture(self, device_id: Optional[str] = None):
        """Starts background ADB logcat process targeting specific serial."""
        self.stop()
        self.source_mode = "adb"
        self.adb_device_id = device_id
        self._running = True
        self._collector_thread = threading.Thread(target=self._run_adb_loop, daemon=True)
        self._collector_thread.start()

    def start_simulated_capture(self):
        """Starts simulated capture mode."""
        self.stop()
        self.source_mode = "simulated"
        self._running = True
        self._collector_thread = threading.Thread(target=self._run_simulated_loop, daemon=True)
        self._collector_thread.start()

    def start_file_tail(self, file_path: str):
        """Tails a local log file."""
        self.stop()
        self.source_mode = "file"
        self.file_path = file_path
        self._running = True
        self._collector_thread = threading.Thread(target=self._run_file_loop, daemon=True)
        self._collector_thread.start()

    def _run_adb_loop(self):
        cmd = ["adb"]
        if self.adb_device_id:
            cmd.extend(["-s", self.adb_device_id])
        cmd.extend(["logcat", "-v", "time", "-T", "1", "*:V"])

        try:
            self._adb_process = subprocess.Popen(
                cmd,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
                bufsize=1
            )
            self.emit_event("COLLECTOR_STATUS", {
                "status": "connected",
                "source": "adb",
                "device_id": self.adb_device_id or "default"
            })

            while self._running and self._adb_process.stdout:
                line = self._adb_process.stdout.readline()
                if not line:
                    if self._adb_process.poll() is not None:
                        break
                    continue
                with self._lock:
                    self.log_buffer.append(line.strip())
                self.parse_log_line(line)
        except Exception as e:
            self.emit_event("COLLECTOR_STATUS", {
                "status": "error",
                "error": str(e),
                "source": "adb"
            })
        finally:
            self._running = False

    def _run_simulated_loop(self):
        self.emit_event("COLLECTOR_STATUS", {
            "status": "connected",
            "source": "simulated",
            "message": "Simulated device telemetry active"
        })
        while self._running:
            time.sleep(0.5)

    def _run_file_loop(self):
        if not self.file_path or not os.path.exists(self.file_path):
            self.emit_event("COLLECTOR_STATUS", {
                "status": "error",
                "error": f"File not found: {self.file_path}",
                "source": "file"
            })
            return

        with open(self.file_path, "r") as f:
            f.seek(0, os.SEEK_END)
            while self._running:
                line = f.readline()
                if line:
                    with self._lock:
                        self.log_buffer.append(line.strip())
                    self.parse_log_line(line)
                else:
                    time.sleep(0.1)

    def stop(self):
        self._running = False
        if self._adb_process:
            try:
                self._adb_process.terminate()
                self._adb_process.wait(timeout=2)
            except Exception:
                pass
            self._adb_process = None
        if self._collector_thread and self._collector_thread.is_alive():
            self._collector_thread.join(timeout=1)
        self._collector_thread = None

    def reverse_phone1_port(self, device_id: str, port: int = 8080) -> bool:
        """Sets up ADB reverse port forward and launches browser on Phone 1."""
        try:
            subprocess.run(["adb", "-s", device_id, "reverse", f"tcp:{port}", f"tcp:{port}"], check=True, timeout=5)
            # Launch Chrome to phone_speaker bridge
            subprocess.run([
                "adb", "-s", device_id, "shell", "am", "start",
                "-a", "android.intent.action.VIEW",
                "-d", f"http://localhost:{port}/phone_speaker.html"
            ], timeout=5)
            return True
        except Exception as e:
            print(f"Failed to reverse port for Phone 1 ({device_id}): {e}")
            return False

    def get_events_in_range(self, start_ms: int, end_ms: int) -> List[Dict[str, Any]]:
        with self._lock:
            return [e for e in self.event_buffer if start_ms <= e["timestamp_ms"] <= end_ms]

    def get_recent_logs(self, count: int = 100) -> List[str]:
        with self._lock:
            return list(self.log_buffer)[-count:]

    def get_recent_events(self, count: int = 100) -> List[Dict[str, Any]]:
        with self._lock:
            return list(self.event_buffer)[-count:]

    def check_adb_devices(self) -> List[Dict[str, str]]:
        """Lists attached ADB devices."""
        try:
            res = subprocess.run(["adb", "devices"], capture_output=True, text=True, timeout=5)
            devices = []
            for line in res.stdout.strip().split("\n")[1:]:
                parts = line.strip().split()
                if len(parts) >= 2:
                    devices.append({"id": parts[0], "state": parts[1]})
            return devices
        except Exception:
            return []
