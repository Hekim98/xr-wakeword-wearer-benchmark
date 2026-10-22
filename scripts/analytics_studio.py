#!/usr/bin/env python3
"""
Hotword & Bystander Study Analytics Studio (Comprehensive Multi-Participant & Hotword Ranking Edition)
=====================================================================================================
Performs granular cross-participant and cross-device evaluation for Smart Glasses
(Android XR Smart Glasses Android XR vs. Meta Ray-Ban Wayfarer 2).

Includes:
  - Hotword Invocation Sensitivity Ranking (Most to Least Invoked Hotwords, head-to-head).
  - Participant Scorecards (Participant IDs, trial counts, Rejection %, FAR %, Intrusions).
  - Condition-by-Condition Participant Breakdowns (Distance, Angle, Vocal Level, Hotwords).
  - Within-Subject Control Analysis (Direct head-to-head on identical participants, e.g., P01).
  - Standalone Interactive HTML Executive Dashboard with Dynamic Participant Filtering.
  - Granular CSV exports for UXR leadership and statistical modeling.

Zero-dependency: Runs on standard Python 3.8+ (no pandas/numpy required).
"""

import argparse
import csv
import datetime
import glob
import json
import math
import os
import sys
import webbrowser
from collections import Counter, defaultdict

# Default local directory for exported study logs
DEFAULT_DRIVE_BYSTANDER_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "logs"
)

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
DEFAULT_OUTPUT_DIR = os.path.join(PROJECT_DIR, "analytics_results")


def parse_number(val):
    """Extract float from strings like '1.5 ft', '30°', etc."""
    if val is None:
        return 0.0
    s = str(val).replace("°", "").replace("ft", "").replace("ms", "").strip()
    try:
        return float(s)
    except ValueError:
        return 0.0


def clean_angle(deg_val):
    """Normalize angle to 'X°' format."""
    if deg_val is None:
        return "Unknown"
    s = str(deg_val).replace("°", "").strip()
    try:
        val = int(float(s))
        return f"{val}°"
    except (ValueError, TypeError):
        return str(deg_val).strip()


def clean_distance(dist_val):
    """Normalize distance format."""
    if dist_val is None:
        return "Unknown"
    s = str(dist_val).strip()
    if s.endswith("ft"):
        return s
    try:
        f = float(s)
        return f"{f:g} ft"
    except ValueError:
        return s


def categorize_hotword_family(phrase, target_hw=None):
    """Group hotword into HEY, OK, GEMINI, or OTHER."""
    combined = f"{phrase or ''} {target_hw or ''}".upper()
    if "GEMINI" in combined:
        return "GEMINI"
    elif "HEY" in combined:
        return "HEY"
    elif "OK" in combined or "OKAY" in combined:
        return "OK"
    return "OTHER"


