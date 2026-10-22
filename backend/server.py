import base64
import datetime
import http.server
import io
import json
import os
import queue
import socketserver
import subprocess
import sys
import threading
import time
from typing import Any, Dict, List
import urllib.parse
import webbrowser
import zipfile

# Add local package directory to sys.path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
sys.path.insert(0, SCRIPT_DIR)

from data_parser import TelemetryDataParser
from telemetry_collector import TelemetryCollector
from zaber_controller import stage_controller

# Global Singletons
collector = TelemetryCollector()
parser = TelemetryDataParser()

CONFIGS_DIR = os.path.join(PROJECT_DIR, "configs")
DATA_DIR = os.path.join(PROJECT_DIR, "data")
FRONTEND_DIR = os.path.join(PROJECT_DIR, "frontend")
AUDIO_DIR = os.path.join(PROJECT_DIR, "audio")
SCRIPTS_DIR = os.path.join(PROJECT_DIR, "scripts")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(CONFIGS_DIR, exist_ok=True)
os.makedirs(AUDIO_DIR, exist_ok=True)

active_session: Dict[str, Any] = {
    "session_id": None,
    "participant_id": None,
    "suite_name": None,
    "start_time_iso": None,
    "status": "idle",
    "trials": [],
    "telemetry_events": []
}
session_audio_map: Dict[str, Dict[str, Any]] = {}
session_lock = threading.Lock()

# SSE client queues
sse_clients: List[queue.Queue] = []
sse_lock = threading.Lock()

def broadcast_sse(event_data: Dict[str, Any]):
    payload = f"data: {json.dumps(event_data)}\n\n"
    with sse_lock:
        stale_clients = []
        for q in sse_clients:
            try:
                q.put_nowait(payload)
            except Exception:
                stale_clients.append(q)
        for sq in stale_clients:
            if sq in sse_clients:
                sse_clients.remove(sq)

def on_collector_event(event: Dict[str, Any]):
    """Bridge collector events into active session and SSE broadcast."""
    with session_lock:
        if active_session["status"] == "running":
            active_session["telemetry_events"].append(event)
    broadcast_sse(event)