class GranularBystanderAnalyticsEngine:
    def __init__(self, output_dir=None):
        self.output_dir = output_dir or DEFAULT_OUTPUT_DIR
        os.makedirs(self.output_dir, exist_ok=True)
        self.trials = []
        self.devices = set()
        self.participants = set()
        self.participants_by_device = defaultdict(set)

    def load_from_paths(self, file_or_dir_paths):
        """Ingests CSV files or directories containing CSVs."""
        csv_files = []
        for p in file_or_dir_paths:
            if not p or not os.path.exists(p):
                continue
            if os.path.isfile(p) and p.endswith(".csv"):
                csv_files.append(p)
            elif os.path.isdir(p):
                merged = glob.glob(os.path.join(p, "final merged data*.csv"))
                if merged:
                    csv_files.extend(merged)
                else:
                    csv_files.extend(glob.glob(os.path.join(p, "**/session_*.csv"), recursive=True))
                    csv_files.extend(glob.glob(os.path.join(p, "**/gemini_live_*.csv"), recursive=True))

        print(f"[*] Found {len(csv_files)} relevant CSV files for ingestion.")
        for fpath in csv_files:
            self._ingest_csv(fpath)

        print(f"[+] Loaded {len(self.trials)} total trials across {len(self.devices)} devices.")
        for dev in sorted(self.devices):
            parts = sorted(self.participants_by_device[dev])
            print(f"    • {dev}: {len(parts)} participants -> {', '.join(parts)}")

    def _ingest_csv(self, filepath):
        """Parse individual or merged CSV file into unified trial schema."""
        try:
            with open(filepath, mode="r", encoding="utf-8-sig") as f:
                reader = csv.DictReader(f)
                filename = os.path.basename(filepath)
                
                device_guess = "Unknown"
                if any(x in filepath.lower() for x in ["meta", "mrb", "wayfarer"]):
                    device_guess = "Meta Ray-Ban"
                elif any(x in filepath.lower() for x in ["xr_glasses", "smart_glasses", "android", "gemini"]):
                    device_guess = "Android XR Smart Glasses"

                for r in reader:
                    outcome = (r.get("response_outcome") or "").strip().upper()
                    if outcome in ("SKIPPED", "IGNORE", ""):
                        continue

                    raw_dev = (
                        r.get("Device")
                        or r.get("device")
                        or r.get("ai_assistant")
                        or device_guess
                    ).strip()

                    if any(x in raw_dev.lower() for x in ["meta", "rayban", "wayfarer"]):
                        device = "Meta Ray-Ban (Meta AI)"
                    else:
                        device = "Android XR Smart Glasses (Android XR)"

                    im_id = (r.get("im_id") or r.get("participant_id") or "Unknown").strip().upper()
                    degree = clean_angle(r.get("degree"))
                    distance = clean_distance(r.get("distance"))
                    vocal = (r.get("vocal_level") or "Conversational").strip()
                    phrase = (r.get("phrase") or "").strip()
                    target_hw = (r.get("target_hotword") or "").strip()
                    detected_hw = (r.get("detected_hotword") or "").strip()

                    is_asleep = "ASLEEP" in outcome or outcome == "TN"
                    is_activated = "ACTIVATED" in outcome or outcome in ("FP", "TP")
                    is_answered = "ANSWERED" in outcome

                    lat_str = r.get("audio_to_trigger_delta_ms") or r.get("total_latency_delta_ms") or ""
                    latency_ms = parse_number(lat_str)

                    trial = {
                        "device": device,
                        "im_id": im_id,
                        "trial_id": r.get("trial_id", ""),
                        "degree": degree,
                        "degree_num": parse_number(degree),
                        "distance": distance,
                        "distance_num": parse_number(distance),
                        "vocal_level": vocal,
                        "phrase": phrase,
                        "target_hotword": target_hw,
                        "detected_hotword": detected_hw,
                        "family": categorize_hotword_family(phrase, target_hw),
                        "response_outcome": outcome,
                        "is_asleep": is_asleep,
                        "is_activated": is_activated,
                        "is_answered": is_answered,
                        "latency_ms": latency_ms,
                        "source_file": filename,
                    }
                    self.trials.append(trial)
                    self.devices.add(device)
                    if im_id != "UNKNOWN":
                        self.participants.add(im_id)
                        self.participants_by_device[device].add(im_id)
        except Exception as e:
            print(f"[!] Warning: Failed parsing {filepath}: {e}")

    def compute_metrics(self, trial_subset):
        """Computes aggregate bystander rejection, FAR, intrusion, and latency metrics."""
        trials = trial_subset or []
        total = len(trials)
        if total == 0:
            return {
                "total": 0, "asleep": 0, "activated": 0, "answered": 0,
                "rejection_rate": 0.0, "far": 0.0, "intrusion_rate": 0.0,
                "latency_p50": 0.0, "latency_p90": 0.0, "latency_mean": 0.0,
            }

        asleep = sum(1 for t in trials if t["is_asleep"])
        activated = sum(1 for t in trials if t["is_activated"])
        answered = sum(1 for t in trials if t["is_answered"])

        latencies = sorted([t["latency_ms"] for t in trials if t["is_activated"] and t["latency_ms"] > 0])
        p50 = latencies[len(latencies) // 2] if latencies else 0.0
        p90 = latencies[int(len(latencies) * 0.9)] if latencies else 0.0
        p_mean = sum(latencies) / len(latencies) if latencies else 0.0

        return {
            "total": total,
            "asleep": asleep,
            "activated": activated,
            "answered": answered,
            "rejection_rate": (asleep / total * 100.0) if total else 0.0,
            "far": (activated / total * 100.0) if total else 0.0,
            "intrusion_rate": (answered / total * 100.0) if total else 0.0,
            "latency_p50": p50,
            "latency_p90": p90,
            "latency_mean": p_mean,
        }

    def compute_hotword_rankings(self):
        """Computes ranking of each specific hotword phrase from most invoked to least invoked."""
        rankings = {}
        for dev in sorted(self.devices):
            dev_trials = [t for t in self.trials if t["device"] == dev]
            by_phrase = defaultdict(list)
            for t in dev_trials:
                phrase = (t.get("phrase") or t.get("target_hotword") or "Unknown").strip()
                by_phrase[phrase].append(t)

            ranked_list = []
            for phrase, p_trials in by_phrase.items():
                m = self.compute_metrics(p_trials)

                # Distance breakdown for this hotword
                dist_map = defaultdict(list)
                for t in p_trials:
                    dist_map[t["distance"]].append(t)
                dist_breakdown = {d: self.compute_metrics(dist_map[d]) for d in sorted(dist_map, key=parse_number)}

                # Vocal level breakdown
                voc_map = defaultdict(list)
                for t in p_trials:
                    voc_map[t["vocal_level"]].append(t)
                voc_breakdown = {v: self.compute_metrics(voc_map[v]) for v in sorted(voc_map)}

                ranked_list.append({
                    "device": dev,
                    "phrase": phrase,
                    "family": categorize_hotword_family(phrase),
                    "total_trials": m["total"],
                    "activated": m["activated"],
                    "asleep": m["asleep"],
                    "answered": m["answered"],
                    "far": m["far"],
                    "rejection_rate": m["rejection_rate"],
                    "intrusion_rate": m["intrusion_rate"],
                    "by_distance": dist_breakdown,
                    "by_vocal": voc_breakdown,
                })

            # Sort descending by FAR (highest FAR = most invoked / most vulnerable)
            ranked_list.sort(key=lambda x: x["far"], reverse=True)
            for idx, item in enumerate(ranked_list):
                item["rank"] = idx + 1
                item["is_most_invoked"] = (idx == 0)
                item["is_least_invoked"] = (idx == len(ranked_list) - 1)

            rankings[dev] = ranked_list
        return rankings

    def compute_participant_scorecards(self):
        """Generates comprehensive scorecard for each participant on each device."""
        scorecards = []
        for dev in sorted(self.devices):
            dev_trials = [t for t in self.trials if t["device"] == dev]
            part_map = defaultdict(list)
            for t in dev_trials:
                part_map[t["im_id"]].append(t)

            for im_id in sorted(part_map.keys()):
                p_trials = part_map[im_id]
                m = self.compute_metrics(p_trials)

                # Find worst angle
                by_ang = defaultdict(list)
                for t in p_trials:
                    by_ang[t["degree"]].append(t)
                worst_ang = "None"
                worst_ang_far = -1
                for ang, a_trials in by_ang.items():
                    a_far = (sum(1 for x in a_trials if x["is_activated"]) / len(a_trials)) * 100
                    if a_far > worst_ang_far:
                        worst_ang_far = a_far
                        worst_ang = f"{ang} ({a_far:.0f}% FAR)"

                # Find worst distance
                by_dst = defaultdict(list)
                for t in p_trials:
                    by_dst[t["distance"]].append(t)
                worst_dst = "None"
                worst_dst_far = -1
                for dst, d_trials in by_dst.items():
                    d_far = (sum(1 for x in d_trials if x["is_activated"]) / len(d_trials)) * 100
                    if d_far > worst_dst_far:
                        worst_dst_far = d_far
                        worst_dst = f"{dst} ({d_far:.0f}% FAR)"

                scorecards.append({
                    "device": dev,
                    "im_id": im_id,
                    "total_trials": m["total"],
                    "asleep": m["asleep"],
                    "activated": m["activated"],
                    "answered": m["answered"],
                    "rejection_rate": m["rejection_rate"],
                    "far": m["far"],
                    "intrusion_rate": m["intrusion_rate"],
                    "latency_p50": m["latency_p50"],
                    "latency_p90": m["latency_p90"],
                    "worst_angle": worst_ang,
                    "worst_distance": worst_dst,
                })
        return scorecards

    def compute_condition_breakdowns(self):
        """Computes condition-level metrics along with participant counts (N) and IM lists."""
        breakdowns = defaultdict(list)

        dimensions = [
            ("Angle", "degree", lambda v: parse_number(v)),
            ("Distance", "distance", lambda v: parse_number(v)),
            ("Vocal Level", "vocal_level", lambda v: str(v)),
            ("Hotword Phrase", "phrase", lambda v: str(v)),
        ]

        for dev in sorted(self.devices):
            dev_trials = [t for t in self.trials if t["device"] == dev]

            for dim_label, attr, sort_key in dimensions:
                cond_groups = defaultdict(list)
                for t in dev_trials:
                    cond_groups[t[attr]].append(t)

                for cat in sorted(cond_groups.keys(), key=sort_key):
                    c_trials = cond_groups[cat]
                    overall_m = self.compute_metrics(c_trials)

                    # Group by participant in this condition
                    part_groups = defaultdict(list)
                    for t in c_trials:
                        part_groups[t["im_id"]].append(t)

                    participants_tested = sorted(part_groups.keys())
                    part_stats = {}
                    for p in participants_tested:
                        pm = self.compute_metrics(part_groups[p])
                        part_stats[p] = {
                            "trials": pm["total"],
                            "activated": pm["activated"],
                            "asleep": pm["asleep"],
                            "answered": pm["answered"],
                            "far": pm["far"],
                            "rejection_rate": pm["rejection_rate"],
                        }

                    breakdowns[dev].append({
                        "dimension": dim_label,
                        "category": cat,
                        "total_trials": overall_m["total"],
                        "overall_rejection": overall_m["rejection_rate"],
                        "overall_far": overall_m["far"],
                        "overall_intrusion": overall_m["intrusion_rate"],
                        "participant_count": len(participants_tested),
                        "participants_list": participants_tested,
                        "participant_details": part_stats,
                    })

        return breakdowns

    def analyze_within_subject_controls(self):
        """Identifies participants who tested BOTH devices and provides direct control comparisons."""
        dev_list = sorted(list(self.devices))
        if len(dev_list) < 2:
            return []

        dev1, dev2 = dev_list[0], dev_list[1]
        p1 = self.participants_by_device[dev1]
        p2 = self.participants_by_device[dev2]
        overlapping = sorted(list(p1.intersection(p2)))

        controls = []
        for im in overlapping:
            t1 = [t for t in self.trials if t["device"] == dev1 and t["im_id"] == im]
            t2 = [t for t in self.trials if t["device"] == dev2 and t["im_id"] == im]
            m1 = self.compute_metrics(t1)
            m2 = self.compute_metrics(t2)

            controls.append({
                "im_id": im,
                "dev1_name": dev1,
                "dev1_trials": m1["total"],
                "dev1_far": m1["far"],
                "dev1_rejection": m1["rejection_rate"],
                "dev1_answered": m1["answered"],
                "dev2_name": dev2,
                "dev2_trials": m2["total"],
                "dev2_far": m2["far"],
                "dev2_rejection": m2["rejection_rate"],
                "dev2_answered": m2["answered"],
                "far_delta": m2["far"] - m1["far"],
            })
        return controls

    def print_granular_terminal_report(self, scorecards, breakdowns, controls, hotword_rankings):
        """Displays rich terminal tables with participant IDs, condition details, and hotword ranking."""
        print("\n" + "=" * 95)
        print("🕶️  SMART GLASSES HOTWORD & BYSTANDER STUDY: DETAILED MULTI-PARTICIPANT REPORT")
        print("=" * 95)

        # 1. Study-wide Participant Census
        print("\n📋 PARTICIPANT ENROLLMENT & TESTING CENSUS")
        for dev in sorted(self.devices):
            parts = sorted(self.participants_by_device[dev])
            print(f"  • {dev:<28}: N = {len(parts):>2} participants | IDs: {', '.join(parts)}")

        # 2. Hotword Invocation Sensitivity Ranking (Most to Least Invoked)
        print("\n" + "-" * 95)
        print("🔥 HOTWORD INVOCATION SENSITIVITY RANKING (MOST TO LEAST INVOKED)")
        print("-" * 95)
        for dev, hw_list in hotword_rankings.items():
            print(f"\n▶ {dev.upper()}")
            for item in hw_list:
                tag = "[MOST INVOKED - VULNERABLE]" if item["is_most_invoked"] else ("[LEAST INVOKED - SAFEST]" if item["is_least_invoked"] else "")
                print(f"    #{item['rank']} {item['phrase']:<15}: FAR = {item['far']:>5.2f}% ({item['activated']:>2}/{item['total_trials']} invokes) | Rej = {item['rejection_rate']:>5.2f}% | Answered = {item['answered']:>2} {tag}")

        # 3. Within-subject Control Highlight
        if controls:
            print("\n" + "-" * 95)
            print("🔬 WITHIN-SUBJECT DIRECT CONTROLS (Identical Participant Across Both Devices):")
            for c in controls:
                print(f"  ★ Participant {c['im_id']}:")
                print(f"      - {c['dev1_name']:<24}: {c['dev1_trials']:>3} trials | FAR: {c['dev1_far']:>5.1f}% | Rejection: {c['dev1_rejection']:>5.1f}% (Intrusions: {c['dev1_answered']})")
                print(f"      - {c['dev2_name']:<24}: {c['dev2_trials']:>3} trials | FAR: {c['dev2_far']:>5.1f}% | Rejection: {c['dev2_rejection']:>5.1f}% (Intrusions: {c['dev2_answered']})")
                print(f"      - Net Advantage          : {abs(c['far_delta']):.1f}% lower FAR on {c['dev1_name'] if c['far_delta'] > 0 else c['dev2_name']}")

        # 4. Individual Participant Scorecards
        print("\n" + "-" * 95)
        print(f"{'DEVICE':<25} | {'IM ID':<6} | {'TRIALS':<6} | {'REJ %':<7} | {'FAR %':<7} | {'INTR':<5} | {'WORST ANGLE':<16} | {'WORST DIST':<14}")
        print("-" * 95)
        for s in scorecards:
            print(f"{s['device'][:25]:<25} | {s['im_id']:<6} | {s['total_trials']:>6} | {s['rejection_rate']:>6.1f}% | {s['far']:>6.1f}% | {s['answered']:>5} | {s['worst_angle']:<16} | {s['worst_distance']:<14}")

        # 5. Condition Breakdown with Participant Counts
        print("\n" + "-" * 95)
        print("🎯 CONDITION BREAKDOWN WITH TESTER COUNTS & PARTICIPANT LIST")
        print("-" * 95)
        for dev, c_list in breakdowns.items():
            print(f"\n▶ {dev.upper()}")
            current_dim = None
            for c in c_list:
                if c["dimension"] != current_dim:
                    current_dim = c["dimension"]
                    print(f"\n  [{current_dim} Breakdown]")
                p_list_str = ", ".join(c["participants_list"])
                print(f"    • {c['category']:<15}: N={c['participant_count']:>2} [{p_list_str}] | FAR: {c['overall_far']:>5.1f}% | Rej: {c['overall_rejection']:>5.1f}% | Trials: {c['total_trials']}")

        print("\n" + "=" * 95)

    def export_csv_reports(self, scorecards, breakdowns, hotword_rankings):
        """Exports participant scorecards, condition breakdowns, and hotword rankings to CSV."""
        # 1. Hotword Ranking CSV
        hw_csv = os.path.join(self.output_dir, "bystander_hotword_ranking.csv")
        with open(hw_csv, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "Device", "Rank", "Hotword_Phrase", "Hotword_Family", "Total_Trials",
                "Activated_Invokes", "Stayed_Asleep", "Intrusions_Answered",
                "FAR_Pct", "Rejection_Rate_Pct", "Intrusion_Rate_Pct", "Status_Tag"
            ])
            for dev, hw_list in hotword_rankings.items():
                for h in hw_list:
                    tag = "MOST_INVOKED" if h["is_most_invoked"] else ("LEAST_INVOKED" if h["is_least_invoked"] else "NORMAL")
                    writer.writerow([
                        dev, h["rank"], h["phrase"], h["family"], h["total_trials"],
                        h["activated"], h["asleep"], h["answered"],
                        f"{h['far']:.2f}", f"{h['rejection_rate']:.2f}", f"{h['intrusion_rate']:.2f}", tag
                    ])
        print(f"[+] Exported Hotword Ranking CSV: {hw_csv}")

        # 2. Participant Scorecard CSV
        scorecard_csv = os.path.join(self.output_dir, "bystander_participant_scorecard.csv")
        with open(scorecard_csv, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "Device", "Participant_IM_ID", "Total_Trials", "Stayed_Asleep_Success",
                "Unintended_Wake_FAR_Fail", "Intrusions_Answered", "Rejection_Rate_Pct",
                "FAR_Pct", "Intrusion_Rate_Pct", "Latency_P50_ms", "Latency_P90_ms",
                "Worst_Angle", "Worst_Distance"
            ])
            for s in scorecards:
                writer.writerow([
                    s["device"], s["im_id"], s["total_trials"], s["asleep"],
                    s["activated"], s["answered"], f"{s['rejection_rate']:.2f}",
                    f"{s['far']:.2f}", f"{s['intrusion_rate']:.2f}",
                    f"{s['latency_p50']:.0f}", f"{s['latency_p90']:.0f}",
                    s["worst_angle"], s["worst_distance"]
                ])
        print(f"[+] Exported Participant Scorecard CSV: {scorecard_csv}")

        # 3. Condition x Participant Breakdown CSV
        cond_csv = os.path.join(self.output_dir, "bystander_condition_participant_breakdown.csv")
        with open(cond_csv, mode="w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            writer.writerow([
                "Device", "Dimension", "Condition_Category", "Condition_Total_Trials",
                "Condition_FAR_Pct", "Condition_Rejection_Pct", "Participant_Count_N",
                "Participant_IM_ID", "Participant_Trials", "Participant_Activated_Fail",
                "Participant_Stayed_Asleep", "Participant_FAR_Pct", "Participant_Rejection_Pct"
            ])
            for dev, c_list in breakdowns.items():
                for c in c_list:
                    for im_id, pstat in c["participant_details"].items():
                        writer.writerow([
                            dev, c["dimension"], c["category"], c["total_trials"],
                            f"{c['overall_far']:.2f}", f"{c['overall_rejection']:.2f}",
                            c["participant_count"], im_id, pstat["trials"],
                            pstat["activated"], pstat["asleep"],
                            f"{pstat['far']:.2f}", f"{pstat['rejection_rate']:.2f}"
                        ])
        print(f"[+] Exported Condition x Participant CSV: {cond_csv}")

    def export_html_dashboard(self, scorecards, breakdowns, controls, hotword_rankings):
        """Generates interactive executive HTML dashboard with dynamic participant filter & hotword rankings."""
        html_path = os.path.join(self.output_dir, "bystander_executive_dashboard.html")
        timestamp = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        trials_json = json.dumps(self.trials)
        scorecards_json = json.dumps(scorecards)
        controls_json = json.dumps(controls)
        rankings_json = json.dumps(hotword_rankings)
        all_participants = sorted(list(self.participants))

        xr_glasses_trials = [t for t in self.trials if "xr_glasses" in t["device"].lower()]
        meta_trials = [t for t in self.trials if "meta" in t["device"].lower()]
        jm = self.compute_metrics(xr_glasses_trials)
        mm = self.compute_metrics(meta_trials)

        xr_glasses_parts = sorted(self.participants_by_device["Android XR Smart Glasses (Android XR)"])
        meta_parts = sorted(self.participants_by_device["Meta Ray-Ban (Meta AI)"])

        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Glasses Bystander Study: Executive Benchmark Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        :root {{
            --bg: #0f172a;
            --surface: #1e293b;
            --surface-hover: #334155;
            --border: #334155;
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --google-blue: #3b82f6;
            --google-green: #10b981;
            --meta-blue: #6366f1;
            --meta-accent: #f43f5e;
            --warning: #f59e0b;
        }}
        * {{ margin: 0; padding: 0; box-sizing: border-box; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }}
        body {{ background: var(--bg); color: var(--text-main); padding: 24px; line-height: 1.5; }}
        
        .header {{ display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid var(--border); padding-bottom: 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 16px; }}
        .title h1 {{ font-size: 26px; font-weight: 700; color: #fff; display: flex; align-items: center; gap: 10px; }}
        .title p {{ font-size: 14px; color: var(--text-muted); margin-top: 4px; }}
        
        .controls-bar {{ display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }}
        .filter-group {{ display: flex; align-items: center; gap: 8px; background: var(--surface); padding: 6px 12px; border-radius: 8px; border: 1px solid var(--border); }}
        .filter-label {{ font-size: 12px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; }}
        select {{ background: transparent; color: #fff; border: none; font-size: 14px; font-weight: 600; outline: none; cursor: pointer; }}
        select option {{ background: var(--surface); color: #fff; }}

        .badge {{ background: #1e3a8a; color: #93c5fd; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; text-transform: uppercase; }}
        .im-pill {{ background: #334155; color: #e2e8f0; padding: 2px 7px; border-radius: 4px; font-size: 11px; font-weight: 700; margin-right: 4px; display: inline-block; }}
        
        .kpi-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px; }}
        .kpi-card {{ background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; position: relative; overflow: hidden; }}
        .kpi-card.highlight {{ border-color: var(--google-green); }}
        .kpi-title {{ font-size: 13px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; }}
        .kpi-value-row {{ display: flex; align-items: baseline; justify-content: space-between; margin-top: 10px; }}
        .kpi-value {{ font-size: 32px; font-weight: 800; }}
        .kpi-compare {{ font-size: 13px; font-weight: 500; margin-top: 6px; }}
        .win {{ color: var(--google-green); font-weight: 700; }}
        .fail {{ color: var(--meta-accent); font-weight: 700; }}

        /* Hotword Ranking Section */
        .hw-section {{ background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 24px; }}
        .hw-header {{ display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }}
        .hw-header h3 {{ font-size: 17px; font-weight: 700; color: #f8fafc; }}
        .hw-cards-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }}
        .hw-card {{ background: #0f172a; border: 1px solid var(--border); border-radius: 10px; padding: 16px; position: relative; }}
        .hw-card-title {{ font-size: 15px; font-weight: 700; display: flex; justify-content: space-between; align-items: center; }}
        .hw-tag {{ font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; text-transform: uppercase; }}
        .tag-vulnerable {{ background: rgba(244, 63, 94, 0.2); color: #f43f5e; }}
        .tag-safe {{ background: rgba(16, 185, 129, 0.2); color: #10b981; }}
        .tag-mid {{ background: rgba(59, 130, 246, 0.2); color: #3b82f6; }}
        .hw-stat-val {{ font-size: 26px; font-weight: 800; margin: 8px 0 4px 0; }}
        .hw-bar-bg {{ background: #334155; height: 8px; border-radius: 999px; overflow: hidden; margin-top: 8px; }}
        .hw-bar-fill {{ height: 100%; border-radius: 999px; }}

        .charts-grid {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(460px, 1fr)); gap: 20px; margin-bottom: 24px; }}
        .chart-box {{ background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; }}
        .chart-box h3 {{ font-size: 16px; font-weight: 600; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }}
        .chart-container {{ position: relative; height: 320px; width: 100%; }}

        .table-box {{ background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 20px; margin-bottom: 24px; overflow-x: auto; }}
        table {{ width: 100%; border-collapse: collapse; text-align: left; font-size: 13px; }}
        th {{ background: #0f172a; padding: 12px 14px; color: var(--text-muted); font-weight: 600; border-bottom: 1px solid var(--border); }}
        td {{ padding: 12px 14px; border-bottom: 1px solid var(--border); }}
        tr:hover {{ background: var(--surface-hover); }}
        
        .rate-badge {{ padding: 3px 8px; border-radius: 6px; font-weight: 700; }}
        .rate-good {{ background: rgba(16, 185, 129, 0.2); color: #10b981; }}
        .rate-mid {{ background: rgba(245, 158, 11, 0.2); color: #f59e0b; }}
        .rate-bad {{ background: rgba(244, 63, 94, 0.2); color: #f43f5e; }}

        .btn {{ background: var(--google-blue); color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; font-weight: 600; font-size: 13px; }}
        .btn:hover {{ opacity: 0.9; }}
    </style>
</head>
<body>
    <div class="header">
        <div class="title">
            <h1>🕶️ Smart Glasses Bystander Study: Executive Benchmark</h1>
            <p>Comparative Evaluation: Android XR Smart Glasses (Android XR / Gemini Live) vs. Meta Ray-Ban (Meta AI) | {timestamp}</p>
        </div>
        <div class="controls-bar">
            <div class="filter-group">
                <span class="filter-label">Filter Participant:</span>
                <select id="participantSelector" onchange="onParticipantChange()">
                    <option value="ALL">All Participants (N={len(all_participants)})</option>
                    {"".join([f'<option value="{p}">{p}</option>' for p in all_participants])}
                </select>
            </div>
            <button class="btn" onclick="window.print()">Export PDF</button>
        </div>
    </div>

    <!-- Executive KPI Grid (Dynamically updated via JS) -->
    <div class="kpi-grid">
        <div class="kpi-card highlight">
            <div class="kpi-title">Bystander Rejection Rate (Stayed Asleep)</div>
            <div class="kpi-value-row">
                <div>
                    <div style="font-size: 11px; color: var(--google-blue); font-weight: 700;">ANDROID XR SMART GLASSES</div>
                    <div class="kpi-value" id="kpiXR GlassesRej" style="color: var(--google-green);">{jm['rejection_rate']:.1f}%</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 11px; color: var(--meta-blue); font-weight: 700;">META RAY-BAN</div>
                    <div class="kpi-value" id="kpiMetaRej" style="color: var(--warning);">{mm['rejection_rate']:.1f}%</div>
                </div>
            </div>
            <div class="kpi-compare" id="kpiRejCompare">
                Advantage: <span class="win">+{(jm['rejection_rate'] - mm['rejection_rate']):.1f}% Higher Bystander Immunity</span>
            </div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">False Accept Rate (FAR / Unintended Wake)</div>
            <div class="kpi-value-row">
                <div>
                    <div style="font-size: 11px; color: var(--google-blue); font-weight: 700;">ANDROID XR SMART GLASSES</div>
                    <div class="kpi-value" id="kpiXR GlassesFar" style="color: var(--google-green);">{jm['far']:.2f}%</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 11px; color: var(--meta-blue); font-weight: 700;">META RAY-BAN</div>
                    <div class="kpi-value" id="kpiMetaFar" style="color: var(--meta-accent);">{mm['far']:.1f}%</div>
                </div>
            </div>
            <div class="kpi-compare" id="kpiFarCompare">
                Ratio: <span class="win">Meta Ray-Ban has {(mm['far'] / (jm['far'] or 0.01)):.0f}x more unintended activations</span>
            </div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">High-Severity Query Intrusion (Spoke to Non-Wearer)</div>
            <div class="kpi-value-row">
                <div>
                    <div style="font-size: 11px; color: var(--google-blue); font-weight: 700;">ANDROID XR SMART GLASSES</div>
                    <div class="kpi-value" id="kpiXR GlassesIntr" style="color: var(--google-green);">{jm['intrusion_rate']:.2f}%</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 11px; color: var(--meta-blue); font-weight: 700;">META RAY-BAN</div>
                    <div class="kpi-value" id="kpiMetaIntr" style="color: var(--meta-accent);">{mm['intrusion_rate']:.1f}%</div>
                </div>
            </div>
            <div class="kpi-compare" id="kpiIntrCompare">
                Intrusions: <span class="win">{jm['answered']} XR Glasses</span> vs <span class="fail">{mm['answered']} Meta</span>
            </div>
        </div>

        <div class="kpi-card">
            <div class="kpi-title">Participant & Trial Volume</div>
            <div class="kpi-value-row">
                <div>
                    <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">PARTICIPANTS</div>
                    <div class="kpi-value" id="kpiPartsCount">{len(all_participants)}</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 11px; color: var(--text-muted); font-weight: 700;">TOTAL TRIALS</div>
                    <div class="kpi-value" id="kpiTrialsCount">{len(self.trials):,}</div>
                </div>
            </div>
            <div class="kpi-compare">
                <span>XR Glasses N={len(xr_glasses_parts)} ({len(xr_glasses_trials)} trials) | Meta N={len(meta_parts)} ({len(meta_trials)} trials)</span>
            </div>
        </div>
    </div>

    <!-- Hotword Invocation Sensitivity Ranking Section -->
    <div class="hw-section">
        <div class="hw-header">
            <h3>🔥 Hotword Invocation Sensitivity Ranking (Most to Least Invoked)</h3>
            <span style="font-size: 13px; color: var(--text-muted);">Ranked by False Accept Rate (FAR %): High FAR = Most Vulnerable to Bystander Triggers</span>
        </div>
        <div class="hw-cards-grid" id="hotwordCardsGrid">
            <!-- Populated via JavaScript dynamically -->
        </div>
    </div>

    <!-- Charts Grid -->
    <div class="charts-grid">
        <div class="chart-box">
            <h3>🎯 360° Polar Angular Vulnerability (FAR % by Azimuth)</h3>
            <div class="chart-container">
                <canvas id="polarRadarChart"></canvas>
            </div>
        </div>

        <div class="chart-box">
            <h3>📏 Distance Falloff Curve (FAR % by Distance)</h3>
            <div class="chart-container">
                <canvas id="distanceFalloffChart"></canvas>
            </div>
        </div>

        <div class="chart-box">
            <h3>🗣️ Vocal Level Sensitivity (Conversational vs. Loud)</h3>
            <div class="chart-container">
                <canvas id="vocalSensitivityChart"></canvas>
            </div>
        </div>

        <div class="chart-box">
            <h3>🔑 Hotword Phrase Head-to-Head (FAR %)</h3>
            <div class="chart-container">
                <canvas id="hotwordPhraseChart"></canvas>
            </div>
        </div>
    </div>

    <!-- Individual Participant Scorecard Table -->
    <div class="table-box">
        <h3 style="margin-bottom: 14px;">👥 Individual Participant Scorecard (All Enrolled IM Testers)</h3>
        <table>
            <thead>
                <tr>
                    <th>Participant</th>
                    <th>Device Tested</th>
                    <th>Total Trials</th>
                    <th>Rejection Rate %</th>
                    <th>FAR %</th>
                    <th>Intrusions</th>
                    <th>Worst Angle</th>
                    <th>Worst Distance</th>
                    <th>Wake Latency (P50/P90)</th>
                </tr>
            </thead>
            <tbody id="scorecardTableBody">
            </tbody>
        </table>
    </div>

    <!-- Detailed Stratified Comparison Table -->
    <div class="table-box">
        <h3 style="margin-bottom: 14px;">📊 Comprehensive Azimuth Breakdown with Participant Coverage (0° to 330°)</h3>
        <table>
            <thead>
                <tr>
                    <th>Azimuth Angle</th>
                    <th>XR Glasses N (Testers)</th>
                    <th>XR Glasses FAR %</th>
                    <th>XR Glasses Rejection %</th>
                    <th>Meta N (Testers)</th>
                    <th>Meta FAR %</th>
                    <th>Meta Rejection %</th>
                    <th>Delta Rejection</th>
                </tr>
            </thead>
            <tbody id="angleTableBody">
            </tbody>
        </table>
    </div>

    <!-- Footer / Author & Study Lead Signature -->
    <footer style="margin-top: 40px; padding: 20px 24px; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; background: var(--surface); border-radius: 12px; font-size: 13px; color: var(--text-muted); flex-wrap: wrap; gap: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 20px;">🕶️</span>
            <div>
                <strong style="color: #fff;">Smart Glasses Hotword & Bystander Study</strong> &bull; Open-Source Acoustic Metrology Suite
                <div style="font-size: 12px; color: var(--text-muted);">Hardware Stage Automated Positioning & Benchmarking Suite</div>
            </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <span>Open-Source Repository:</span>
            <a href="https://github.com/Hekim98" style="color: #60a5fa; font-weight: 700; text-decoration: none; background: rgba(59, 130, 246, 0.15); padding: 5px 12px; border-radius: 6px; border: 1px solid rgba(59, 130, 246, 0.3); display: inline-flex; align-items: center; gap: 6px;">
                <span>🔗 GitHub</span> <strong>@Hekim98</strong>
            </a>
        </div>
    </footer>

    <script>
        const allTrials = {trials_json};
        const scorecards = {scorecards_json};
        const controls = {controls_json};
        const initialRankings = {rankings_json};

        let currentParticipant = "ALL";
        let radarChart, distanceChart, vocalChart, hotwordChart;

        function filterTrials(partFilter) {{
            if (partFilter === "ALL") return allTrials;
            return allTrials.filter(t => t.im_id === partFilter);
        }}

        function computeSubsetMetrics(trials) {{
            const total = trials.length;
            if (total === 0) return {{ total: 0, asleep: 0, activated: 0, answered: 0, rejection_rate: 0, far: 0, intrusion_rate: 0 }};
            const asleep = trials.filter(t => t.is_asleep).length;
            const activated = trials.filter(t => t.is_activated).length;
            const answered = trials.filter(t => t.is_answered).length;
            return {{
                total,
                asleep,
                activated,
                answered,
                rejection_rate: (asleep / total) * 100,
                far: (activated / total) * 100,
                intrusion_rate: (answered / total) * 100
            }};
        }}

        function renderHotwordCards() {{
            const currentTrials = filterTrials(currentParticipant);
            const container = document.getElementById('hotwordCardsGrid');
            container.innerHTML = '';

            const devices = ["Android XR Smart Glasses (Android XR)", "Meta Ray-Ban (Meta AI)"];
            devices.forEach(dev => {{
                const dTrials = currentTrials.filter(t => t.device.includes(dev.includes("XR Glasses") ? "XR Glasses" : "Meta"));
                if (dTrials.length === 0) return;

                // Group by phrase
                const phraseMap = {{}};
                dTrials.forEach(t => {{
                    const p = t.phrase || t.target_hotword || "Unknown";
                    if (!phraseMap[p]) phraseMap[p] = [];
                    phraseMap[p].push(t);
                }});

                const phraseList = Object.keys(phraseMap).map(p => {{
                    const sub = phraseMap[p];
                    const m = computeSubsetMetrics(sub);
                    return {{
                        phrase: p,
                        device: dev,
                        trials: m.total,
                        activated: m.activated,
                        asleep: m.asleep,
                        answered: m.answered,
                        far: m.far,
                        rejection: m.rejection_rate
                    }};
                }}).sort((a,b) => b.far - a.far);

                phraseList.forEach((item, idx) => {{
                    const isMost = idx === 0;
                    const isLeast = idx === phraseList.length - 1;
                    const tagHtml = isMost 
                        ? `<span class="hw-tag tag-vulnerable">#${{idx+1}} Most Invoked</span>`
                        : (isLeast 
                            ? `<span class="hw-tag tag-safe">#${{idx+1}} Safest</span>` 
                            : `<span class="hw-tag tag-mid">#${{idx+1}} Moderate</span>`);
                    
                    const barColor = item.device.includes("XR Glasses") ? "#10b981" : "#f43f5e";
                    const valColor = item.far > 10 ? "#f43f5e" : (item.far > 2 ? "#f59e0b" : "#10b981");

                    const card = document.createElement('div');
                    card.className = 'hw-card';
                    card.innerHTML = `
                        <div class="hw-card-title">
                            <div>
                                <div style="font-size: 11px; color: var(--text-muted); font-weight: 700; text-transform: uppercase;">${{item.device.includes("XR Glasses") ? "ANDROID XR SMART GLASSES" : "META RAY-BAN"}}</div>
                                <div style="font-size: 16px; color: #fff;"><strong>${{item.phrase}}</strong></div>
                            </div>
                            <div>${{tagHtml}}</div>
                        </div>
                        <div class="hw-stat-val" style="color: ${{valColor}};">${{item.far.toFixed(2)}}% <span style="font-size: 13px; color: var(--text-muted); font-weight: 500;">FAR</span></div>
                        <div style="font-size: 12px; color: var(--text-muted);">
                            ${{item.activated}} unintended wakes in ${{item.trials}} trials | ${{item.answered}} spoken intrusions
                        </div>
                        <div class="hw-bar-bg">
                            <div class="hw-bar-fill" style="width: ${{Math.min(100, item.far * 2.5)}}%; background: ${{barColor}};"></div>
                        </div>
                    `;
                    container.appendChild(card);
                }});
            }});
        }}

        function renderScorecardTable() {{
            const tbody = document.getElementById('scorecardTableBody');
            tbody.innerHTML = '';
            
            const filtered = currentParticipant === "ALL" 
                ? scorecards 
                : scorecards.filter(s => s.im_id === currentParticipant);

            filtered.forEach(s => {{
                const isXR Glasses = s.device.includes("XR Glasses");
                const devBadge = isXR Glasses 
                    ? `<span style="color: #3b82f6; font-weight: 700;">${{s.device}}</span>`
                    : `<span style="color: #6366f1; font-weight: 700;">${{s.device}}</span>`;
                
                const rejClass = s.rejection_rate >= 95 ? "rate-good" : (s.rejection_rate >= 80 ? "rate-mid" : "rate-bad");
                const farClass = s.far <= 2 ? "rate-good" : (s.far <= 15 ? "rate-mid" : "rate-bad");

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><span class="im-pill">${{s.im_id}}</span></td>
                    <td>${{devBadge}}</td>
                    <td><strong>${{s.total_trials}}</strong></td>
                    <td><span class="rate-badge ${{rejClass}}">${{s.rejection_rate.toFixed(1)}}%</span></td>
                    <td><span class="rate-badge ${{farClass}}">${{s.far.toFixed(1)}}%</span></td>
                    <td>${{s.answered}}</td>
                    <td>${{s.worst_angle}}</td>
                    <td>${{s.worst_distance}}</td>
                    <td>${{s.latency_p50 > 0 ? s.latency_p50.toFixed(0) + " / " + s.latency_p90.toFixed(0) + " ms" : "N/A"}}</td>
                `;
                tbody.appendChild(tr);
            }});
        }}

        function updateCharts() {{
            const currentTrials = filterTrials(currentParticipant);
            const xr_glassesTrials = currentTrials.filter(t => t.device.includes("XR Glasses"));
            const metaTrials = currentTrials.filter(t => t.device.includes("Meta"));

            // 1. Update KPIs
            const jm = computeSubsetMetrics(xr_glassesTrials);
            const mm = computeSubsetMetrics(metaTrials);

            document.getElementById('kpiXR GlassesRej').innerText = jm.total > 0 ? jm.rejection_rate.toFixed(1) + "%" : "N/A";
            document.getElementById('kpiMetaRej').innerText = mm.total > 0 ? mm.rejection_rate.toFixed(1) + "%" : "N/A";
            document.getElementById('kpiXR GlassesFar').innerText = jm.total > 0 ? jm.far.toFixed(2) + "%" : "N/A";
            document.getElementById('kpiMetaFar').innerText = mm.total > 0 ? mm.far.toFixed(1) + "%" : "N/A";
            document.getElementById('kpiXR GlassesIntr').innerText = jm.total > 0 ? jm.intrusion_rate.toFixed(2) + "%" : "N/A";
            document.getElementById('kpiMetaIntr').innerText = mm.total > 0 ? mm.intrusion_rate.toFixed(1) + "%" : "N/A";
            document.getElementById('kpiTrialsCount').innerText = currentTrials.length.toLocaleString();

            const angles = ["0°", "30°", "60°", "90°", "120°", "150°", "180°", "210°", "240°", "270°", "300°", "330°"];
            
            // Polar Radar Data
            const xr_glassesAngleFar = angles.map(a => {{
                const sub = xr_glassesTrials.filter(t => t.degree === a);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});
            const metaAngleFar = angles.map(a => {{
                const sub = metaTrials.filter(t => t.degree === a);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});

            if (radarChart) radarChart.destroy();
            radarChart = new Chart(document.getElementById('polarRadarChart'), {{
                type: 'radar',
                data: {{
                    labels: angles,
                    datasets: [
                        {{
                            label: 'Android XR Smart Glasses FAR %',
                            data: xr_glassesAngleFar,
                            borderColor: '#10b981',
                            backgroundColor: 'rgba(16, 185, 129, 0.2)',
                            borderWidth: 2,
                            pointBackgroundColor: '#10b981'
                        }},
                        {{
                            label: 'Meta Ray-Ban FAR %',
                            data: metaAngleFar,
                            borderColor: '#f43f5e',
                            backgroundColor: 'rgba(244, 63, 94, 0.2)',
                            borderWidth: 2,
                            pointBackgroundColor: '#f43f5e'
                        }}
                    ]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {{
                        r: {{
                            angleLines: {{ color: '#334155' }},
                            grid: {{ color: '#334155' }},
                            pointLabels: {{ color: '#94a3b8', font: {{ size: 12, weight: 'bold' }} }},
                            ticks: {{ color: '#cbd5e1', backdropColor: 'transparent', stepSize: 10 }},
                            suggestedMin: 0,
                            suggestedMax: 45
                        }}
                    }},
                    plugins: {{ legend: {{ labels: {{ color: '#f8fafc' }} }} }}
                }}
            }});

            // Distance Chart Data
            const dists = ['1.5 ft', '3 ft', '4.5 ft'];
            const xr_glassesDistFar = dists.map(d => {{
                const sub = xr_glassesTrials.filter(t => t.distance === d);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});
            const metaDistFar = dists.map(d => {{
                const sub = metaTrials.filter(t => t.distance === d);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});

            if (distanceChart) distanceChart.destroy();
            distanceChart = new Chart(document.getElementById('distanceFalloffChart'), {{
                type: 'bar',
                data: {{
                    labels: dists,
                    datasets: [
                        {{ label: 'Android XR Smart Glasses FAR %', data: xr_glassesDistFar, backgroundColor: '#10b981' }},
                        {{ label: 'Meta Ray-Ban FAR %', data: metaDistFar, backgroundColor: '#f43f5e' }}
                    ]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {{
                        x: {{ grid: {{ color: '#334155' }}, ticks: {{ color: '#94a3b8' }} }},
                        y: {{ grid: {{ color: '#334155' }}, ticks: {{ color: '#94a3b8' }}, title: {{ display: true, text: 'FAR %', color: '#94a3b8' }} }}
                    }},
                    plugins: {{ legend: {{ labels: {{ color: '#f8fafc' }} }} }}
                }}
            }});

            // Vocal Chart Data
            const vocals = ['Conversational', 'Loud'];
            const xr_glassesVocFar = vocals.map(v => {{
                const sub = xr_glassesTrials.filter(t => t.vocal_level === v);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});
            const metaVocFar = vocals.map(v => {{
                const sub = metaTrials.filter(t => t.vocal_level === v);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});

            if (vocalChart) vocalChart.destroy();
            vocalChart = new Chart(document.getElementById('vocalSensitivityChart'), {{
                type: 'bar',
                data: {{
                    labels: vocals,
                    datasets: [
                        {{ label: 'Android XR Smart Glasses FAR %', data: xr_glassesVocFar, backgroundColor: '#10b981' }},
                        {{ label: 'Meta Ray-Ban FAR %', data: metaVocFar, backgroundColor: '#f43f5e' }}
                    ]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {{
                        x: {{ grid: {{ color: '#334155' }}, ticks: {{ color: '#94a3b8' }} }},
                        y: {{ grid: {{ color: '#334155' }}, ticks: {{ color: '#94a3b8' }} }}
                    }},
                    plugins: {{ legend: {{ labels: {{ color: '#f8fafc' }} }} }}
                }}
            }});

            // Hotword Exact Phrase Chart Data
            const exactPhrases = ['Hey Google', 'OK Google', 'Hey Gemini', 'Hey Meta', 'OK Meta'];
            const phraseFARs = exactPhrases.map(ph => {{
                const sub = currentTrials.filter(t => (t.phrase || t.target_hotword || "") === ph);
                return sub.length > 0 ? (sub.filter(x => x.is_activated).length / sub.length) * 100 : 0;
            }});
            const barColors = exactPhrases.map(ph => ph.includes("Meta") ? '#f43f5e' : '#10b981');

            if (hotwordChart) hotwordChart.destroy();
            hotwordChart = new Chart(document.getElementById('hotwordPhraseChart'), {{
                type: 'bar',
                data: {{
                    labels: exactPhrases,
                    datasets: [
                        {{
                            label: 'False Accept Rate (FAR %)',
                            data: phraseFARs,
                            backgroundColor: barColors
                        }}
                    ]
                }},
                options: {{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {{
                        x: {{ grid: {{ color: '#334155' }}, ticks: {{ color: '#94a3b8' }} }},
                        y: {{ grid: {{ color: '#334155' }}, ticks: {{ color: '#94a3b8' }}, title: {{ display: true, text: 'FAR % (Lower is safer)', color: '#94a3b8' }} }}
                    }},
                    plugins: {{ legend: {{ display: false }} }}
                }}
            }});

            // Populate Detailed Angle Table with Participant Coverage
            const tbody = document.getElementById('angleTableBody');
            tbody.innerHTML = '';
            angles.forEach(deg => {{
                const jSub = xr_glassesTrials.filter(t => t.degree === deg);
                const mSub = metaTrials.filter(t => t.degree === deg);
                const jm = computeSubsetMetrics(jSub);
                const mm = computeSubsetMetrics(mSub);
                
                const jParts = Array.from(new Set(jSub.map(t => t.im_id))).sort();
                const mParts = Array.from(new Set(mSub.map(t => t.im_id))).sort();

                const deltaRej = (jm.rejection_rate - mm.rejection_rate).toFixed(1);

                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><strong>${{deg}}</strong></td>
                    <td><span class="badge" style="background:#1e3a8a;">N=${{jParts.length}}</span> <small style="color:var(--text-muted);">${{jParts.join(", ")}}</small></td>
                    <td style="color: #10b981; font-weight: 700;">${{jm.far.toFixed(1)}}%</td>
                    <td>${{jm.rejection_rate.toFixed(1)}}%</td>
                    <td><span class="badge" style="background:#312e81;">N=${{mParts.length}}</span> <small style="color:var(--text-muted);">${{mParts.join(", ")}}</small></td>
                    <td style="color: #f43f5e; font-weight: 700;">${{mm.far.toFixed(1)}}%</td>
                    <td>${{mm.rejection_rate.toFixed(1)}}%</td>
                    <td style="color: #10b981; font-weight: 700;">+${{deltaRej}}%</td>
                `;
                tbody.appendChild(tr);
            }});
        }}

        function onParticipantChange() {{
            currentParticipant = document.getElementById('participantSelector').value;
            renderHotwordCards();
            renderScorecardTable();
            updateCharts();
        }}

        // Initial Load
        renderHotwordCards();
        renderScorecardTable();
        updateCharts();
    </script>
</body>
</html>
"""
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        print(f"[+] Generated Executive HTML Dashboard: {html_path}")
        return html_path


def main():
    parser = argparse.ArgumentParser(
        description="Hotword & Bystander Study Analytics Studio (Multi-Participant & Hotword Ranking)"
    )
    parser.add_argument(
        "--path",
        "-p",
        nargs="*",
        help="Path(s) to CSV files or directories. If omitted, checks Google Drive Bystander folder.",
    )
    parser.add_argument(
        "--output",
        "-o",
        default=DEFAULT_OUTPUT_DIR,
        help="Directory to save generated CSV and HTML reports.",
    )
    parser.add_argument(
        "--all-batches",
        action="store_true",
        help="Include all historical benchmark dates (20260924 and 20261001).",
    )
    parser.add_argument(
        "--open",
        action="store_true",
        default=True,
        help="Automatically open the HTML dashboard in browser when done.",
    )

    args = parser.parse_args()

    engine = GranularBystanderAnalyticsEngine(output_dir=args.output)

    input_paths = args.path
    if not input_paths:
        if os.path.exists(DEFAULT_DRIVE_BYSTANDER_PATH):
            print(f"[*] Detected Google Drive Study Folder: {DEFAULT_DRIVE_BYSTANDER_PATH}")
            if args.all_batches:
                input_paths = [
                    os.path.join(DEFAULT_DRIVE_BYSTANDER_PATH, "Meta Rayban - Wayfarer 2_20261001"),
                    os.path.join(DEFAULT_DRIVE_BYSTANDER_PATH, "XR Glasses PV2_O20XXUEU0AZIN_20261001"),
                    os.path.join(DEFAULT_DRIVE_BYSTANDER_PATH, "Meta Rayban - Wayfarer 2_20260924"),
                    os.path.join(DEFAULT_DRIVE_BYSTANDER_PATH, "XR Glasses PV2_O20XXUEU0AZII_20260924"),
                ]
            else:
                input_paths = [
                    os.path.join(DEFAULT_DRIVE_BYSTANDER_PATH, "Meta Rayban - Wayfarer 2_20261001"),
                    os.path.join(DEFAULT_DRIVE_BYSTANDER_PATH, "XR Glasses PV2_O20XXUEU0AZIN_20261001"),
                ]
        else:
            local_data = os.path.join(PROJECT_DIR, "data")
            print(f"[*] Drive not mounted; scanning local data folder: {local_data}")
            input_paths = [local_data]

    engine.load_from_paths(input_paths)

    if not engine.trials:
        print("[!] No evaluation trials found. Exiting.")
        sys.exit(1)

    scorecards = engine.compute_participant_scorecards()
    breakdowns = engine.compute_condition_breakdowns()
    controls = engine.analyze_within_subject_controls()
    hotword_rankings = engine.compute_hotword_rankings()

    engine.print_granular_terminal_report(scorecards, breakdowns, controls, hotword_rankings)
    engine.export_csv_reports(scorecards, breakdowns, hotword_rankings)
    html_file = engine.export_html_dashboard(scorecards, breakdowns, controls, hotword_rankings)

    if args.open and os.path.exists(html_file):
        try:
            webbrowser.open(f"file://{html_file}")
        except Exception:
            pass


if __name__ == "__main__":
    main()