collector.add_listener(on_collector_event)
# Auto-detect real ADB devices on start without fake mock event generation
try:
    _devices = collector.check_adb_devices()
    if _devices:
        wireless_devs = [d["id"] for d in _devices if ":5555" in d["id"]]
        target_dev = wireless_devs[0] if wireless_devs else _devices[-1]["id"]
        collector.start_adb_capture(device_id=target_dev)
        port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
        subprocess.run(["adb", "-s", target_dev, "reverse", f"tcp:{port}", f"tcp:{port}"], check=False, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
except Exception:
    pass

# Stage controller SSE integration & background auto-connect
def on_stage_event(event: Dict[str, Any]):
    broadcast_sse(event)

stage_controller.add_listener(on_stage_event)
threading.Thread(target=stage_controller.connect, daemon=True).start()

def configure_system_audio_source(preferred_device: str = "Wireless PRO RX") -> Dict[str, Any]:
    """Auto-detect and switch macOS default audio input device to Wireless PRO RX if available."""
    if sys.platform != "darwin":
        return {"status": "unsupported_platform"}

    cmd_path = "/opt/homebrew/bin/SwitchAudioSource"
    if not os.path.exists(cmd_path):
        res = subprocess.run(["which", "SwitchAudioSource"], capture_output=True, text=True)
        if res.returncode == 0:
            cmd_path = res.stdout.strip()
    if not os.path.exists(cmd_path):
        return {"status": "switchaudiosource_missing"}

    try:
        a_res = subprocess.run([cmd_path, "-a", "-t", "input"], capture_output=True, text=True)
        all_inputs = [line.strip() for line in a_res.stdout.splitlines() if line.strip()]

        c_res = subprocess.run([cmd_path, "-c", "-t", "input"], capture_output=True, text=True)
        current_input = c_res.stdout.strip()

        matched = [inp for inp in all_inputs if preferred_device.lower() in inp.lower()]
        if matched:
            target = matched[0]
            if current_input != target:
                s_res = subprocess.run([cmd_path, "-t", "input", "-s", target], capture_output=True, text=True)
                if s_res.returncode == 0:
                    print(f"[AUDIO] macOS system default input set to '{target}'")
                    return {"status": "switched", "current": target, "available": all_inputs}
                else:
                    return {"status": "switch_failed", "current": current_input, "error": s_res.stderr.strip()}
            return {"status": "already_active", "current": target, "available": all_inputs}
        else:
            return {"status": "preferred_not_found", "current": current_input, "available": all_inputs}
    except Exception as ex:
        return {"status": "error", "error": str(ex)}

threading.Thread(target=configure_system_audio_source, daemon=True).start()


def ensure_first30_audio_file(sid: str, rec_dir: str) -> str:
    """
    Ensure that a dedicated audio file containing ONLY the first 30 trials
    ({sid}_first_30_trials.webm) exists in both `data/recordings/{sid}/` and `data/`.
    If it wasn't recorded live via `/api/session/upload_first30_chunk`, synthesize it
    from per-trial recordings T001..T030 (or fallback to batch recording) via ffmpeg.
    Returns the relative path `recordings/{sid}/{sid}_first_30_trials.webm` if available, else None.
    """
    import re
    import shutil

    if not sid or not rec_dir or not os.path.exists(rec_dir):
        return None

    target_fname = f"{sid}_first_30_trials.webm"
    target_fpath = os.path.join(rec_dir, target_fname)

    # Check if any existing first_30_trials file is present with non-zero size
    if not os.path.exists(target_fpath) or os.path.getsize(target_fpath) == 0:
        existing_first30 = [
            f for f in sorted(os.listdir(rec_dir))
            if ("first_30" in f.lower() or "first30" in f.lower())
            and f.endswith((".webm", ".wav"))
            and os.path.getsize(os.path.join(rec_dir, f)) > 0
        ]
        if existing_first30:
            src_existing = os.path.join(rec_dir, existing_first30[0])
            if src_existing != target_fpath:
                try:
                    shutil.copy2(src_existing, target_fpath)
                except Exception:
                    target_fpath = src_existing
                    target_fname = existing_first30[0]

    # If still not present, synthesize from per-trial recordings T001..T030
    if not os.path.exists(target_fpath) or os.path.getsize(target_fpath) == 0:
        trial_files = []
        for f in sorted(os.listdir(rec_dir)):
            if not f.endswith((".webm", ".wav")):
                continue
            m = re.match(r"^T(\d{3})_", f)
            if m:
                t_num = int(m.group(1))
                if 1 <= t_num <= 30:
                    full_p = os.path.join(rec_dir, f)
                    if os.path.getsize(full_p) > 0:
                        trial_files.append((t_num, full_p))

        trial_files.sort(key=lambda x: x[0])
        if len(trial_files) == 1:
            try:
                shutil.copy2(trial_files[0][1], target_fpath)
            except Exception:
                pass
        elif len(trial_files) > 1:
            concat_txt = os.path.join(rec_dir, "_concat_first30.txt")
            try:
                with open(concat_txt, "w", encoding="utf-8") as cf:
                    for _, fp in trial_files:
                        escaped_fp = fp.replace("'", "'\\''")
                        cf.write(f"file '{escaped_fp}'\n")
                res = subprocess.run(
                    [
                        "ffmpeg", "-y", "-f", "concat", "-safe", "0",
                        "-i", concat_txt, "-c:a", "libopus", "-b:a", "64k", target_fpath
                    ],
                    capture_output=True,
                    timeout=30
                )
                if res.returncode != 0 or not os.path.exists(target_fpath) or os.path.getsize(target_fpath) == 0:
                    subprocess.run(
                        ["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt, "-c", "copy", target_fpath],
                        capture_output=True,
                        timeout=20
                    )
            except Exception:
                pass
            finally:
                if os.path.exists(concat_txt):
                    try:
                        os.remove(concat_txt)
                    except Exception:
                        pass

        # Fallback: if no individual T001..T030 clips exist, check if batch recording exists
        if not os.path.exists(target_fpath) or os.path.getsize(target_fpath) == 0:
            batch_cands = [
                f for f in sorted(os.listdir(rec_dir))
                if "batch" in f.lower() and f.endswith((".webm", ".wav"))
                and os.path.getsize(os.path.join(rec_dir, f)) > 0
            ]
            if batch_cands:
                try:
                    shutil.copy2(os.path.join(rec_dir, batch_cands[0]), target_fpath)
                except Exception:
                    pass

    if os.path.exists(target_fpath) and os.path.getsize(target_fpath) > 0:
        # Also place a direct copy in DATA_DIR (`data/{sid}_first_30_trials.webm`) so it is immediately accessible in data/
        top_level_first30 = os.path.join(DATA_DIR, target_fname)
        try:
            shutil.copy2(target_fpath, top_level_first30)
        except Exception:
            pass
        # Also mirror batch recording to DATA_DIR (`data/{sid}_batch_full_session.webm`) if present
        for f in sorted(os.listdir(rec_dir)):
            if "batch" in f.lower() and f.endswith((".webm", ".wav")):
                src_b = os.path.join(rec_dir, f)
                dst_b = os.path.join(DATA_DIR, f"{sid}_batch_full_session.webm" if f.endswith(".webm") else f"{sid}_batch_full_session.wav")
                if os.path.getsize(src_b) > 0:
                    try:
                        shutil.copy2(src_b, dst_b)
                    except Exception:
                        pass
                break
        return f"recordings/{sid}/{target_fname}"

    return None


class TelemetryHTTPHandler(http.server.BaseHTTPRequestHandler):
    """Custom HTTP Request Handler for Hotword Telemetry App."""
    server_version = "TelemetryServer/1.0"

    def do_GET(self):
        try:
            parsed = urllib.parse.urlparse(self.path)
            path = parsed.path

            if path.startswith("/api/"):
                self.handle_api_get(path, urllib.parse.parse_qs(parsed.query))
                return

            # Special route aliases
            target_path = path
            if target_path in ("/phone_speaker", "/phone_speaker/"):
                target_path = "/phone_speaker.html"
            elif target_path == "/":
                target_path = "/tester.html"
            elif target_path in ("/report", "/report/"):
                reports = sorted([f for f in os.listdir(DATA_DIR) if f.endswith("_report.html") or f == "sample_report.html"], reverse=True)
                if reports:
                    target_file = os.path.join(DATA_DIR, reports[0])
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Content-Length", str(os.path.getsize(target_file)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    with open(target_file, "rb") as rf:
                        self.wfile.write(rf.read())
                    return
                else:
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.end_headers()
                    self.wfile.write(b"<html><body style='font-family:sans-serif;padding:30px;background:#0f172a;color:#fff;'><h2>No test session has finalized yet.</h2><p>Run a test session and finalize it to generate an HTML report.</p></body></html>")
                    return

            if target_path.startswith("/data/"):
                rel_path = target_path[len("/data/"):].lstrip("/")
                df = os.path.join(DATA_DIR, rel_path)
                if os.path.exists(df) and os.path.isfile(df):
                    self.send_response(200)
                    if df.endswith(".html"):
                        self.send_header("Content-Type", "text/html; charset=utf-8")
                    elif df.endswith(".csv"):
                        self.send_header("Content-Type", "text/csv")
                    elif df.endswith(".json"):
                        self.send_header("Content-Type", "application/json")
                    elif df.endswith(".webm"):
                        self.send_header("Content-Type", "audio/webm")
                    elif df.endswith(".wav"):
                        self.send_header("Content-Type", "audio/wav")
                    else:
                        self.send_header("Content-Type", "application/octet-stream")
                    self.send_header("Content-Length", str(os.path.getsize(df)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    with open(df, "rb") as dfile:
                        self.wfile.write(dfile.read())
                    return

            if target_path.startswith("/audio/"):
                # Serve audio files from AUDIO_DIR
                rel_path = target_path[len("/audio/"):].lstrip("/")
                audio_file = os.path.join(AUDIO_DIR, rel_path)
                if os.path.exists(audio_file) and os.path.isfile(audio_file):
                    self.send_response(200)
                    if audio_file.endswith(".wav"):
                        self.send_header("Content-Type", "audio/wav")
                    elif audio_file.endswith(".mp3"):
                        self.send_header("Content-Type", "audio/mpeg")
                    elif audio_file.endswith(".ogg"):
                        self.send_header("Content-Type", "audio/ogg")
                    else:
                        self.send_header("Content-Type", "application/octet-stream")
                    self.send_header("Content-Length", str(os.path.getsize(audio_file)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    with open(audio_file, "rb") as af:
                        self.wfile.write(af.read())
                    return
                else:
                    self.send_error(404, f"Audio file {rel_path} not found")
                    return

            if target_path.startswith("/scripts/"):
                rel_path = target_path[len("/scripts/"):].lstrip("/")
                script_file = os.path.join(SCRIPTS_DIR, rel_path)
                if os.path.exists(script_file) and os.path.isfile(script_file):
                    self.send_response(200)
                    self.send_header("Content-Type", "text/x-python")
                    self.send_header("Content-Length", str(os.path.getsize(script_file)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.end_headers()
                    with open(script_file, "rb") as sf:
                        self.wfile.write(sf.read())
                    return
                else:
                    self.send_error(404, f"Script file {rel_path} not found")
                    return

            # Check if file exists in FRONTEND_DIR
            local_file = os.path.join(FRONTEND_DIR, target_path.lstrip("/"))
            if os.path.exists(local_file) and os.path.isfile(local_file):
                self.send_response(200)
                if local_file.endswith(".html"):
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                elif local_file.endswith(".js"):
                    self.send_header("Content-Type", "application/javascript")
                elif local_file.endswith(".css"):
                    self.send_header("Content-Type", "text/css")
                elif local_file.endswith(".json"):
                    self.send_header("Content-Type", "application/json")
                elif local_file.endswith(".mp3"):
                    self.send_header("Content-Type", "audio/mpeg")
                elif local_file.endswith(".wav"):
                    self.send_header("Content-Type", "audio/wav")
                elif local_file.endswith(".webm"):
                    self.send_header("Content-Type", "audio/webm")
                else:
                    self.send_header("Content-Type", "application/octet-stream")
                self.send_header("Content-Length", str(os.path.getsize(local_file)))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
                self.send_header("Pragma", "no-cache")
                self.send_header("Expires", "0")
                self.end_headers()
                with open(local_file, "rb") as lf:
                    self.wfile.write(lf.read())
                return
            else:
                # Default fallback to index.html for SPA routing
                index_file = os.path.join(FRONTEND_DIR, "index.html")
                if os.path.exists(index_file):
                    self.send_response(200)
                    self.send_header("Content-Type", "text/html; charset=utf-8")
                    self.send_header("Content-Length", str(os.path.getsize(index_file)))
                    self.send_header("Access-Control-Allow-Origin", "*")
                    self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
                    self.send_header("Pragma", "no-cache")
                    self.send_header("Expires", "0")
                    self.end_headers()
                    with open(index_file, "rb") as inf:
                        self.wfile.write(inf.read())
                    return
                else:
                    self.send_error(404, "File not found")
                    return
        except Exception as e:
            try:
                self.send_error(500, f"Server error: {e}")
            except Exception:
                pass

    def do_HEAD(self):
        self.do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length).decode("utf-8") if content_length > 0 else "{}"
        try:
            data = json.loads(body)
        except Exception:
            data = {}

        if path.startswith("/api/"):
            self.handle_api_post(path, data)
        else:
            self.send_error(404, "Endpoint not found")

    def send_json_response(self, data: Any, status: int = 200):
        body = json.dumps(data, indent=2).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def handle_api_get(self, path: str, query_params: Dict[str, List[str]]):
        if path == "/api/status":
            devices = collector.check_adb_devices()
            self.send_json_response({
                "source_mode": collector.source_mode,
                "running": collector.is_running,
                "adb_devices": devices,
                "active_session": {
                    "session_id": active_session.get("session_id"),
                    "status": active_session.get("status"),
                    "participant_id": active_session.get("participant_id"),
                    "suite_name": active_session.get("suite_name"),
                    "completed_trials": len(active_session.get("trials", []))
                },
                "stage": stage_controller.get_status()
            })

        elif path == "/api/stage/status":
            self.send_json_response(stage_controller.get_status())

        elif path == "/api/audio/status":
            info = configure_system_audio_source()
            self.send_json_response(info)

        elif path == "/api/drive_audio":
            # Stream or fetch Google Drive audio by file ID
            file_id = query_params.get("id", [""])[0] if query_params else ""
            if not file_id:
                self.send_error(400, "Missing Google Drive file id parameter (?id=...)")
                return

            cached_file = os.path.join(AUDIO_DIR, f"drive_{file_id}.wav")
            if not os.path.exists(cached_file):
                # Download and cache from Google Drive
                drive_url = f"https://drive.google.com/uc?export=download&id={file_id}"
                try:
                    req = urllib.request.Request(
                        drive_url,
                        headers={"User-Agent": "Mozilla/5.0"}
                    )
                    with urllib.request.urlopen(req) as resp, open(cached_file, "wb") as out_f:
                        out_f.write(resp.read())
                except Exception as e:
                    self.send_error(502, f"Failed to fetch audio from Google Drive: {e}")
                    return

            if os.path.exists(cached_file):
                self.send_response(200)
                self.send_header("Content-Type", "audio/wav")
                self.send_header("Content-Length", str(os.path.getsize(cached_file)))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.end_headers()
                with open(cached_file, "rb") as cf:
                    self.wfile.write(cf.read())
                return

        elif path == "/api/configs":
            files = [f for f in os.listdir(CONFIGS_DIR) if f.endswith(".json")]
            configs = []
            for f in sorted(files):
                try:
                    with open(os.path.join(CONFIGS_DIR, f), "r") as cf:
                        cd = json.load(cf)
                        configs.append({
                            "filename": f,
                            "suite_name": cd.get("suite_name", f),
                            "version": cd.get("version", "1.0"),
                            "description": cd.get("description", ""),
                            "trial_count": len(cd.get("trials", []))
                        })
                except Exception:
                    pass
            self.send_json_response({"configs": configs})

        elif path.startswith("/api/configs/"):
            fname = path[len("/api/configs/"):]
            fpath = os.path.join(CONFIGS_DIR, fname)
            if os.path.exists(fpath):
                with open(fpath, "r") as cf:
                    self.send_json_response(json.load(cf))
            else:
                self.send_error(404, f"Config {fname} not found")

        elif path == "/api/sessions":
            sessions = []
            for f in sorted(os.listdir(DATA_DIR), reverse=True):
                if f.endswith(".json") and not f.endswith("_benchmark.json"):
                    try:
                        with open(os.path.join(DATA_DIR, f), "r") as sf:
                            sd = json.load(sf)
                            meta = sd.get("session_metadata", {})
                            summary = sd.get("summary_statistics", {})
                            sessions.append({
                                "filename": f,
                                "session_id": meta.get("session_id", f),
                                "participant_id": meta.get("participant_id", "Anonymous"),
                                "suite_name": meta.get("suite_name", "Unknown"),
                                "start_time": meta.get("start_time_iso", ""),
                                "total_trials": summary.get("total_trials", 0),
                                "accuracy": summary.get("metrics", {}).get("accuracy", 0.0),
                                "median_latency_ms": summary.get("latency_stats_ms", {}).get("median", 0)
                            })
                    except Exception:
                        pass
            self.send_json_response({"sessions": sessions})

        elif path.startswith("/api/sessions/"):
            sid = path[len("/api/sessions/"):]
            if not sid.endswith(".json"):
                sid += ".json"
            fpath = os.path.join(DATA_DIR, sid)
            if os.path.exists(fpath):
                with open(fpath, "r") as sf:
                    self.send_json_response(json.load(sf))
            else:
                self.send_error(404, f"Session {sid} not found")

        elif path in ("/api/export/package_zip", "/api/export/complete_zip"):
            sid = (query_params.get("session_id", [None])[0] if query_params else None) or active_session.get("session_id")
            if not sid:
                reports = sorted([f for f in os.listdir(DATA_DIR) if f.endswith("_report.html")], reverse=True)
                if reports:
                    sid = reports[0].replace("_report.html", "")

            zip_buffer = io.BytesIO()
            with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
                # 1. Add audio recordings (and ensure first_30_trials.webm is synthesized/copied)
                rec_dir = os.path.join(DATA_DIR, "recordings", sid) if sid else None
                if not rec_dir or not os.path.exists(rec_dir):
                    rec_base = os.path.join(DATA_DIR, "recordings")
                    if os.path.exists(rec_base):
                        subdirs = sorted([d for d in os.listdir(rec_base) if os.path.isdir(os.path.join(rec_base, d))], reverse=True)
                        if subdirs:
                            rec_dir = os.path.join(rec_base, subdirs[0])
                            if not sid:
                                sid = subdirs[0]
                if rec_dir and os.path.exists(rec_dir):
                    ensure_first30_audio_file(sid, rec_dir)
                    for r_file in sorted(os.listdir(rec_dir)):
                        if r_file.endswith((".webm", ".wav")):
                            zf.write(os.path.join(rec_dir, r_file), arcname=f"recordings/{r_file}")

                # 2. Add session report & data files (both standard, Benchmark formats, and top-level audio files)
                for suffix in [
                    ".csv", ".json", "_report.html",
                    "_benchmark.csv", "_benchmark.json", "_benchmark_report.md",
                    "_first_30_trials.webm", "_batch_full_session.webm"
                ]:
                    fname = f"{sid}{suffix}"
                    fpath = os.path.join(DATA_DIR, fname)
                    if os.path.exists(fpath):
                        zf.write(fpath, arcname=fname)

            zip_bytes = zip_buffer.getvalue()
            self.send_response(200)
            self.send_header("Content-Type", "application/zip")
            self.send_header("Content-Disposition", f'attachment; filename="{sid or "session"}_complete_study_package.zip"')
            self.send_header("Content-Length", str(len(zip_bytes)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(zip_bytes)
            return

        elif path == "/api/export/first30_audio":
            sid = (query_params.get("session_id", [None])[0] if query_params else None) or active_session.get("session_id")
            rec_dir = os.path.join(DATA_DIR, "recordings", sid) if sid else None
            if not rec_dir or not os.path.exists(rec_dir):
                rec_base = os.path.join(DATA_DIR, "recordings")
                if os.path.exists(rec_base):
                    subdirs = sorted([d for d in os.listdir(rec_base) if os.path.isdir(os.path.join(rec_base, d))], reverse=True)
                    for d in subdirs:
                        cand_dir = os.path.join(rec_base, d)
                        if any(f.endswith((".webm", ".wav")) for f in os.listdir(cand_dir)):
                            rec_dir = cand_dir
                            sid = d
                            break

            first30_fpath = None
            if rec_dir and os.path.exists(rec_dir):
                ensure_first30_audio_file(sid, rec_dir)
                for f in sorted(os.listdir(rec_dir)):
                    if ("first_30" in f.lower() or "first30" in f.lower()) and f.endswith((".webm", ".wav")):
                        first30_fpath = os.path.join(rec_dir, f)
                        break

            if not first30_fpath or not os.path.exists(first30_fpath):
                self.send_error(404, "No first-30-trials audio recording found for this session")
                return

            with open(first30_fpath, "rb") as ff:
                raw_bytes = ff.read()
            ext = ".wav" if first30_fpath.endswith(".wav") else ".webm"
            mime = "audio/wav" if ext == ".wav" else "audio/webm"
            dl_name = f"{sid or 'session'}_first_30_trials{ext}"
            self.send_response(200)
            self.send_header("Content-Type", mime)
            self.send_header("Content-Disposition", f'attachment; filename="{dl_name}"')
            self.send_header("Content-Length", str(len(raw_bytes)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(raw_bytes)
            return

        elif path == "/api/export/batch_audio":
            sid = (query_params.get("session_id", [None])[0] if query_params else None) or active_session.get("session_id")
            rec_dir = os.path.join(DATA_DIR, "recordings", sid) if sid else None
            if not rec_dir or not os.path.exists(rec_dir):
                rec_base = os.path.join(DATA_DIR, "recordings")
                if os.path.exists(rec_base):
                    subdirs = sorted([d for d in os.listdir(rec_base) if os.path.isdir(os.path.join(rec_base, d))], reverse=True)
                    for d in subdirs:
                        cand_dir = os.path.join(rec_base, d)
                        if any("batch" in f.lower() for f in os.listdir(cand_dir)):
                            rec_dir = cand_dir
                            sid = d
                            break

            batch_fpath = None
            if rec_dir and os.path.exists(rec_dir):
                for f in sorted(os.listdir(rec_dir)):
                    if "batch" in f.lower() and f.endswith((".webm", ".wav")):
                        batch_fpath = os.path.join(rec_dir, f)
                        break

            if not batch_fpath or not os.path.exists(batch_fpath):
                self.send_error(404, "No full-session batch audio recording found for this session")
                return

            with open(batch_fpath, "rb") as bf:
                raw_bytes = bf.read()
            ext = ".wav" if batch_fpath.endswith(".wav") else ".webm"
            mime = "audio/wav" if ext == ".wav" else "audio/webm"
            dl_name = f"{sid or 'session'}_batch_full_session{ext}"
            self.send_response(200)
            self.send_header("Content-Type", mime)
            self.send_header("Content-Disposition", f'attachment; filename="{dl_name}"')
            self.send_header("Content-Length", str(len(raw_bytes)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(raw_bytes)
            return

        elif path == "/api/export/recordings_zip":
            sid = (query_params.get("session_id", [None])[0] if query_params else None) or active_session.get("session_id")
            rec_dir = os.path.join(DATA_DIR, "recordings", sid) if sid else None
            if not rec_dir or not os.path.exists(rec_dir) or not os.listdir(rec_dir):
                rec_base = os.path.join(DATA_DIR, "recordings")
                if os.path.exists(rec_base):
                    subdirs = sorted([d for d in os.listdir(rec_base) if os.path.isdir(os.path.join(rec_base, d))], reverse=True)
                    if subdirs:
                        rec_dir = os.path.join(rec_base, subdirs[0])
                        sid = subdirs[0]

            if not rec_dir or not os.path.exists(rec_dir):
                self.send_error(404, "No recordings found")
                return

            zip_buffer = io.BytesIO()
            file_count = 0
            with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zf:
                for root, _, files in os.walk(rec_dir):
                    for file in sorted(files):
                        if file.endswith((".webm", ".wav")):
                            full_p = os.path.join(root, file)
                            zf.write(full_p, arcname=file)
                            file_count += 1

            if file_count == 0:
                self.send_error(404, "No audio recordings found in session")
                return

            zip_bytes = zip_buffer.getvalue()
            self.send_response(200)
            self.send_header("Content-Type", "application/zip")
            self.send_header("Content-Disposition", f'attachment; filename="{sid or "session"}_recordings.zip"')
            self.send_header("Content-Length", str(len(zip_bytes)))
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(zip_bytes)
            return

        elif path == "/api/stream":
            # Server-Sent Events stream
            self.send_response(200)
            self.send_header("Content-Type", "text/event-stream")
            self.send_header("Cache-Control", "no-cache")
            self.send_header("Connection", "keep-alive")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()

            q = queue.Queue()
            with sse_lock:
                sse_clients.append(q)

            init_msg = json.dumps({
                "event_type": "SSE_CONNECTED",
                "timestamp_ms": int(time.time() * 1000),
                "source": collector.source_mode
            })
            self.wfile.write(f"data: {init_msg}\n\n".encode("utf-8"))
            self.wfile.flush()

            try:
                while True:
                    try:
                        msg = q.get(timeout=15)
                        self.wfile.write(msg.encode("utf-8"))
                        self.wfile.flush()
                    except queue.Empty:
                        self.wfile.write(b": heartbeat\n\n")
                        self.wfile.flush()
            except (BrokenPipeError, ConnectionResetError):
                pass
            finally:
                with sse_lock:
                    if q in sse_clients:
                        sse_clients.remove(q)
        else:
            self.send_error(404, "Endpoint not found")

    def handle_api_post(self, path: str, data: Dict[str, Any]):
        global active_session

        if path == "/api/collector/source":
            mode = data.get("mode", "simulated")
            device_id = data.get("device_id")
            file_path = data.get("file_path")

            if mode == "adb":
                collector.start_adb_capture(device_id)
            elif mode == "file":
                collector.start_file_tail(file_path or "")
            else:
                collector.start_simulated_capture()

            self.send_json_response({
                "status": "updated",
                "source_mode": collector.source_mode,
                "running": collector.is_running
            })

        elif path == "/api/collector/reverse_phone1":
            device_id = data.get("device_id")
            if not device_id:
                self.send_json_response({"status": "error", "message": "device_id is required"}, 400)
                return
            success = collector.reverse_phone1_port(device_id, port=8080)
            self.send_json_response({"status": "ok" if success else "failed", "device_id": device_id})

        elif path == "/api/session/start":
            import shutil
            with session_lock:
                session_audio_map.clear()
                session_id = f"session_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
                try:
                    archive_dir = os.path.join(PROJECT_DIR, ".archived_sessions")
                    archive_rec_dir = os.path.join(archive_dir, "recordings")
                    os.makedirs(archive_rec_dir, exist_ok=True)
                    for fname in os.listdir(DATA_DIR):
                        if fname in (".gitkeep", "recordings") or fname.startswith("."):
                            continue
                        src_old = os.path.join(DATA_DIR, fname)
                        dst_old = os.path.join(archive_dir, fname)
                        if os.path.exists(dst_old):
                            if os.path.isdir(dst_old):
                                shutil.rmtree(dst_old, ignore_errors=True)
                            else:
                                os.remove(dst_old)
                        shutil.move(src_old, dst_old)
                    rec_base_dir = os.path.join(DATA_DIR, "recordings")
                    if os.path.exists(rec_base_dir):
                        for dname in os.listdir(rec_base_dir):
                            if dname == ".gitkeep" or dname.startswith("."):
                                continue
                            src_r = os.path.join(rec_base_dir, dname)
                            if dname == "session_current":
                                shutil.rmtree(src_r, ignore_errors=True)
                            else:
                                dst_r = os.path.join(archive_rec_dir, dname)
                                if os.path.exists(dst_r):
                                    if os.path.isdir(dst_r):
                                        shutil.rmtree(dst_r, ignore_errors=True)
                                    else:
                                        os.remove(dst_r)
                                shutil.move(src_r, dst_r)
                except Exception:
                    pass
                active_session = {
                    "session_id": session_id,
                    "participant_id": data.get("participant_id", "P01"),
                    "suite_name": data.get("suite_name", "Gemini Hotwords Suite"),
                    "start_time_iso": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                    "start_epoch_sec": time.time(),
                    "status": "running",
                    "trials": [],
                    "telemetry_events": [],
                    "batch_audio_file": None,
                    "batch_start_ms": None,
                    "first30_audio_file": None,
                    "first30_start_ms": None
                }
            collector.emit_event("SESSION_STARTED", {
                "session_id": session_id,
                "participant_id": active_session["participant_id"],
                "suite_name": active_session["suite_name"]
            })
            self.send_json_response({"status": "started", "session": active_session})

        elif path == "/api/stage/move":
            angle = float(data.get("angle", 0.0))
            success = stage_controller.move_to_angle(angle, wait=False)
            self.send_json_response({"status": stage_controller.get_status(), "target_angle": angle, "success": success})

        elif path == "/api/stage/home":
            success = stage_controller.home(wait=False)
            self.send_json_response({"status": stage_controller.get_status(), "success": success})

        elif path == "/api/stage/auto_rotate":
            enabled = bool(data.get("enabled", True))
            stage_controller.auto_rotate = enabled
            self.send_json_response({"status": "updated", "auto_rotate": enabled})

        elif path == "/api/stage/invert":
            invert = bool(data.get("invert", False))
            stage_controller.invert_direction = invert
            self.send_json_response({"status": "updated", "invert_direction": invert})

        elif path == "/api/stage/connect":
            port = data.get("port")
            success = stage_controller.connect(port)
            self.send_json_response({"status": "connected" if success else "failed", **stage_controller.get_status()})

        elif path == "/api/trials/event":
            event_type = data.get("event_type", "TRIAL_EVENT")
            trial_data = data.get("trial_data") or {k: v for k, v in data.items() if k not in ("event_type", "sender")}

            if event_type == "TRIAL_COMPLETED":
                with session_lock:
                    active_session["trials"].append(trial_data)

            # Automatically rotate stage to target degree for bystander trials or angular trials
            if event_type in ("TRIAL_PREPARED", "TRIAL_STARTED"):
                stage_controller.handle_trial_event(trial_data)

            # Record event in collector buffer & SSE broadcast
            emitted = collector.emit_event(event_type, trial_data)
            self.send_json_response({"status": "recorded", "event": emitted})

        elif path == "/api/trials/upload_audio":
            session_id = data.get("session_id") or active_session.get("session_id") or "session_default"
            trial_id = data.get("trial_id", "T000")
            phrase = str(data.get("phrase", "phrase")).replace(" ", "_").replace("/", "_")
            degree = str(data.get("degree", "0")).replace("°", "").strip()
            outcome = str(data.get("outcome", "outcome")).replace(" ", "_").replace("/", "_")
            audio_b64 = data.get("audio_base64", "")

            if not audio_b64:
                self.send_json_response({"status": "error", "message": "No audio_base64 provided"}, 400)
                return

            rec_dir = os.path.join(DATA_DIR, "recordings", session_id)
            os.makedirs(rec_dir, exist_ok=True)
            filename = f"{trial_id}_{phrase}_{degree}deg_{outcome}.webm"
            filepath = os.path.join(rec_dir, filename)

            try:
                raw_bytes = base64.b64decode(audio_b64)
                with open(filepath, "wb") as af:
                    af.write(raw_bytes)

                rel_audio_path = f"recordings/{session_id}/{filename}"

                # Server-side XR Glasses Earcon (247Hz B3 -> 392Hz G4) spectral template & waveform verification
                wf_res = None
                audio_dur_sec = data.get("audio_duration_sec")
                is_activated = "ACTIVATED" in outcome.upper() or "WOKE" in outcome.upper()
                try:
                    import struct, math
                    cmd = ["ffmpeg", "-v", "error", "-y", "-i", filepath, "-ac", "1", "-ar", "16000", "-f", "s16le", "-"]
                    proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=4)
                    pcm = proc.stdout
                    n_s = len(pcm) // 2
                    if n_s >= 3200:
                        sr = 16000
                        audio_dur_sec = round(n_s / float(sr), 3)
                        if is_activated:
                            samples = struct.unpack(f"<{n_s}h", pcm)
                            win_dft = 400  # 25ms window at 16kHz
                            step = 160     # 10ms step at 16kHz
                            n_fr = (n_s - win_dft) // step

                            def _dft_mag(frame_s, freq_hz):
                                N = len(frame_s)
                                w = 2.0 * math.pi * freq_hz / sr
                                cosine = math.cos(w)
                                sine = math.sin(w)
                                coeff = 2.0 * cosine
                                q0 = q1 = q2 = 0.0
                                for smp in frame_s:
                                    q0 = coeff * q1 - q2 + smp
                                    q2 = q1
                                    q1 = q0
                                re = q1 - q2 * cosine
                                im = q2 * sine
                                return math.sqrt(re * re + im * im) / N

                            rms_arr = []
                            m247_arr = []
                            m392_arr = []
                            m_other_arr = []
                            for i in range(n_fr):
                                s0 = i * step
                                fr = samples[s0:s0 + win_dft]
                                rms_arr.append(math.sqrt(sum(x * x for x in fr) / win_dft))
                                m247_arr.append(_dft_mag(fr, 247.0))
                                m392_arr.append(_dft_mag(fr, 392.0))
                                m_other_arr.append(max(_dft_mag(fr, 650.0), _dft_mag(fr, 850.0), _dft_mag(fr, 1200.0)))

                            # 1. Primary Detector: Memorized XR Glasses Wake-Up Earcon Signature (247Hz B3 -> 392Hz G4 from T002 @ 2.48s)
                            xr_glasses_cands = []
                            for i in range(130, n_fr - 30):
                                avg_247 = sum(m247_arr[i:i + 9]) / 9.0
                                pk_247 = max(m247_arr[i:i + 9])
                                avg_392 = sum(m392_arr[i + 7:i + 28]) / 21.0
                                pk_392 = max(m392_arr[i + 7:i + 28])
                                avg_oth = sum(m_other_arr[i:i + 26]) / 26.0
                                avg_r = sum(rms_arr[i:i + 26]) / 26.0
                                if pk_247 >= 90 and avg_247 >= 50 and pk_392 >= 100 and avg_392 >= 75:
                                    t_ratio = (avg_247 + avg_392) / (avg_r + 1.0)
                                    if t_ratio >= 0.42 and avg_oth < (avg_247 + avg_392) * 0.48:
                                        score = (avg_247 * 1.2 + avg_392 * 1.6) * t_ratio
                                        xr_glasses_cands.append((i, score))

                            if xr_glasses_cands:
                                clusters = []
                                cur_c = [xr_glasses_cands[0]]
                                for c in xr_glasses_cands[1:]:
                                    if c[0] - cur_c[-1][0] <= 25:
                                        cur_c.append(c)
                                    else:
                                        clusters.append(cur_c)
                                        cur_c = [c]
                                clusters.append(cur_c)

                                first_cl = clusters[0]
                                pk_idx = max(first_cl, key=lambda x: x[1])[0]
                                pk_247_val = max(m247_arr[max(0, pk_idx - 4):min(n_fr, pk_idx + 10)])
                                edge_th = max(42.0, pk_247_val * 0.30)
                                onset_idx = pk_idx
                                for k in range(max(115, pk_idx - 8), min(n_fr - 1, pk_idx + 6)):
                                    if m247_arr[k] >= edge_th and m247_arr[k + 1] >= edge_th * 1.15:
                                        onset_idx = k + 1
                                        break
                                earcon_ms = onset_idx * 10

                                hw_end_lim = max(40, onset_idx - 22)
                                hw_slice = rms_arr[20:hw_end_lim]
                                s_hw = sorted(hw_slice) if hw_slice else [15.0]
                                nf = s_hw[int(len(s_hw) * 0.25)]
                                pk_hw = s_hw[-1]
                                hw_th = max(nf * 2.2, nf + 85.0, pk_hw * 0.22)
                                pk_hw_idx = max(range(25, hw_end_lim), key=lambda idx: rms_arr[idx])
                                hw_s = pk_hw_idx
                                while hw_s > 20 and any(rms_arr[k] >= hw_th * 0.75 for k in range(max(20, hw_s - 14), hw_s)):
                                    hw_s -= 1
                                hw_e = pk_hw_idx
                                while hw_e < hw_end_lim and any(rms_arr[k] >= hw_th * 0.70 for k in range(hw_e + 1, min(hw_end_lim + 1, hw_e + 14))):
                                    hw_e += 1
                                wf_res = {
                                    "speech_onset_ms": hw_s * 10,
                                    "speech_end_ms": (hw_e + 1) * 10,
                                    "earcon_onset_ms": earcon_ms,
                                    "earcon_latency_ms": max(0, earcon_ms - (hw_e + 1) * 10)
                                }
                            else:
                                # 2. Fallback: General adaptive burst detector (e.g. Meta AI 495Hz+585Hz chime)
                                s_rms = sorted(rms_arr)
                                nf = s_rms[int(len(s_rms) * 0.25)]
                                pk = s_rms[-1]
                                if pk >= 120 and pk >= nf * 1.8:
                                    th = max(nf * 2.1, nf + 180) if nf > 400 else max(nf * 2.8, nf + 110)
                                    bursts, in_b, bs = [], False, 0
                                    for idx, r in enumerate(rms_arr):
                                        if r >= th and not in_b:
                                            in_b, bs = True, idx
                                        elif r < th and in_b:
                                            if all(x < th for x in rms_arr[idx:min(n_fr, idx + 13)]):
                                                in_b = False
                                                if (idx - bs) >= 4:
                                                    bursts.append((bs, idx))
                                    if in_b and (n_fr - bs) >= 4:
                                        bursts.append((bs, n_fr))
                                    cands = [b for b in bursts if not (b[0] * 10 < 200 and (b[1] - b[0]) * 10 < 160)]
                                    if len(cands) < 2:
                                        cands = bursts
                                    if len(cands) >= 2:
                                        hw_s, hw_e, nxt = cands[0][0], cands[0][1], 1
                                        while nxt < len(cands):
                                            if (cands[nxt][0] - hw_e) * 10 <= 240 and (hw_e - hw_s) * 10 < 460:
                                                hw_e = cands[nxt][1]
                                                nxt += 1
                                            else:
                                                break
                                        for b in cands[nxt:]:
                                            gap_ms = (b[0] - hw_e) * 10
                                            if 150 <= gap_ms <= 3800 and (b[1] - b[0]) * 10 >= 40:
                                                wf_res = {
                                                    "speech_onset_ms": hw_s * 10,
                                                    "speech_end_ms": hw_e * 10,
                                                    "earcon_onset_ms": b[0] * 10,
                                                    "earcon_latency_ms": (b[0] - hw_e) * 10
                                                }
                                                break
                except Exception:
                    pass

                # Prioritize the sample-accurate XR Glasses Earcon waveform result whenever available
                speech_end_off = (wf_res["speech_end_ms"] if wf_res else None) or data.get("speech_end_offset_ms")
                earcon_off = (wf_res["earcon_onset_ms"] if wf_res else None) or data.get("earcon_onset_offset_ms")
                prompt_to_audio = (wf_res["speech_onset_ms"] if wf_res else None) or data.get("prompt_to_audio_delta_ms")
                audio_to_trigger = (wf_res["earcon_latency_ms"] if wf_res else None) or data.get("audio_to_trigger_delta_ms")
                total_lat = (wf_res["earcon_onset_ms"] if wf_res else None) or data.get("total_latency_delta_ms")

                # Update trial in active_session memory & session_audio_map
                with session_lock:
                    session_audio_map[trial_id] = {
                        "audio_file": rel_audio_path,
                        "audio_duration_sec": audio_dur_sec,
                        "audio_onset_ms": data.get("audio_onset_ms"),
                        "speech_end_offset_ms": speech_end_off,
                        "earcon_onset_offset_ms": earcon_off,
                        "device_trigger_ms": data.get("device_trigger_ms"),
                        "prompt_to_audio_delta_ms": prompt_to_audio,
                        "audio_to_trigger_delta_ms": audio_to_trigger,
                        "total_latency_delta_ms": total_lat
                    }
                    for t in active_session.get("trials", []):
                        if t.get("trial_id") == trial_id:
                            t["audio_file"] = rel_audio_path
                            if audio_dur_sec:
                                t["audio_duration_sec"] = audio_dur_sec
                            if data.get("audio_onset_ms"):
                                t["audio_onset_ms"] = data.get("audio_onset_ms")
                            if data.get("device_trigger_ms"):
                                t["device_trigger_ms"] = data.get("device_trigger_ms")
                            if speech_end_off is not None:
                                t["speech_end_offset_ms"] = speech_end_off
                            if earcon_off is not None:
                                t["earcon_onset_offset_ms"] = earcon_off
                            if prompt_to_audio is not None:
                                t["prompt_to_audio_delta_ms"] = prompt_to_audio
                            if audio_to_trigger is not None:
                                t["audio_to_trigger_delta_ms"] = audio_to_trigger
                                t["earcon_latency_ms"] = audio_to_trigger
                            if total_lat is not None:
                                t["total_latency_delta_ms"] = total_lat
                            break

                self.send_json_response({
                    "status": "saved",
                    "audio_file": rel_audio_path,
                    "bytes": len(raw_bytes),
                    "audio_duration_sec": audio_dur_sec,
                    "speech_onset_ms": prompt_to_audio,
                    "speech_end_ms": speech_end_off,
                    "earcon_onset_ms": earcon_off,
                    "earcon_latency_ms": audio_to_trigger
                })
            except Exception as ex:
                self.send_json_response({"status": "error", "message": str(ex)}, 500)

        elif path == "/api/session/upload_batch_chunk":
            session_id = data.get("session_id") or active_session.get("session_id") or "session_current"
            seq = int(data.get("seq", 0))
            batch_start_ms = data.get("batch_start_ms")
            audio_b64 = data.get("audio_base64", "")

            if not audio_b64:
                self.send_json_response({"status": "error", "message": "No audio_base64 provided"}, 400)
                return

            rec_dir = os.path.join(DATA_DIR, "recordings", session_id)
            os.makedirs(rec_dir, exist_ok=True)
            filename = f"{session_id}_batch_full_session.webm"
            filepath = os.path.join(rec_dir, filename)

            try:
                raw_bytes = base64.b64decode(audio_b64)
                write_mode = "wb" if seq == 0 else "ab"
                with open(filepath, write_mode) as bf:
                    bf.write(raw_bytes)

                rel_batch_path = f"recordings/{session_id}/{filename}"
                total_size = os.path.getsize(filepath) if os.path.exists(filepath) else len(raw_bytes)

                with session_lock:
                    active_session["batch_audio_file"] = rel_batch_path
                    if batch_start_ms:
                        active_session["batch_start_ms"] = batch_start_ms

                self.send_json_response({
                    "status": "chunk_saved",
                    "seq": seq,
                    "batch_audio_file": rel_batch_path,
                    "chunk_bytes": len(raw_bytes),
                    "total_bytes": total_size
                })
            except Exception as ex:
                self.send_json_response({"status": "error", "message": str(ex)}, 500)

        elif path == "/api/session/upload_first30_chunk":
            session_id = data.get("session_id") or active_session.get("session_id") or "session_current"
            seq = int(data.get("seq", 0))
            first30_start_ms = data.get("first30_start_ms")
            audio_b64 = data.get("audio_base64", "")

            if not audio_b64:
                self.send_json_response({"status": "error", "message": "No audio_base64 provided"}, 400)
                return

            rec_dir = os.path.join(DATA_DIR, "recordings", session_id)
            os.makedirs(rec_dir, exist_ok=True)
            filename = f"{session_id}_first_30_trials.webm"
            filepath = os.path.join(rec_dir, filename)
            top_level_filepath = os.path.join(DATA_DIR, filename)

            try:
                raw_bytes = base64.b64decode(audio_b64)
                write_mode = "wb" if seq == 0 else "ab"
                with open(filepath, write_mode) as ff:
                    ff.write(raw_bytes)
                # Also write directly to data/{session_id}_first_30_trials.webm
                try:
                    with open(top_level_filepath, write_mode) as tff:
                        tff.write(raw_bytes)
                except Exception:
                    pass

                rel_first30_path = f"recordings/{session_id}/{filename}"
                total_size = os.path.getsize(filepath) if os.path.exists(filepath) else len(raw_bytes)

                with session_lock:
                    active_session["first30_audio_file"] = rel_first30_path
                    if first30_start_ms:
                        active_session["first30_start_ms"] = first30_start_ms

                self.send_json_response({
                    "status": "chunk_saved",
                    "seq": seq,
                    "first30_audio_file": rel_first30_path,
                    "chunk_bytes": len(raw_bytes),
                    "total_bytes": total_size
                })
            except Exception as ex:
                self.send_json_response({"status": "error", "message": str(ex)}, 500)

        elif path == "/api/audio/set_device":
            target = data.get("device_name", "Wireless PRO RX")
            info = configure_system_audio_source(preferred_device=target)
            self.send_json_response(info)

        elif path == "/api/session/finalize":
            incoming_trials = data.get("trials") if isinstance(data, dict) else None
            incoming_meta = data.get("metadata") or data if isinstance(data, dict) else {}
            with session_lock:
                active_session["status"] = "completed"
                active_session["end_time_iso"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
                if incoming_trials:
                    active_session["trials"] = incoming_trials
                if incoming_meta.get("participant_id"):
                    active_session["participant_id"] = incoming_meta.get("participant_id")
                if incoming_meta.get("suite_name"):
                    active_session["suite_name"] = incoming_meta.get("suite_name")
                if incoming_meta.get("batch_start_ms") and not active_session.get("batch_start_ms"):
                    active_session["batch_start_ms"] = incoming_meta.get("batch_start_ms")

                # Merge recorded audio & acoustic earcon latency info into trials
                for t in active_session.get("trials", []):
                    tid = t.get("trial_id")
                    if tid in session_audio_map:
                        rec_info = session_audio_map[tid]
                        if not t.get("audio_file"):
                            t["audio_file"] = rec_info.get("audio_file")
                        if rec_info.get("audio_onset_ms"):
                            t["audio_onset_ms"] = rec_info.get("audio_onset_ms")
                        if rec_info.get("device_trigger_ms"):
                            t["device_trigger_ms"] = rec_info.get("device_trigger_ms")
                        if rec_info.get("speech_end_offset_ms") is not None:
                            t["speech_end_offset_ms"] = rec_info.get("speech_end_offset_ms")
                        if rec_info.get("earcon_onset_offset_ms") is not None:
                            t["earcon_onset_offset_ms"] = rec_info.get("earcon_onset_offset_ms")
                        if rec_info.get("prompt_to_audio_delta_ms") is not None:
                            t["prompt_to_audio_delta_ms"] = rec_info.get("prompt_to_audio_delta_ms")
                        if rec_info.get("audio_to_trigger_delta_ms") is not None:
                            t["audio_to_trigger_delta_ms"] = rec_info.get("audio_to_trigger_delta_ms")
                            t["earcon_latency_ms"] = rec_info.get("audio_to_trigger_delta_ms")
                        if rec_info.get("total_latency_delta_ms") is not None:
                            t["total_latency_delta_ms"] = rec_info.get("total_latency_delta_ms")
                        if rec_info.get("audio_duration_sec") is not None:
                            t["audio_duration_sec"] = rec_info.get("audio_duration_sec")

                sid = active_session.get("session_id") or f"session_{datetime.datetime.now().strftime('%Y%m%d_%H%M%S')}"
                meta_copy = {
                    "session_id": sid,
                    "participant_id": active_session.get("participant_id") or "P01",
                    "suite_name": active_session.get("suite_name") or "Hotwords Suite",
                    "start_time_iso": active_session.get("start_time_iso") or datetime.datetime.now(datetime.timezone.utc).isoformat(),
                    "end_time_iso": active_session["end_time_iso"],
                    "telemetry_source": collector.source_mode,
                    "batch_start_ms": active_session.get("batch_start_ms"),
                    "batch_audio_file": None,
                    "batch_audio_size_bytes": 0,
                    "first30_audio_file": None,
                    "first30_audio_size_bytes": 0
                }

                # Organize and align recordings folder
                rec_base = os.path.join(DATA_DIR, "recordings")
                curr_rec_dir = os.path.join(rec_base, "session_current")
                target_rec_dir = os.path.join(rec_base, sid)
                os.makedirs(target_rec_dir, exist_ok=True)

                if os.path.exists(curr_rec_dir) and sid != "session_current":
                    import shutil
                    min_mtime = (active_session.get("start_epoch_sec") or (time.time() - 3600)) - 15
                    for f in os.listdir(curr_rec_dir):
                        src_f = os.path.join(curr_rec_dir, f)
                        if not os.path.isfile(src_f):
                            continue
                        try:
                            if os.path.getmtime(src_f) < min_mtime:
                                continue
                        except Exception:
                            pass
                        if "batch_full_session" in f:
                            dst_name = f"{sid}_batch_full_session.webm"
                        elif "first_30_trials" in f or "first30" in f:
                            dst_name = f"{sid}_first_30_trials.webm"
                        else:
                            dst_name = f
                        dst_f = os.path.join(target_rec_dir, dst_name)
                        try:
                            if not os.path.exists(dst_f) or "batch_full_session" in f or "first_30" in f:
                                shutil.copy2(src_f, dst_f)
                        except Exception:
                            pass
                    shutil.rmtree(curr_rec_dir, ignore_errors=True)

                # Ensure first 30 trials dedicated recording exists and is synced to DATA_DIR
                ensure_first30_audio_file(sid, target_rec_dir)

                # Scan target_rec_dir to ensure EVERY trial, the first-30 recording, and the full-session batch recording are linked
                if os.path.exists(target_rec_dir):
                    disk_files = [f for f in os.listdir(target_rec_dir) if f.endswith((".webm", ".wav"))]
                    batch_candidates = [f for f in disk_files if "batch" in f.lower()]
                    if batch_candidates:
                        chosen_batch = batch_candidates[0]
                        batch_full_p = os.path.join(target_rec_dir, chosen_batch)
                        meta_copy["batch_audio_file"] = f"recordings/{sid}/{chosen_batch}"
                        meta_copy["batch_audio_size_bytes"] = os.path.getsize(batch_full_p)
                        active_session["batch_audio_file"] = meta_copy["batch_audio_file"]

                    first30_candidates = [f for f in disk_files if "first_30" in f.lower() or "first30" in f.lower()]
                    if first30_candidates:
                        chosen_first30 = first30_candidates[0]
                        first30_full_p = os.path.join(target_rec_dir, chosen_first30)
                        meta_copy["first30_audio_file"] = f"recordings/{sid}/{chosen_first30}"
                        meta_copy["first30_audio_size_bytes"] = os.path.getsize(first30_full_p)
                        active_session["first30_audio_file"] = meta_copy["first30_audio_file"]

                    for t in active_session.get("trials", []):
                        tid = t.get("trial_id")
                        af = t.get("audio_file") or ""
                        if "session_current" in af:
                            t["audio_file"] = af.replace("session_current", sid)
                        elif not af and tid:
                            matches = [f for f in disk_files if f.startswith(f"{tid}_")]
                            if matches:
                                t["audio_file"] = f"recordings/{sid}/{matches[0]}"

                trials_copy = list(active_session["trials"])
                events_copy = list(active_session["telemetry_events"])

            # Align logs and compute metrics
            aligned_rows = parser.align_trial_events(trials_copy, events_copy)
            # Attach batch_offset_sec to aligned_rows if batch_start_ms or first prompt_start_ms is available
            batch_t0 = meta_copy.get("batch_start_ms")
            if not batch_t0 and aligned_rows:
                valid_starts = [r.get("prompt_start_ms") for r in aligned_rows if isinstance(r.get("prompt_start_ms"), (int, float)) and r.get("prompt_start_ms") > 0]
                if valid_starts:
                    batch_t0 = min(valid_starts)
            for idx_r, r in enumerate(aligned_rows):
                orig_offset = trials_copy[idx_r].get("batch_offset_sec") if idx_r < len(trials_copy) else None
                if orig_offset is not None:
                    r["batch_offset_sec"] = orig_offset
                elif batch_t0 and isinstance(r.get("prompt_start_ms"), (int, float)) and r.get("prompt_start_ms") >= batch_t0:
                    r["batch_offset_sec"] = round((r["prompt_start_ms"] - batch_t0) / 1000.0, 2)
                else:
                    r["batch_offset_sec"] = None
                if meta_copy.get("batch_audio_file"):
                    r["batch_audio_file"] = meta_copy["batch_audio_file"]
                if meta_copy.get("first30_audio_file") and idx_r < 30:
                    r["first30_audio_file"] = meta_copy["first30_audio_file"]

            confusion_matrix = parser.compute_confusion_matrix(aligned_rows)
            summary_stats = parser.compute_summary_statistics(aligned_rows)

            sid = meta_copy["session_id"] or f"session_{int(time.time())}"
            json_path = os.path.join(DATA_DIR, f"{sid}.json")
            csv_path = os.path.join(DATA_DIR, f"{sid}.csv")
            html_path = os.path.join(DATA_DIR, f"{sid}_report.html")
            benchmark_csv_path = os.path.join(DATA_DIR, f"{sid}_benchmark.csv")
            benchmark_json_path = os.path.join(DATA_DIR, f"{sid}_benchmark.json")
            benchmark_md_path = os.path.join(DATA_DIR, f"{sid}_benchmark_report.md")

            parser.export_json(meta_copy, aligned_rows, summary_stats, confusion_matrix, json_path)
            parser.export_csv(aligned_rows, csv_path)
            parser.export_html_report(meta_copy, aligned_rows, summary_stats, confusion_matrix, html_path)
            parser.export_benchmark_csv(meta_copy, aligned_rows, benchmark_csv_path)
            parser.export_benchmark_json(meta_copy, aligned_rows, benchmark_json_path)
            parser.export_benchmark_markdown_report(meta_copy, aligned_rows, benchmark_md_path)

            # Archive any previous sessions out of DATA_DIR so data/ contains ONLY the current session
            try:
                import shutil
                archive_dir = os.path.join(PROJECT_DIR, ".archived_sessions")
                archive_rec_dir = os.path.join(archive_dir, "recordings")
                os.makedirs(archive_rec_dir, exist_ok=True)
                for fname in os.listdir(DATA_DIR):
                    if fname in (".gitkeep", "recordings") or fname.startswith("."):
                        continue
                    if not fname.startswith(sid):
                        src_old = os.path.join(DATA_DIR, fname)
                        dst_old = os.path.join(archive_dir, fname)
                        if os.path.exists(dst_old):
                            if os.path.isdir(dst_old):
                                shutil.rmtree(dst_old, ignore_errors=True)
                            else:
                                os.remove(dst_old)
                        shutil.move(src_old, dst_old)
                rec_base_dir = os.path.join(DATA_DIR, "recordings")
                if os.path.exists(rec_base_dir):
                    for dname in os.listdir(rec_base_dir):
                        if dname == ".gitkeep" or dname.startswith(".") or dname == sid:
                            continue
                        src_r = os.path.join(rec_base_dir, dname)
                        dst_r = os.path.join(archive_rec_dir, dname)
                        if os.path.exists(dst_r):
                            if os.path.isdir(dst_r):
                                shutil.rmtree(dst_r, ignore_errors=True)
                            else:
                                os.remove(dst_r)
                        shutil.move(src_r, dst_r)
            except Exception:
                pass

            collector.emit_event("SESSION_FINALIZED", {
                "session_id": sid,
                "summary": summary_stats,
                "report_url": f"/data/{sid}_report.html"
            })

            self.send_json_response({
                "status": "finalized",
                "session_metadata": meta_copy,
                "summary_statistics": summary_stats,
                "confusion_matrix": confusion_matrix,
                "trial_rows": aligned_rows,
                "files": {
                    "json": json_path,
                    "csv": csv_path,
                    "html": html_path,
                    "benchmark_csv": benchmark_csv_path,
                    "benchmark_json": benchmark_json_path,
                    "benchmark_md": benchmark_md_path,
                    "batch_audio": meta_copy.get("batch_audio_file"),
                    "first30_audio": meta_copy.get("first30_audio_file")
                },
                "report_url": f"/data/{sid}_report.html"
            })

        else:
            self.send_error(404, "Endpoint not found")


class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True


def run_server(port: int = 8080):
    server_address = ("", port)
    httpd = ThreadedHTTPServer(server_address, TelemetryHTTPHandler)
    url = f"http://localhost:{port}"
    print("============================================================")
    print("🚀 Gemini Hotwords Telemetry Testing Server is live!")
    print(f"📡 Web Interface: {url}")
    print(f"🔊 Phone 1 Bridge: {url}/phone_speaker")
    print(f"📊 Storage Directory: {DATA_DIR}")
    print(f"⚙️  Configs Directory: {CONFIGS_DIR}")
    print("============================================================")

    # Attempt to automatically open the default web browser
    def _open_browser():
        try:
            webbrowser.open(url)
        except (OSError, webbrowser.Error):
            pass

    threading.Timer(0.6, _open_browser).start()

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nShutting down server...")
        collector.stop()
        httpd.shutdown()


if __name__ == "__main__":
    port_arg = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    run_server(port_arg)
