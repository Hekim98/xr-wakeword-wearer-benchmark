#!/usr/bin/env python3
"""Data Parsing Engine for Hotword Evaluation Telemetry.

Merges prompt records with system detection events row-by-row to build
confusion matrices, calculate latency deltas, and export analysis reports.
"""

import collections
import csv
import datetime
import json
import math
import os
from typing import Any, Dict, List, Optional

class TelemetryDataParser:
    """Parses, aligns, and computes metrics for hotword test sessions."""

    def __init__(self, grace_period_ms: int = 2000):
        self.grace_period_ms = grace_period_ms

    def align_trial_events(
        self,
        trial_records: List[Dict[str, Any]],
        telemetry_events: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        """Matches prompted trials with telemetry events occurring within each trial's window."""
        aligned_results = []

        # Sort telemetry events chronologically
        events = sorted(telemetry_events, key=lambda x: x.get("timestamp_ms", 0))

        for trial in trial_records:
            t_prompt_start = trial.get("prompt_start_ms", 0)
            listen_window_ms = trial.get("listen_window_sec", 6) * 1000
            t_prompt_end = trial.get("prompt_end_ms", t_prompt_start + listen_window_ms)

            # Search window extends slightly past prompt end for system processing buffer
            window_start = t_prompt_start
            window_end = t_prompt_end + self.grace_period_ms

            # Filter events in this window
            trial_events = [
                e for e in events
                if window_start <= e.get("timestamp_ms", 0) <= window_end
            ]

            # Find audio input / VAD event if available
            audio_onset_ms = trial.get("audio_onset_ms")
            if not audio_onset_ms:
                for e in trial_events:
                    if e.get("event_type") in ("AUDIO_INPUT_ONSET", "VAD_SPEECH_START"):
                        audio_onset_ms = e.get("timestamp_ms")
                        break

            # Find hotword trigger event
            trigger_event = None
            for e in trial_events:
                if e.get("event_type") == "HOTWORD_TRIGGER":
                    trigger_event = e
                    break

            expected_hotword = trial.get("target_hotword", "NONE").upper()

            # 1. Check telemetry event from ADB logcat, or fallback to manual evaluation from UI
            if trigger_event:
                detected_hotword = trigger_event.get("detected_hotword", "NONE").upper()
                trigger_timestamp_ms = trigger_event.get("timestamp_ms")
                confidence = trigger_event.get("confidence", 0.0)
            else:
                raw_det = trial.get("detected_hotword", "NONE")
                detected_hotword = str(raw_det).upper() if raw_det else "NONE"
                trigger_timestamp_ms = trial.get("device_trigger_ms")
                confidence = trial.get("confidence_score", 1.0 if detected_hotword not in ("NONE", "UNDETECTED", "") else 0.0)

            # Calculate latency deltas (prioritize acoustic Hotword-to-Earcon latency)
            prompt_to_audio_delta_ms = trial.get("prompt_to_audio_delta_ms")
            earcon_latency_ms = trial.get("earcon_latency_ms")
            audio_to_trigger_delta_ms = earcon_latency_ms if earcon_latency_ms is not None else trial.get("audio_to_trigger_delta_ms")
            total_latency_delta_ms = trial.get("total_latency_delta_ms")
            speech_end_offset_ms = trial.get("speech_end_offset_ms")
            earcon_onset_offset_ms = trial.get("earcon_onset_offset_ms")

            if audio_onset_ms and t_prompt_start and prompt_to_audio_delta_ms is None:
                prompt_to_audio_delta_ms = max(0, audio_onset_ms - t_prompt_start)

            if trigger_timestamp_ms and total_latency_delta_ms is None:
                total_latency_delta_ms = max(0, trigger_timestamp_ms - t_prompt_start)
                if audio_onset_ms and audio_to_trigger_delta_ms is None:
                    audio_to_trigger_delta_ms = max(0, trigger_timestamp_ms - audio_onset_ms)
                elif audio_to_trigger_delta_ms is None:
                    audio_to_trigger_delta_ms = total_latency_delta_ms

            if earcon_latency_ms is None and audio_to_trigger_delta_ms is not None:
                earcon_latency_ms = audio_to_trigger_delta_ms

            # Normalized Hotword Mapping
            TRUE_TARGETS = {"HEY_GOOGLE", "OK_GOOGLE", "HEY_GEMINI", "OK_GEMINI", "HEY_META", "OK_META"}
            def clean_hw(hw: Optional[str]) -> str:
                if not hw:
                    return "NONE"
                c = str(hw).strip().upper().replace(" ", "_")
                if c in ("OKAY_GOOGLE", "OK_GOOGLE"):
                    return "OK_GOOGLE"
                if c == "HEY_GOOGLE":
                    return "HEY_GOOGLE"
                if c in ("OKAY_GEMINI", "OK_GEMINI"):
                    return "OK_GEMINI"
                if c == "HEY_GEMINI":
                    return "HEY_GEMINI"
                if c in ("NONE", "UNDETECTED", ""):
                    return "NONE"
                return c

            norm_expected = clean_hw(expected_hotword)
            norm_detected = clean_hw(detected_hotword)
            response_outcome = trial.get("response_outcome") or ("ACTIVATED_ANSWERED_QUERY" if norm_detected != "NONE" else "STAYED_ASLEEP")
            is_target_hotword = norm_expected in TRUE_TARGETS and trial.get("category") != "distractor"
            triggered = (norm_detected != "NONE") or ("ACTIVATED" in str(response_outcome))

            # If classification is already recorded from manual UI evaluation, honor it
            manual_cls = trial.get("classification")
            if manual_cls and manual_cls in ("TRUE_POSITIVE", "FALSE_POSITIVE", "FALSE_NEGATIVE", "TRUE_NEGATIVE"):
                classification = manual_cls
            else:
                if is_target_hotword:
                    if triggered and (norm_detected == norm_expected or norm_detected == "NONE"):
                        classification = "TRUE_POSITIVE"
                    elif triggered:
                        classification = "FALSE_NEGATIVE"  # Wrong trigger on target hotword
                    else:
                        classification = "FALSE_NEGATIVE"  # Undetected target hotword
                else:
                    if triggered:
                        classification = "FALSE_POSITIVE"  # False alarm on non-hotword
                    else:
                        classification = "TRUE_NEGATIVE"   # Correctly ignored non-hotword

            aligned_row = {
                "trial_id": trial.get("trial_id", ""),
                "prompt_text": trial.get("prompt_text", ""),
                "condition": trial.get("condition", "Default"),
                "distance": trial.get("distance", ""),
                "degree": trial.get("degree", ""),
                "vocal_level": trial.get("vocal_level", ""),
                "phrase": trial.get("phrase", ""),
                "category": trial.get("category", "positive" if is_target_hotword else "distractor"),
                "target_hotword": norm_expected if is_target_hotword else "NON_HOTWORD",
                "detected_hotword": norm_detected if triggered else "UNDETECTED",
                "response_outcome": response_outcome,
                "classification": classification,
                "confidence_score": confidence,
                "prompt_start_ms": t_prompt_start,
                "prompt_end_ms": t_prompt_end,
                "audio_onset_ms": audio_onset_ms,
                "device_trigger_ms": trigger_timestamp_ms,
                "prompt_to_audio_delta_ms": prompt_to_audio_delta_ms,
                "audio_to_trigger_delta_ms": audio_to_trigger_delta_ms,
                "earcon_latency_ms": earcon_latency_ms,
                "speech_end_offset_ms": speech_end_offset_ms,
                "earcon_onset_offset_ms": earcon_onset_offset_ms,
                "total_latency_delta_ms": total_latency_delta_ms,
                "audio_file": trial.get("audio_file", ""),
                "audio_duration_sec": trial.get("audio_duration_sec"),
                "batch_offset_sec": trial.get("batch_offset_sec"),
                "batch_audio_file": trial.get("batch_audio_file", ""),
                "spoken_transcript": trial.get("spoken_transcript") or trial.get("transcript") or trial.get("phrase") or "",
                "raw_event": trigger_event
            }
            aligned_results.append(aligned_row)

        return aligned_results

    def compute_confusion_matrix(self, aligned_rows: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Builds a confusion matrix tracking Prompted Intention vs Device Detection Action."""
        all_labels = set(["UNDETECTED"])
        for row in aligned_rows:
            all_labels.add(row["target_hotword"])
            all_labels.add(row["detected_hotword"])

        # Prioritize key labels
        ordered_labels = ["HEY_GOOGLE", "OK_GOOGLE", "NON_HOTWORD"]
        other_labels = sorted([l for l in all_labels if l not in ordered_labels and l != "UNDETECTED"])
        sorted_labels = [l for l in ordered_labels if l in all_labels] + other_labels + ["UNDETECTED"]

        matrix = {
            target: {detected: 0 for detected in sorted_labels}
            for target in sorted_labels
        }

        for row in aligned_rows:
            target = row["target_hotword"]
            detected = row["detected_hotword"]
            if target in matrix and detected in matrix[target]:
                matrix[target][detected] += 1

        return {
            "labels": sorted_labels,
            "matrix": matrix
        }

    def compute_summary_statistics(self, aligned_rows: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Calculates Recall, Precision, Undetected, and Latency summary metrics."""
        total_trials = len(aligned_rows)
        if total_trials == 0:
            return {}

        counts = collections.Counter(r["classification"] for r in aligned_rows)
        tp = counts.get("TRUE_POSITIVE", 0)
        fp = counts.get("FALSE_POSITIVE", 0)
        fn = counts.get("FALSE_NEGATIVE", 0)
        tn = counts.get("TRUE_NEGATIVE", 0)

        # Undetected count across all trials
        undetected_count = sum(1 for r in aligned_rows if r.get("detected_hotword") == "UNDETECTED")

        # Recall = TP / (TP + FN) (proportion of prompted true hotwords correctly identified)
        recall = (tp / (tp + fn)) if (tp + fn) > 0 else 0.0

        # Precision = TP / (TP + FP) (proportion of detections that were prompted true hotwords)
        precision = (tp / (tp + fp)) if (tp + fp) > 0 else 0.0

        # Overall Accuracy = (TP + TN) / Total
        accuracy = ((tp + tn) / total_trials) if total_trials > 0 else 0.0

        # Latencies for True Positives
        latencies = []
        for r in aligned_rows:
            if r.get("classification") == "TRUE_POSITIVE" and r.get("audio_to_trigger_delta_ms") not in (None, "", "—"):
                try:
                    latencies.append(float(r["audio_to_trigger_delta_ms"]))
                except (ValueError, TypeError):
                    pass

        latency_stats = self._calc_percentiles(latencies)

        # Condition breakdown
        by_condition: Dict[str, Dict[str, Any]] = collections.defaultdict(
            lambda: {"total": 0, "tp": 0, "fp": 0, "fn": 0, "tn": 0, "undetected": 0, "latencies": []}
        )
        for r in aligned_rows:
            cond = r["condition"]
            by_condition[cond]["total"] += 1
            cls = r["classification"]
            if cls == "TRUE_POSITIVE":
                by_condition[cond]["tp"] += 1
                if r.get("audio_to_trigger_delta_ms") not in (None, "", "—"):
                    try:
                        by_condition[cond]["latencies"].append(float(r["audio_to_trigger_delta_ms"]))
                    except (ValueError, TypeError):
                        pass
            elif cls == "FALSE_POSITIVE":
                by_condition[cond]["fp"] += 1
            elif cls == "FALSE_NEGATIVE":
                by_condition[cond]["fn"] += 1
            elif cls == "TRUE_NEGATIVE":
                by_condition[cond]["tn"] += 1

            if r.get("detected_hotword") == "UNDETECTED":
                by_condition[cond]["undetected"] += 1

        condition_summary = {}
        for cond, d in by_condition.items():
            cond_tp = d["tp"]
            cond_fn = d["fn"]
            cond_fp = d["fp"]
            cond_rec = (cond_tp / (cond_tp + cond_fn)) if (cond_tp + cond_fn) > 0 else 0.0
            cond_prec = (cond_tp / (cond_tp + cond_fp)) if (cond_tp + cond_fp) > 0 else 0.0
            condition_summary[cond] = {
                "total": d["total"],
                "true_positives": cond_tp,
                "false_positives": cond_fp,
                "false_negatives": cond_fn,
                "true_negatives": d["tn"],
                "undetected": d["undetected"],
                "recall": cond_rec,
                "precision": cond_prec,
                "latency": self._calc_percentiles(d["latencies"])
            }

        # False Alarm Rate (FAR) = FP / (FP + TN)
        false_alarm_rate = (fp / (fp + tn)) if (fp + tn) > 0 else 0.0

        return {
            "total_trials": total_trials,
            "classification_counts": {
                "true_positive": tp,
                "false_positive": fp,
                "false_negative": fn,
                "true_negative": tn,
                "undetected": undetected_count
            },
            "metrics": {
                "recall": recall,
                "precision": precision,
                "accuracy": accuracy,
                "false_alarm_rate": false_alarm_rate,
                "undetected_count": undetected_count
            },
            "latency_stats_ms": latency_stats,
            "by_condition": condition_summary
        }

    def _calc_percentiles(self, vals: List[float]) -> Dict[str, Any]:
        if not vals:
            return {"count": 0, "mean": 0, "median": 0, "p90": 0, "p95": 0, "min": 0, "max": 0, "std": 0}

        sorted_vals = sorted(vals)
        n = len(sorted_vals)
        mean_val = sum(sorted_vals) / n
        var = sum((x - mean_val) ** 2 for x in sorted_vals) / n
        std_val = math.sqrt(var)

        def pct(p: float) -> float:
            k = (n - 1) * p
            f = math.floor(k)
            c = math.ceil(k)
            if f == c:
                return sorted_vals[int(k)]
            return sorted_vals[int(f)] * (c - k) + sorted_vals[int(c)] * (k - f)

        return {
            "count": n,
            "mean": round(mean_val, 1),
            "median": round(pct(0.5), 1),
            "p90": round(pct(0.9), 1),
            "p95": round(pct(0.95), 1),
            "min": round(sorted_vals[0], 1),
            "max": round(sorted_vals[-1], 1),
            "std": round(std_val, 1)
        }

    def export_csv(self, aligned_rows: List[Dict[str, Any]], filepath: str):
        """Exports row-by-row telemetry evaluation to CSV."""
        fieldnames = [
            "trial_id", "condition", "distance", "degree", "vocal_level", "phrase", "category",
            "prompt_text", "spoken_transcript",
            "target_hotword", "detected_hotword", "response_outcome", "classification",
            "prompt_to_audio_delta_ms", "audio_to_trigger_delta_ms", "earcon_latency_ms",
            "speech_end_offset_ms", "earcon_onset_offset_ms", "total_latency_delta_ms",
            "prompt_start_ms", "audio_onset_ms", "device_trigger_ms",
            "audio_file", "batch_offset_sec", "batch_audio_file", "first30_audio_file"
        ]
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames, extrasaction="ignore")
            writer.writeheader()
            for r in aligned_rows:
                writer.writerow(r)

    def export_json(self, session_meta: Dict[str, Any], aligned_rows: List[Dict[str, Any]], summary: Dict[str, Any], matrix: Dict[str, Any], filepath: str):
        """Exports complete session analysis as structured JSON."""
        data = {
            "session_metadata": session_meta,
            "summary_statistics": summary,
            "confusion_matrix": matrix,
            "trial_rows": aligned_rows
        }
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def export_benchmark_csv(self, session_meta: Dict[str, Any], aligned_rows: List[Dict[str, Any]], filepath: str):
        """Exports session data using Benchmark Oviedo's exact 19-column CSV schema."""
        headers = [
            'trial_id', 'ai_assistant', 'conversation_mode', 'condition', 'distance', 'degree',
            'vocal_level', 'noise_level', 'audio_track_played', 'phrase', 'target_hotword',
            'detected_hotword', 'response_outcome', 'classification',
            'audio_to_trigger_delta_ms', 'total_latency_delta_ms',
            'prompt_start_time', 'device_trigger_time', 'prompt_text'
        ]
        
        asst = session_meta.get("ai_assistant") or session_meta.get("assistant") or "Gemini Live - Android"
        conv_mode = session_meta.get("conversation_mode") or "wearer"

        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", newline="", encoding="utf-8") as f:
            writer = csv.DictWriter(f, fieldnames=headers, extrasaction="ignore")
            writer.writeheader()
            for r in aligned_rows:
                # Format timestamps as human-readable UTC or local datetime
                p_time = r.get("prompt_start_ms") or r.get("prompt_start_time")
                if isinstance(p_time, (int, float)) and p_time > 0:
                    try:
                        p_time_str = datetime.datetime.fromtimestamp(p_time / 1000.0, tz=datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
                    except Exception:
                        p_time_str = str(p_time)
                else:
                    p_time_str = str(p_time or "")

                d_time = r.get("device_trigger_ms") or r.get("device_trigger_time")
                if isinstance(d_time, (int, float)) and d_time > 0:
                    try:
                        d_time_str = datetime.datetime.fromtimestamp(d_time / 1000.0, tz=datetime.timezone.utc).strftime('%Y-%m-%d %H:%M:%S')
                    except Exception:
                        d_time_str = str(d_time)
                else:
                    d_time_str = str(d_time or "")

                row_dict = {
                    'trial_id': r.get("trial_id", ""),
                    'ai_assistant': asst,
                    'conversation_mode': conv_mode,
                    'condition': r.get("condition", ""),
                    'distance': r.get("distance", ""),
                    'degree': r.get("degree", ""),
                    'vocal_level': r.get("vocal_level", ""),
                    'noise_level': r.get("noise_level", ""),
                    'audio_track_played': r.get("audio_track_played", r.get("audio_file", "none")),
                    'phrase': r.get("phrase", r.get("target_hotword", "")),
                    'target_hotword': r.get("target_hotword", ""),
                    'detected_hotword': r.get("detected_hotword", ""),
                    'response_outcome': r.get("response_outcome", ""),
                    'classification': r.get("classification", ""),
                    'audio_to_trigger_delta_ms': r.get("audio_to_trigger_delta_ms", ""),
                    'total_latency_delta_ms': r.get("total_latency_delta_ms", ""),
                    'prompt_start_time': p_time_str,
                    'device_trigger_time': d_time_str,
                    'prompt_text': r.get("prompt_text", "")
                }
                writer.writerow(row_dict)

    def export_benchmark_json(self, session_meta: Dict[str, Any], aligned_rows: List[Dict[str, Any]], filepath: str):
        """Exports session data using Benchmark's JSON structure."""
        sid = session_meta.get("session_id") or "session"
        batch_file = session_meta.get("batch_audio_file") or f"recordings/{sid}/{sid}_batch_full_session.webm"
        data = {
            "participant_id": session_meta.get("participant_id") or "P01",
            "ai_assistant": session_meta.get("ai_assistant") or session_meta.get("assistant") or "Gemini Live - Android",
            "suite_name": session_meta.get("suite_name") or "Gemini Hotwords Suite (90 Trials)",
            "export_time_iso": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "batch_audio_file": batch_file,
            "total_trials": len(aligned_rows),
            "trials": aligned_rows
        }
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2)

    def _infer_vocal_effort(self, r: Dict[str, Any]) -> str:
        """Infers the explicit or implicit vocal effort level for a trial row."""
        voc = str(r.get("vocal_level") or "").strip()
        if voc:
            return voc
        pt = str(r.get("prompt_text") or "")
        if "Loud" in pt:
            return "Loud"
        if "Whisper" in pt:
            return "Whisper"
        if "Conversational" in pt:
            return "Conversational"
        return "Standard (Ambient)"

    def _compute_factor_bucket_stats(self, rows: List[Dict[str, Any]]) -> Dict[str, Any]:
        """Computes trigger rate and detailed Speech-to-Trigger (S2T) & Total E2E latency stats for a subset of trials."""
        tp = fn = fp = tn = 0
        s2t_vals: List[float] = []
        e2e_vals: List[float] = []
        for r in rows:
            cls = r.get("classification")
            if cls == "TRUE_POSITIVE":
                tp += 1
                v_s2t = r.get("audio_to_trigger_delta_ms")
                if v_s2t not in (None, "", "—"):
                    try:
                        s2t_vals.append(float(v_s2t))
                    except (ValueError, TypeError):
                        pass
                v_e2e = r.get("total_latency_delta_ms")
                if v_e2e not in (None, "", "—"):
                    try:
                        e2e_vals.append(float(v_e2e))
                    except (ValueError, TypeError):
                        pass
            elif cls == "FALSE_NEGATIVE":
                fn += 1
            elif cls == "FALSE_POSITIVE":
                fp += 1
            elif cls == "TRUE_NEGATIVE":
                tn += 1

        def _lat_summary(arr: List[float]) -> Dict[str, Any]:
            if not arr:
                return {"n": 0, "mean": None, "median": None, "p90": None, "sd": None, "min": None, "max": None,
                        "mean_str": "—", "median_str": "—", "p90_str": "—", "sd_str": "—", "minmax_str": "—"}
            s = sorted(arr)
            n = len(s)
            mean_v = sum(s) / n
            med_v = s[n // 2] if n % 2 == 1 else (s[n // 2 - 1] + s[n // 2]) / 2.0
            p90_v = s[min(n - 1, int(n * 0.9))]
            sd_v = (sum((x - mean_v) ** 2 for x in s) / (n - 1)) ** 0.5 if n > 1 else 0.0
            return {
                "n": n,
                "mean": round(mean_v),
                "median": round(med_v),
                "p90": round(p90_v),
                "sd": round(sd_v),
                "min": round(s[0]),
                "max": round(s[-1]),
                "mean_str": f"{round(mean_v)} ms",
                "median_str": f"{round(med_v)} ms",
                "p90_str": f"{round(p90_v)} ms",
                "sd_str": f"{round(sd_v)} ms",
                "minmax_str": f"{round(s[0])}–{round(s[-1])} ms",
            }

        hw_total = tp + fn
        recall_pct = (tp / hw_total * 100.0) if hw_total > 0 else 0.0
        return {
            "total": len(rows),
            "tp": tp,
            "fn": fn,
            "fp": fp,
            "tn": tn,
            "hw_total": hw_total,
            "recall": recall_pct,
            "s2t": _lat_summary(s2t_vals),
            "e2e": _lat_summary(e2e_vals),
        }

    def export_benchmark_markdown_report(self, session_meta: Dict[str, Any], aligned_rows: List[Dict[str, Any]], filepath: str):
        """Exports evaluation report in Benchmark Oviedo's sync_session_logs Markdown format with Factor-Wise Latency."""
        participant = session_meta.get("participant_id") or "P01"
        sid = session_meta.get("session_id") or "session"
        batch_file = session_meta.get("batch_audio_file") or f"recordings/{sid}/{sid}_batch_full_session.webm"
        date_str = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        total_trials = len(aligned_rows)
        aligned_count = sum(1 for r in aligned_rows if r.get("classification") in ("TRUE_POSITIVE", "FALSE_POSITIVE", "TRUE_NEGATIVE"))

        lines = [
            "# Gemini Hotwords Evaluation Report\n",
            f"- **Participant**: {participant}",
            f"- **Date**: {date_str}",
            f"- **Total Trials**: {total_trials}",
            f"- **Aligned Trials**: {aligned_count}",
            f"- **Full-Session Batch Audio Recording**: `{batch_file}`\n",
            "## Factor-Wise Latency & Sensitivity Summary\n",
            "### 1. By Vocal Effort / Tone",
            "| Vocal Effort | Trials | TP | FN | Trigger Rate | Mean S2T | Median S2T | P90 S2T | Min–Max S2T | Median Total E2E |",
            "|---|---|---|---|---|---|---|---|---|---|"
        ]

        vocal_groups = ["Whisper", "Conversational", "Loud", "Standard (Ambient)"]
        for v_lbl in vocal_groups:
            sub = [r for r in aligned_rows if self._infer_vocal_effort(r) == v_lbl]
            if not sub:
                continue
            st = self._compute_factor_bucket_stats(sub)
            lines.append(
                f"| **{v_lbl}** | {st['total']} | {st['tp']} | {st['fn']} | {st['recall']:.1f}% | "
                f"{st['s2t']['mean_str']} | {st['s2t']['median_str']} | {st['s2t']['p90_str']} | {st['s2t']['minmax_str']} | {st['e2e']['median_str']} |"
            )

        conv_combined = [r for r in aligned_rows if self._infer_vocal_effort(r) in ("Conversational", "Standard (Ambient)")]
        if conv_combined and len(conv_combined) > len([r for r in aligned_rows if self._infer_vocal_effort(r) == "Conversational"]):
            st_cc = self._compute_factor_bucket_stats(conv_combined)
            lines.append(
                f"| **All Conversational / Natural (Combined)** | {st_cc['total']} | {st_cc['tp']} | {st_cc['fn']} | {st_cc['recall']:.1f}% | "
                f"{st_cc['s2t']['mean_str']} | {st_cc['s2t']['median_str']} | {st_cc['s2t']['p90_str']} | {st_cc['s2t']['minmax_str']} | {st_cc['e2e']['median_str']} |"
            )

        lines.extend([
            "\n### 2. By Acoustic Noise Condition",
            "| Noise Condition | Trials | TP | FN | Trigger Rate | Mean S2T | Median S2T | P90 S2T | Min–Max S2T | Median Total E2E |",
            "|---|---|---|---|---|---|---|---|---|---|"
        ])
        seen_conds = []
        for r in aligned_rows:
            c = r.get("condition") or "Silent"
            if c not in seen_conds:
                seen_conds.append(c)
        for c_lbl in sorted(seen_conds, key=lambda c: (0 if "silent" in c.lower() else 1, c)):
            sub = [r for r in aligned_rows if (r.get("condition") or "Silent") == c_lbl]
            st = self._compute_factor_bucket_stats(sub)
            lines.append(
                f"| **{c_lbl}** | {st['total']} | {st['tp']} | {st['fn']} | {st['recall']:.1f}% | "
                f"{st['s2t']['mean_str']} | {st['s2t']['median_str']} | {st['s2t']['p90_str']} | {st['s2t']['minmax_str']} | {st['e2e']['median_str']} |"
            )

        lines.extend([
            "\n### 3. By Hotword Phrase",
            "| Hotword Phrase | Trials | TP | FN | Trigger Rate | Mean S2T | Median S2T | P90 S2T | Min–Max S2T | Median Total E2E |",
            "|---|---|---|---|---|---|---|---|---|---|"
        ])
        seen_hws = []
        for r in aligned_rows:
            h = r.get("target_hotword") or "NONE"
            if h not in seen_hws:
                seen_hws.append(h)
        for h_lbl in seen_hws:
            sub = [r for r in aligned_rows if (r.get("target_hotword") or "NONE") == h_lbl]
            st = self._compute_factor_bucket_stats(sub)
            lines.append(
                f"| **{h_lbl}** | {st['total']} | {st['tp']} | {st['fn']} | {st['recall']:.1f}% | "
                f"{st['s2t']['mean_str']} | {st['s2t']['median_str']} | {st['s2t']['p90_str']} | {st['s2t']['minmax_str']} | {st['e2e']['median_str']} |"
            )

        lines.extend([
            "\n### 4. Cross-Factor Interaction (Condition × Vocal Effort)",
            "| Noise Condition | Vocal Effort | Trials | TP | FN | Trigger Rate | Mean S2T | Median S2T | P90 S2T | Min–Max S2T | Median Total E2E |",
            "|---|---|---|---|---|---|---|---|---|---|---|"
        ])
        for c_lbl in sorted(seen_conds, key=lambda c: (0 if "silent" in c.lower() else 1, c)):
            for v_lbl in vocal_groups:
                sub = [r for r in aligned_rows if (r.get("condition") or "Silent") == c_lbl and self._infer_vocal_effort(r) == v_lbl]
                if not sub:
                    continue
                st = self._compute_factor_bucket_stats(sub)
                lines.append(
                    f"| {c_lbl} | **{v_lbl}** | {st['total']} | {st['tp']} | {st['fn']} | {st['recall']:.1f}% | "
                    f"{st['s2t']['mean_str']} | {st['s2t']['median_str']} | {st['s2t']['p90_str']} | {st['s2t']['minmax_str']} | {st['e2e']['median_str']} |"
                )

        lines.extend([
            "\n## Trial Breakdown\n",
            "| # | Condition | Vocal Effort | Phrase | Result | Attempts | Glasses Hotword | S2T Latency (ms) | Total E2E (ms) | DSP Status |",
            "|---|---|---|---|---|---|---|---|---|---|"
        ])

        for i, r in enumerate(aligned_rows):
            cond = r.get("condition", "—")
            voc = self._infer_vocal_effort(r)
            phrase = r.get("phrase", r.get("target_hotword", "—"))
            cls = r.get("classification", "")
            res = "PASS" if cls == "TRUE_POSITIVE" else ("FAIL" if cls == "FALSE_NEGATIVE" else cls)
            hw = r.get("detected_hotword") or "—"
            s2t_m = r.get("audio_to_trigger_delta_ms") if r.get("audio_to_trigger_delta_ms") not in (None, "") else "—"
            e2e_m = r.get("total_latency_delta_ms") if r.get("total_latency_delta_ms") not in (None, "") else "—"
            status = "SUCCESS" if cls == "TRUE_POSITIVE" else ("MISSED" if cls == "FALSE_NEGATIVE" else "IDLE")
            lines.append(f"| {i+1} | {cond} | {voc} | {phrase} | {res} | 1 | {hw} | {s2t_m} | {e2e_m} | {status} |")

        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")

    def export_html_report(self, session_meta: Dict[str, Any], aligned_rows: List[Dict[str, Any]], summary: Dict[str, Any], matrix: Dict[str, Any], filepath: str):
        """Exports an executive-ready standalone HTML report (Wearer or Bystander)."""
        import collections
        import re

        # Determine whether this session is a Wearer study or Bystander study
        conv_mode = str(session_meta.get("conversation_mode", "")).strip().lower()
        suite_title = str(session_meta.get("suite_name", "")).strip().lower()
        is_explicit_wearer = (conv_mode == "wearer" or "wearer" in suite_title)

        has_angles = len(set(
            str(r.get("degree", "0")).replace("°", "").strip()
            for r in aligned_rows
            if str(r.get("degree", "0")).replace("°", "").strip() not in ("", "0")
        )) > 1

        is_bystander = (not is_explicit_wearer) and (
            conv_mode == "bystander" or
            "bystander" in suite_title or
            any("bystander" in str(r.get("conversation_mode", "")).lower() for r in aligned_rows) or
            has_angles
        )
        is_wearer = not is_bystander

        # Format KPI metrics
        metrics = summary.get("metrics", {})
        counts = summary.get("classification_counts", {})
        latency_stats = summary.get("latency_stats_ms", {})

        tp = counts.get("true_positive", 0)
        fn = counts.get("false_negative", 0)
        tn = counts.get("true_negative", 0)
        fp = counts.get("false_positive", 0)
        total_trials = summary.get("total_trials", len(aligned_rows))

        intended_hotwords = tp + fn
        recall_val = (tp / intended_hotwords) if intended_hotwords > 0 else 0.0
        recall_pct = f"{recall_val * 100:.1f}%"
        frr_val = (fn / intended_hotwords) if intended_hotwords > 0 else 0.0
        frr_pct = f"{frr_val * 100:.1f}%"

        distractors = tn + fp
        spec_val = (tn / distractors) if distractors > 0 else 1.0
        specificity_pct = f"{spec_val * 100:.1f}%"
        far_val = (fp / distractors) if distractors > 0 else 0.0
        far_pct = f"{far_val * 100:.1f}%"

        accuracy_pct = f"{metrics.get('accuracy', 0.0) * 100:.1f}%"
        median_lat = f"{latency_stats.get('median', 0)} ms"
        p90_lat = f"{latency_stats.get('p90', 0)} ms"

        # 1. Dynamic Vocal Effort / Level Breakdown (with Full Latency Stats)
        vocal_groups_order = ["Whisper", "Conversational", "Loud", "Standard (Ambient)"]
        vocal_table_rows = ""
        vocal_bar_items = ""
        explicit_conv_count = 0
        ambient_conv_count = 0

        for voc in vocal_groups_order:
            sub_v = [r for r in aligned_rows if self._infer_vocal_effort(r) == voc]
            if not sub_v:
                continue
            if voc == "Conversational":
                explicit_conv_count = len(sub_v)
            elif voc == "Standard (Ambient)":
                ambient_conv_count = len(sub_v)
            vst = self._compute_factor_bucket_stats(sub_v)
            v_rec = vst["recall"]
            v_rec_color = "#34d399" if v_rec >= 80 else ("#fbbf24" if v_rec >= 50 else "#f87171")
            vocal_table_rows += f"""
            <tr class="border-b border-slate-800/80 hover:bg-slate-800/40">
                <td class="px-3 py-2 font-bold text-slate-100">{voc}</td>
                <td class="px-3 py-2 text-slate-300">{vst['total']}</td>
                <td class="px-3 py-2 text-emerald-400 font-semibold">{vst['tp']}</td>
                <td class="px-3 py-2 text-rose-400 font-semibold">{vst['fn']}</td>
                <td class="px-3 py-2 font-bold" style="color: {v_rec_color};">{v_rec:.1f}%</td>
                <td class="px-3 py-2 text-sky-300 font-mono">{vst['s2t']['mean_str']}</td>
                <td class="px-3 py-2 text-amber-300 font-bold font-mono">{vst['s2t']['median_str']}</td>
                <td class="px-3 py-2 text-slate-300 font-mono">{vst['s2t']['p90_str']}</td>
                <td class="px-3 py-2 text-slate-400 font-mono" style="font-size: 0.78rem;">{vst['s2t']['minmax_str']}</td>
                <td class="px-3 py-2 text-purple-300 font-mono">{vst['e2e']['median_str']}</td>
            </tr>
            """
            med_val = vst["s2t"]["median"] or 0
            lat_bar_pct = max(4, min(100, (med_val / 6000.0) * 100.0)) if med_val > 0 else 0
            vocal_bar_items += f"""
            <div style="margin-bottom: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 4px;">
                    <span style="font-weight: 600; color: #f1f5f9;">{voc} <span style="color: {v_rec_color}; font-weight:700;">({v_rec:.1f}% Recall)</span></span>
                    <span style="font-family: monospace; color: #fbbf24; font-weight: 700;">Med S2T: {vst['s2t']['median_str']} (Mean: {vst['s2t']['mean_str']})</span>
                </div>
                <div style="height: 10px; background: #0f172a; border-radius: 5px; overflow: hidden; border: 1px solid #334155;">
                    <div style="height: 100%; width: {lat_bar_pct:.1f}%; background: linear-gradient(90deg, #38bdf8, #fbbf24); border-radius: 5px;"></div>
                </div>
            </div>
            """

        if explicit_conv_count > 0 and ambient_conv_count > 0:
            sub_conv_all = [r for r in aligned_rows if self._infer_vocal_effort(r) in ("Conversational", "Standard (Ambient)")]
            vst_all = self._compute_factor_bucket_stats(sub_conv_all)
            v_rec_all = vst_all["recall"]
            v_rec_all_color = "#34d399" if v_rec_all >= 80 else ("#fbbf24" if v_rec_all >= 50 else "#f87171")
            vocal_table_rows += f"""
            <tr class="border-t-2 border-slate-700 bg-slate-900/70 hover:bg-slate-800/40">
                <td class="px-3 py-2 font-bold text-sky-300">All Conversational / Natural (Combined)</td>
                <td class="px-3 py-2 text-slate-200 font-semibold">{vst_all['total']}</td>
                <td class="px-3 py-2 text-emerald-400 font-semibold">{vst_all['tp']}</td>
                <td class="px-3 py-2 text-rose-400 font-semibold">{vst_all['fn']}</td>
                <td class="px-3 py-2 font-bold" style="color: {v_rec_all_color};">{v_rec_all:.1f}%</td>
                <td class="px-3 py-2 text-sky-300 font-mono">{vst_all['s2t']['mean_str']}</td>
                <td class="px-3 py-2 text-amber-300 font-bold font-mono">{vst_all['s2t']['median_str']}</td>
                <td class="px-3 py-2 text-slate-300 font-mono">{vst_all['s2t']['p90_str']}</td>
                <td class="px-3 py-2 text-slate-400 font-mono" style="font-size: 0.78rem;">{vst_all['s2t']['minmax_str']}</td>
                <td class="px-3 py-2 text-purple-300 font-mono">{vst_all['e2e']['median_str']}</td>
            </tr>
            """

        # 2. Hotword Phrase Breakdown (with Full Latency Stats)
        seen_hotwords = []
        for r in aligned_rows:
            hw_t = r.get("target_hotword") or "NONE"
            if hw_t not in seen_hotwords:
                seen_hotwords.append(hw_t)
        hotword_table_rows = ""
        for hw_name in seen_hotwords:
            sub_hw = [r for r in aligned_rows if (r.get("target_hotword") or "NONE") == hw_name]
            hst = self._compute_factor_bucket_stats(sub_hw)
            h_rec = hst["recall"]
            h_color = "#34d399" if h_rec >= 80 else ("#fbbf24" if h_rec >= 50 else "#f87171")
            hotword_table_rows += f"""
            <tr class="border-b border-slate-800/80 hover:bg-slate-800/40">
                <td class="px-3 py-2 font-bold text-slate-100">{hw_name}</td>
                <td class="px-3 py-2 text-slate-300">{hst['total']}</td>
                <td class="px-3 py-2 text-emerald-400 font-semibold">{hst['tp']}</td>
                <td class="px-3 py-2 text-rose-400 font-semibold">{hst['fn']}</td>
                <td class="px-3 py-2 font-bold" style="color: {h_color};">{h_rec:.1f}%</td>
                <td class="px-3 py-2 text-sky-300 font-mono">{hst['s2t']['mean_str']}</td>
                <td class="px-3 py-2 text-amber-300 font-bold font-mono">{hst['s2t']['median_str']}</td>
                <td class="px-3 py-2 text-slate-300 font-mono">{hst['s2t']['p90_str']}</td>
                <td class="px-3 py-2 text-slate-400 font-mono" style="font-size: 0.78rem;">{hst['s2t']['minmax_str']}</td>
                <td class="px-3 py-2 text-purple-300 font-mono">{hst['e2e']['median_str']}</td>
            </tr>
            """

        # 3. Cross-Factor Interaction (Noise Condition x Vocal Effort)
        seen_conds_all = []
        for r in aligned_rows:
            c_n = r.get("condition") or "Silent"
            if c_n not in seen_conds_all:
                seen_conds_all.append(c_n)
        sorted_conds_all = sorted(seen_conds_all, key=lambda c: (0 if "silent" in c.lower() else 1, c))
        cross_factor_rows = ""
        for c_n in sorted_conds_all:
            for voc in vocal_groups_order:
                sub_cv = [r for r in aligned_rows if (r.get("condition") or "Silent") == c_n and self._infer_vocal_effort(r) == voc]
                if not sub_cv:
                    continue
                cvst = self._compute_factor_bucket_stats(sub_cv)
                cv_rec = cvst["recall"]
                cv_color = "#34d399" if cv_rec >= 80 else ("#fbbf24" if cv_rec >= 50 else "#f87171")
                cross_factor_rows += f"""
                <tr class="border-b border-slate-800/80 hover:bg-slate-800/40">
                    <td class="px-3 py-2 font-semibold text-slate-200">{c_n}</td>
                    <td class="px-3 py-2 font-bold text-sky-300">{voc}</td>
                    <td class="px-3 py-2 text-slate-300">{cvst['total']}</td>
                    <td class="px-3 py-2 text-emerald-400 font-semibold">{cvst['tp']}</td>
                    <td class="px-3 py-2 text-rose-400 font-semibold">{cvst['fn']}</td>
                    <td class="px-3 py-2 font-bold" style="color: {cv_color};">{cv_rec:.1f}%</td>
                    <td class="px-3 py-2 text-sky-300 font-mono">{cvst['s2t']['mean_str']}</td>
                    <td class="px-3 py-2 text-amber-300 font-bold font-mono">{cvst['s2t']['median_str']}</td>
                    <td class="px-3 py-2 text-slate-300 font-mono">{cvst['s2t']['p90_str']}</td>
                    <td class="px-3 py-2 text-slate-400 font-mono" style="font-size: 0.78rem;">{cvst['s2t']['minmax_str']}</td>
                    <td class="px-3 py-2 text-purple-300 font-mono">{cvst['e2e']['median_str']}</td>
                </tr>
                """

        # Confusion Matrix Rows
        labels = matrix.get("labels", ["HEY_GOOGLE", "OK_GOOGLE", "NON_HOTWORD", "UNDETECTED"])
        mat_dict = matrix.get("matrix", {})
        cm_headers_html = "".join(f'<th class="px-3 py-2 text-center text-xs font-semibold">{l}</th>' for l in labels)
        cm_rows_html = ""
        for tgt in labels:
            row_cells = ""
            for det in labels:
                val = mat_dict.get(tgt, {}).get(det, 0)
                bg_cls = "bg-sky-950/40 text-sky-300 font-bold" if val > 0 and tgt == det else ("bg-rose-950/40 text-rose-300 font-bold" if val > 0 and det != "UNDETECTED" and tgt != det else "text-slate-400")
                row_cells += f'<td class="px-3 py-2 text-center text-sm {bg_cls}">{val}</td>'
            cm_rows_html += f'<tr class="border-b border-slate-800"><td class="px-3 py-2 font-medium text-slate-200 text-xs bg-slate-900/60">{tgt}</td>{row_cells}</tr>'

        # Build Middle Section depending on study mode:
        if is_wearer:
            report_title = f"Smart Glasses — Wearer Hotword Evaluation Report ({session_meta.get('session_id', 'Session')})"
            report_heading = "SMART GLASSES — WEARER HOTWORD EVALUATION REPORT"
            mode_badge = "Wearer Hotword & Acoustic Immunity"

            kpi_html = f"""
            <div class="grid-kpi">
                <div class="kpi-box">
                    <div class="kpi-title">Wearer Trigger Rate</div>
                    <div class="kpi-val" style="color: #4ade80;">{recall_pct}</div>
                    <div class="kpi-sub">{tp} of {intended_hotwords} intended hotwords</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">False Rejection Rate (FRR)</div>
                    <div class="kpi-val" style="color: {'#f87171' if frr_val > 0.15 else '#fbbf24'};">{frr_pct}</div>
                    <div class="kpi-sub">{fn} missed wearer attempts</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">Distractor Rejection</div>
                    <div class="kpi-val" style="color: #38bdf8;">{specificity_pct}</div>
                    <div class="kpi-sub">{tn} of {distractors} non-hotwords ignored</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">Speech-to-Trigger Latency</div>
                    <div class="kpi-val" style="color: #fbbf24;">{median_lat}</div>
                    <div class="kpi-sub">Median (P90: {p90_lat})</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">Trial Distribution</div>
                    <div class="kpi-val" style="font-size: 1.15rem; padding-top: 6px;">
                        <span style="color: #4ade80;">{tp} TP</span> •
                        <span style="color: #f87171;">{fn} FN</span> •
                        <span style="color: #38bdf8;">{tn} TN</span>
                    </div>
                    <div class="kpi-sub">{total_trials} Total Executed</div>
                </div>
            </div>
            """

            # Aggregate Noise Conditions with full latency metrics
            cond_table_rows = ""
            bar_chart_items = ""
            for cond_name in sorted_conds_all:
                sub_c = [r for r in aligned_rows if (r.get("condition") or "Silent") == cond_name]
                cst = self._compute_factor_bucket_stats(sub_c)
                c_hw = cst["hw_total"]
                c_rec = cst["recall"]
                c_color = "#34d399" if c_rec >= 80 else ("#fbbf24" if c_rec >= 50 else "#f87171")

                cond_table_rows += f"""
                <tr class="border-b border-slate-800/80 hover:bg-slate-800/40">
                    <td class="px-3 py-2.5 font-bold text-slate-100">{cond_name}</td>
                    <td class="px-3 py-2.5 text-slate-300">{cst['total']}</td>
                    <td class="px-3 py-2.5 text-emerald-400 font-semibold">{cst['tp']}</td>
                    <td class="px-3 py-2.5 text-rose-400 font-semibold">{cst['fn']}</td>
                    <td class="px-3 py-2.5 font-bold" style="color: {c_color};">{c_rec:.1f}%</td>
                    <td class="px-3 py-2.5 text-sky-300 font-mono">{cst['s2t']['mean_str']}</td>
                    <td class="px-3 py-2.5 text-amber-300 font-bold font-mono">{cst['s2t']['median_str']}</td>
                    <td class="px-3 py-2.5 text-slate-300 font-mono">{cst['s2t']['p90_str']}</td>
                    <td class="px-3 py-2.5 text-slate-400 font-mono" style="font-size: 0.78rem;">{cst['s2t']['minmax_str']}</td>
                    <td class="px-3 py-2.5 text-purple-300 font-mono">{cst['e2e']['median_str']}</td>
                </tr>
                """

                bar_pct = max(3, min(100, c_rec))
                bar_chart_items += f"""
                <div style="margin-bottom: 14px;">
                    <div style="display: flex; justify-content: space-between; font-size: 0.82rem; margin-bottom: 4px;">
                        <span style="font-weight: 600; color: #f1f5f9;">{cond_name}</span>
                        <span style="font-weight: 700; color: {c_color};">{c_rec:.1f}% ({cst['tp']}/{c_hw}) • <span style="color:#fbbf24; font-family:monospace;">Med {cst['s2t']['median_str']}</span></span>
                    </div>
                    <div style="height: 12px; background: #0f172a; border-radius: 6px; overflow: hidden; border: 1px solid #334155;">
                        <div style="height: 100%; width: {bar_pct:.1f}%; background: {c_color}; border-radius: 6px; transition: width 0.3s ease;"></div>
                    </div>
                </div>
                """

            middle_section_html = f"""
            <div class="card" style="margin-bottom: 24px;">
                <h2 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 16px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                    🔊 Factor 1: Acoustic Noise Condition — Latency & Sensitivity Breakdown
                </h2>
                <div class="chart-container" style="align-items: stretch;">
                    <div style="flex: 0.9; min-width: 300px; background-color: #0f172a; border-radius: 12px; padding: 20px; border: 1px solid #334155; display: flex; flex-direction: column; justify-content: center;">
                        <h4 style="font-size: 0.85rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 16px; letter-spacing: 0.05em;">Trigger Rate & Median Latency by Condition</h4>
                        {bar_chart_items}
                        <p style="text-align: center; color: #64748b; font-size: 0.75rem; margin-top: 12px;">
                            Wearer Hotword Trigger Rate & Median Speech-to-Trigger (S2T) Latency across ambient noise conditions
                        </p>
                    </div>
                    <div style="flex: 1.5; min-width: 420px; overflow-x: auto;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Noise Condition</th>
                                    <th>Trials</th>
                                    <th>TP</th>
                                    <th>FN</th>
                                    <th>Trigger Rate</th>
                                    <th>Mean S2T</th>
                                    <th>Median S2T</th>
                                    <th>P90 S2T</th>
                                    <th>Min–Max S2T</th>
                                    <th>Median E2E</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cond_table_rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            """

        else:
            # Bystander Study Layout with Polar Radar Chart
            report_title = f"Android XR Smart Glasses — Bystander Evaluation Report ({session_meta.get('session_id', 'Session')})"
            report_heading = "ANDROID XR SMART GLASSES — BYSTANDER EVALUATION REPORT"
            mode_badge = "Bystander Spatial Azimuth Rejection"

            kpi_html = f"""
            <div class="grid-kpi">
                <div class="kpi-box">
                    <div class="kpi-title">Hotword Recall (Sensitivity)</div>
                    <div class="kpi-val" style="color: #4ade80;">{recall_pct}</div>
                    <div class="kpi-sub">TP / (TP + FN) true hotwords</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">Overall Accuracy</div>
                    <div class="kpi-val">{accuracy_pct}</div>
                    <div class="kpi-sub">(TP + TN) / {total_trials} Total Trials</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">False Alarm Rate</div>
                    <div class="kpi-val" style="color: {'#f87171' if metrics.get('false_alarm_rate', 0) > 0.05 else '#38bdf8'};">{far_pct}</div>
                    <div class="kpi-sub">Spurious triggers on distractors</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">Speech-to-Trigger Latency</div>
                    <div class="kpi-val" style="color: #fbbf24;">{median_lat}</div>
                    <div class="kpi-sub">Median (P90: {p90_lat})</div>
                </div>
                <div class="kpi-box">
                    <div class="kpi-title">Trial Distribution</div>
                    <div class="kpi-val" style="font-size: 1.15rem; padding-top: 6px;">
                        <span style="color: #4ade80;">{counts.get('true_positive', 0)} TP</span> •
                        <span style="color: #f87171;">{counts.get('false_negative', 0)} FN</span> •
                        <span style="color: #94a3b8;">{counts.get('true_negative', 0)} TN</span>
                    </div>
                    <div class="kpi-sub">{total_trials} Total Executed</div>
                </div>
            </div>
            """

            STANDARD_ANGLES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]
            angle_map = {a: {"tp": 0, "fn": 0, "fp": 0, "tn": 0, "total": 0, "latencies": []} for a in STANDARD_ANGLES}
            for r in aligned_rows:
                deg_val = None
                if r.get("degree"):
                    try:
                        deg_val = int(str(r["degree"]).replace("°", "").strip())
                    except ValueError:
                        pass
                if deg_val is None:
                    m = re.search(r"(\d+)\s*°", r.get("condition", ""))
                    if m:
                        deg_val = int(m.group(1))

                if deg_val is not None:
                    deg_norm = deg_val % 360
                    if deg_norm in angle_map:
                        angle_map[deg_norm]["total"] += 1
                        cls = r.get("classification")
                        if cls == "TRUE_POSITIVE":
                            angle_map[deg_norm]["tp"] += 1
                            if r.get("audio_to_trigger_delta_ms") not in (None, "", "—"):
                                try:
                                    angle_map[deg_norm]["latencies"].append(float(r["audio_to_trigger_delta_ms"]))
                                except (ValueError, TypeError):
                                    pass
                        elif cls == "FALSE_POSITIVE":
                            angle_map[deg_norm]["fp"] += 1
                        elif cls == "FALSE_NEGATIVE":
                            angle_map[deg_norm]["fn"] += 1
                        elif cls == "TRUE_NEGATIVE":
                            angle_map[deg_norm]["tn"] += 1

            cx, cy, max_r = 200, 200, 140
            poly_points = []
            dots_svg = []
            for deg in STANDARD_ANGLES:
                st = angle_map[deg]
                pos_count = st["tp"] + st["fn"]
                rec = (st["tp"] / pos_count) if pos_count > 0 else 0.0
                r_px = max_r * max(0.04, min(1.0, rec))
                rad = math.radians(deg)
                px = cx + r_px * math.sin(rad)
                py = cy - r_px * math.cos(rad)
                poly_points.append(f"{px:.1f},{py:.1f}")
                pct_lbl = f"{rec * 100:.0f}%"
                dots_svg.append(
                    f'<circle cx="{px:.1f}" cy="{py:.1f}" r="4.5" fill="#38bdf8" stroke="#0f172a" stroke-width="1.5"><title>{deg}°: {pct_lbl} Recall ({st["tp"]}/{pos_count})</title></circle>'
                )

            poly_pts_str = " ".join(poly_points)
            concentric_svg = ""
            for level, pct in [(0.25, "25%"), (0.50, "50%"), (0.75, "75%"), (1.00, "100%")]:
                r_level = max_r * level
                concentric_svg += f'<circle cx="{cx}" cy="{cy}" r="{r_level:.1f}" fill="none" stroke="#334155" stroke-dasharray="3,3" stroke-width="1" />'
                concentric_svg += f'<text x="{cx + 4}" y="{cy - r_level + 11}" fill="#64748b" font-size="9" font-family="sans-serif">{pct}</text>'

            spokes_svg = ""
            for deg in STANDARD_ANGLES:
                rad = math.radians(deg)
                x2 = cx + max_r * math.sin(rad)
                y2 = cy - max_r * math.cos(rad)
                spokes_svg += f'<line x1="{cx}" y1="{cy}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="#1e293b" stroke-width="1" />'
                tx = cx + (max_r + 18) * math.sin(rad)
                ty = cy - (max_r + 18) * math.cos(rad) + 4
                spokes_svg += f'<text x="{tx:.1f}" y="{ty:.1f}" fill="#94a3b8" font-size="11" font-weight="600" text-anchor="middle" font-family="sans-serif">{deg}°</text>'

            angle_table_rows = ""
            for deg in STANDARD_ANGLES:
                st = angle_map[deg]
                pos = st["tp"] + st["fn"]
                rec = (st["tp"] / pos * 100) if pos > 0 else 0.0
                avg_lat = round(sum(st["latencies"]) / len(st["latencies"]), 0) if st["latencies"] else "—"
                rec_color = "text-emerald-400" if rec >= 80 else ("text-amber-400" if rec >= 50 else "text-rose-400")
                angle_table_rows += f"""
                <tr class="border-b border-slate-800/80 hover:bg-slate-800/40">
                    <td class="px-3 py-2 font-bold text-slate-100">{deg}°</td>
                    <td class="px-3 py-2 text-slate-300">{st['total']}</td>
                    <td class="px-3 py-2 text-emerald-400 font-semibold">{st['tp']}</td>
                    <td class="px-3 py-2 text-rose-400 font-semibold">{st['fn']}</td>
                    <td class="px-3 py-2 text-amber-400">{st['fp']}</td>
                    <td class="px-3 py-2 font-bold {rec_color}">{rec:.1f}%</td>
                    <td class="px-3 py-2 text-slate-400">{avg_lat}</td>
                </tr>
                """

            middle_section_html = f"""
            <div class="card" style="margin-bottom: 24px;">
                <h2 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 16px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                    🔄 Bystander Angular Sensitivity Profile (360° Polar Chart)
                </h2>
                <div class="chart-container">
                    <div style="background-color: #0f172a; border-radius: 12px; padding: 16px; border: 1px solid #334155;">
                        <svg width="400" height="400" viewBox="0 0 400 400" style="overflow: visible;">
                            {concentric_svg}
                            {spokes_svg}
                            <polygon points="{poly_pts_str}" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" stroke-width="2.5" />
                            {''.join(dots_svg)}
                            <circle cx="{cx}" cy="{cy}" r="12" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5" />
                            <text x="{cx}" y="{cy + 4}" font-size="12" text-anchor="middle">👓</text>
                        </svg>
                        <p style="text-align: center; color: #64748b; font-size: 0.75rem; margin-top: 8px;">
                            Center = 0% Sensitivity • Perimeter = 100% Sensitivity • Top = 0° (Head-on)
                        </p>
                    </div>
                    <div style="flex: 1; min-width: 320px; overflow-x: auto;">
                        <table>
                            <thead>
                                <tr>
                                    <th>Angle</th>
                                    <th>Trials</th>
                                    <th>True Pos</th>
                                    <th>False Neg</th>
                                    <th>False Pos</th>
                                    <th>Recall</th>
                                    <th>Avg Latency (ms)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {angle_table_rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            """

        # Pre-render rows JSON for interactive JS filtering
        json_rows_safe = json.dumps(aligned_rows).replace("</", r"<\/")

        # Full-Session Batch & First-30-Trials Audio Recording metadata
        sid_val = session_meta.get("session_id") or "session"
        raw_batch_path = session_meta.get("batch_audio_file") or f"recordings/{sid_val}/{sid_val}_batch_full_session.webm"
        clean_batch_path = str(raw_batch_path).replace("/data/", "").lstrip("/")
        batch_size_bytes = session_meta.get("batch_audio_size_bytes") or 0
        batch_size_str = f"{batch_size_bytes / (1024 * 1024):.2f} MB" if batch_size_bytes > 0 else "Continuous 48 kHz Stream"

        raw_first30_path = session_meta.get("first30_audio_file") or f"recordings/{sid_val}/{sid_val}_first_30_trials.webm"
        clean_first30_path = str(raw_first30_path).replace("/data/", "").lstrip("/")
        first30_size_bytes = session_meta.get("first30_audio_size_bytes") or 0
        first30_size_str = f"{first30_size_bytes / (1024 * 1024):.2f} MB" if first30_size_bytes > 0 else "Trials T001–T030 (48 kHz)"

        # Build quick-jump timeline buttons for the Batch Audio card
        batch_timeline_pills_list = []
        batch_t0 = session_meta.get("batch_start_ms")
        if not batch_t0 and aligned_rows:
            valid_p_starts = [r.get("prompt_start_ms") for r in aligned_rows if isinstance(r.get("prompt_start_ms"), (int, float)) and r.get("prompt_start_ms") > 0]
            if valid_p_starts:
                batch_t0 = min(valid_p_starts)

        for r in aligned_rows:
            tid_p = r.get("trial_id") or "T000"
            off_s = r.get("batch_offset_sec")
            if off_s is None and batch_t0 and isinstance(r.get("prompt_start_ms"), (int, float)) and r.get("prompt_start_ms") >= batch_t0:
                off_s = round((r["prompt_start_ms"] - batch_t0) / 1000.0, 2)
                r["batch_offset_sec"] = off_s
            if off_s is not None:
                mins = int(float(off_s) // 60)
                secs = int(float(off_s) % 60)
                time_lbl = f"{mins}:{secs:02d}"
                cls_p = r.get("classification", "")
                b_col = "#34d399" if cls_p == "TRUE_POSITIVE" else ("#f87171" if cls_p == "FALSE_NEGATIVE" else "#94a3b8")
                phrase_p = r.get("phrase", "")
                cond_p = r.get("condition", "")
                batch_timeline_pills_list.append(
                    f'<button onclick="seekBatchAudio({float(off_s):.2f})" title="Jump to {tid_p} ({phrase_p} - {cond_p}) at {time_lbl} in Full-Session Batch Recording" '
                    f'style="background:rgba(15,23,42,0.85); border:1px solid {b_col}; color:{b_col}; border-radius:6px; padding:3px 8px; font-size:0.72rem; font-family:monospace; cursor:pointer;">'
                    f'{tid_p} ({time_lbl})</button>'
                )
        batch_timeline_pills_html = "".join(batch_timeline_pills_list) if batch_timeline_pills_list else '<span style="color:#64748b; font-size:0.78rem;">Timeline markers populate automatically as trials execute during the continuous session recording.</span>'
        # Re-serialize aligned_rows in case batch_offset_sec was populated above
        json_rows_safe = json.dumps(aligned_rows).replace("</", r"<\/")

        terminal_lines = []
        for r in aligned_rows:
            tid = r.get("trial_id", "T000")
            cond = r.get("condition", "Silent")
            voc = r.get("vocal_level") or "Norm"
            tgt = r.get("target_hotword") or "NONE"
            spoken = r.get("spoken_transcript") or r.get("phrase") or "—"
            outcome = r.get("response_outcome") or r.get("classification") or "STAYED_ASLEEP"
            lat = f"{r.get('audio_to_trigger_delta_ms')}ms" if r.get("audio_to_trigger_delta_ms") else "None"
            rec = r.get("audio_file") or "None"
            color = "#34d399" if "ACTIVATED" in outcome or outcome == "TRUE_POSITIVE" else ("#f87171" if outcome == "FALSE_NEGATIVE" else "#94a3b8")
            line = f'<div><span style="color:#64748b;">[{tid}]</span> <span style="color:#38bdf8;">[{cond} | {voc}]</span> Tgt: <strong>{tgt}</strong> | Spoken: <em>"{spoken}"</em> &rarr; <span style="color:{color}; font-weight:bold;">{outcome}</span> (Latency: {lat}) | Rec: <span style="color:#94a3b8;">{rec}</span></div>'
            terminal_lines.append(line)
        terminal_logs_html = "".join(terminal_lines)

        html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{report_title}</title>
    <style>
        * {{ box-sizing: border-box; margin: 0; padding: 0; }}
        body {{ background-color: #0b1120; color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; padding: 24px; }}
        .max-w-7xl {{ max-width: 1280px; margin: 0 auto; }}
        .card {{ background-color: #1e293b; border: 1px solid #334155; border-radius: 12px; padding: 20px; }}
        .grid-kpi {{ display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin: 20px 0; }}
        .kpi-box {{ background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid #334155; border-radius: 10px; padding: 16px; }}
        .kpi-title {{ font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 4px; font-weight: 600; }}
        .kpi-val {{ font-size: 1.85rem; font-weight: 700; color: #38bdf8; }}
        .kpi-sub {{ font-size: 0.75rem; color: #64748b; margin-top: 4px; }}
        .header {{ display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; border-bottom: 1px solid #334155; padding-bottom: 16px; margin-bottom: 24px; gap: 16px; }}
        .btn {{ background-color: #0284c7; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; font-size: 0.875rem; }}
        .btn:hover {{ background-color: #0369a1; }}
        .btn-secondary {{ background-color: #334155; }}
        .btn-secondary:hover {{ background-color: #475569; }}
        .badge {{ display: inline-block; padding: 2px 8px; border-radius: 9999px; font-size: 0.7rem; font-weight: 600; }}
        .badge-tp {{ background: #064e3b; color: #34d399; }}
        .badge-fn {{ background: #7f1d1d; color: #f87171; }}
        .badge-fp {{ background: #78350f; color: #fbbf24; }}
        .badge-tn {{ background: #1e293b; color: #94a3b8; border: 1px solid #475569; }}
        table {{ width: 100%; border-collapse: collapse; text-align: left; }}
        th {{ background-color: #0f172a; color: #94a3b8; font-weight: 600; font-size: 0.75rem; text-transform: uppercase; padding: 10px 12px; }}
        td {{ padding: 10px 12px; font-size: 0.85rem; }}
        .chart-container {{ display: flex; flex-wrap: wrap; gap: 24px; align-items: center; justify-content: center; }}
        @media print {{
            body {{ background: white !important; color: black !important; padding: 0 !important; }}
            .card {{ border: 1px solid #ccc !important; background: white !important; color: black !important; }}
            .btn, #filter-bar {{ display: none !important; }}
            .kpi-box {{ border: 1px solid #ddd !important; background: white !important; }}
            .kpi-val {{ color: #0284c7 !important; }}
            th {{ background: #f1f5f9 !important; color: #334155 !important; }}
        }}
    </style>
</head>
<body>
    <div class="max-w-7xl">
        <!-- Header -->
        <div class="header">
            <div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="font-size: 2rem;">🕶️</span>
                    <div>
                        <h1 style="font-size: 1.5rem; font-weight: 800; color: #f8fafc;">{report_heading}</h1>
                        <p style="color: #94a3b8; font-size: 0.85rem;">Suite: {session_meta.get('suite_name', 'Hotword Suite')} • Session: {session_meta.get('session_id', 'N/A')}</p>
                    </div>
                </div>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn btn-secondary" onclick="window.print()">🖨️ Print / Save PDF</button>
                <a class="btn" href="{session_meta.get('session_id', 'session')}.csv" download>📥 Standard CSV</a>
                <a class="btn" style="background: #2563eb;" href="{session_meta.get('session_id', 'session')}_benchmark.csv" download>📊 Detailed Benchmark CSV</a>
                <a class="btn" style="background: #059669;" href="{session_meta.get('session_id', 'session')}_benchmark_report.md" download>📝 Benchmark Report (MD)</a>
                <a class="btn" style="background: #0891b2;" href="/api/export/first30_audio?session_id={session_meta.get('session_id', 'session')}" download>🎯 First 30 Trials Audio</a>
                <a class="btn" style="background: #ea580c;" href="/api/export/batch_audio?session_id={session_meta.get('session_id', 'session')}" download>🎙️ Batch Audio (Full Session)</a>
                <a class="btn" style="background: #7c3aed;" href="/api/export/package_zip?session_id={session_meta.get('session_id', 'session')}" download>📦 Complete Study Package (ZIP)</a>
            </div>
        </div>

        <!-- Meta Bar -->
        <div style="background-color: #1e293b; border-radius: 8px; padding: 12px 18px; margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 20px; font-size: 0.825rem; color: #cbd5e1; border: 1px solid #334155;">
            <div><strong>Participant:</strong> {session_meta.get('participant_id', 'Anonymous')}</div>
            <div><strong>Mode:</strong> <span style="color: #38bdf8; font-weight: 600;">{mode_badge}</span></div>
            <div><strong>Telemetry Source:</strong> <span style="color: #38bdf8; text-transform: uppercase;">{session_meta.get('telemetry_source', 'Live ADB')}</span></div>
            <div><strong>Start Time:</strong> {session_meta.get('start_time_iso', '—')[:19].replace('T', ' ')} UTC</div>
            <div><strong>End Time:</strong> {session_meta.get('end_time_iso', '—')[:19].replace('T', ' ')} UTC</div>
        </div>

        <!-- Dynamic KPI Cards -->
        {kpi_html}

        <!-- Middle Section (Acoustic Noise Environment Breakdown for Wearer, or Polar Chart for Bystander) -->
        {middle_section_html}

        <!-- Factor 2: Vocal Effort / Tone Latency & Sensitivity Breakdown -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 16px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                🗣️ Factor 2: Vocal Effort / Tone — Latency & Sensitivity Breakdown
            </h2>
            <div class="chart-container" style="align-items: stretch;">
                <div style="flex: 0.85; min-width: 280px; background-color: #0f172a; border-radius: 12px; padding: 18px; border: 1px solid #334155; display: flex; flex-direction: column; justify-content: center;">
                    <h4 style="font-size: 0.82rem; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 14px; letter-spacing: 0.05em;">Median S2T Latency & Recall by Vocal Effort</h4>
                    {vocal_bar_items}
                    <p style="text-align: center; color: #64748b; font-size: 0.73rem; margin-top: 10px;">
                        S2T = Speech Onset to Device Trigger • E2E = Prompt to AI Response
                    </p>
                </div>
                <div style="flex: 1.55; min-width: 420px; overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Vocal Effort</th>
                                <th>Trials</th>
                                <th>TP</th>
                                <th>FN</th>
                                <th>Trigger Rate</th>
                                <th>Mean S2T</th>
                                <th>Median S2T</th>
                                <th>P90 S2T</th>
                                <th>Min–Max S2T</th>
                                <th>Median E2E</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vocal_table_rows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Factor 3: Hotword Phrase Latency & Confusion Matrix Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(420px, 1fr)); gap: 20px; margin-bottom: 24px;">
            <!-- Hotword Phrase Breakdown -->
            <div class="card">
                <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px;">🎙️ Factor 3: Hotword Phrase — Latency & Sensitivity</h3>
                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Hotword Phrase</th>
                                <th>Trials</th>
                                <th>TP</th>
                                <th>FN</th>
                                <th>Trigger Rate</th>
                                <th>Mean S2T</th>
                                <th>Median S2T</th>
                                <th>P90 S2T</th>
                                <th>Min–Max S2T</th>
                                <th>Median E2E</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotword_table_rows}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Confusion Matrix -->
            <div class="card">
                <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 12px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px;">🎯 Confusion Matrix (Intended vs Detected)</h3>
                <div style="overflow-x: auto;">
                    <table>
                        <thead>
                            <tr>
                                <th>Target \\ Detected</th>
                                {cm_headers_html}
                            </tr>
                        </thead>
                        <tbody>
                            {cm_rows_html}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Factor 4: Cross-Factor Interaction (Noise Condition x Vocal Effort) -->
        <div class="card" style="margin-bottom: 24px;">
            <h2 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 12px; color: #f8fafc; border-bottom: 1px solid #334155; padding-bottom: 8px;">
                🔀 Factor 4: Cross-Factor Interaction (Noise Condition × Vocal Effort) — Latency & Trigger Rate
            </h2>
            <div style="overflow-x: auto;">
                <table>
                    <thead>
                        <tr>
                            <th>Noise Condition</th>
                            <th>Vocal Effort</th>
                            <th>Trials</th>
                            <th>TP</th>
                            <th>FN</th>
                            <th>Trigger Rate</th>
                            <th>Mean S2T</th>
                            <th>Median S2T</th>
                            <th>P90 S2T</th>
                            <th>Min–Max S2T</th>
                            <th>Median E2E</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cross_factor_rows}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- First 30 Trials Dedicated Audio Recording Card -->
        <div class="card" id="first30-recording-card" style="margin-bottom: 20px; border: 1px solid rgba(14, 165, 233, 0.5); background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 12px; border-bottom: 1px solid #334155; padding-bottom: 10px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #0ea5e9; box-shadow: 0 0 8px #0ea5e9;"></span>
                        <h3 style="font-size: 1.1rem; font-weight: 700; color: #f8fafc; margin: 0;">🎯 First 30 Trials Audio Recording (T001–T030 Dedicated File)</h3>
                        <span class="badge" style="background: rgba(14, 165, 233, 0.15); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.4);">{first30_size_str}</span>
                    </div>
                    <p style="font-size: 0.78rem; color: #94a3b8; margin-top: 3px;">
                        Dedicated standalone audio file containing exclusively the first 30 trials (<code>{sid_val}_first_30_trials.webm</code>), saved alongside the full-session recording and individual per-trial clips.
                    </p>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <a class="btn" style="background: #0891b2; font-size: 0.8rem; padding: 6px 14px;" href="{clean_first30_path}" download>💾 Download First 30 Trials (.webm)</a>
                    <a class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 14px;" href="/api/export/first30_audio?session_id={sid_val}" download>📥 Download via Server API</a>
                </div>
            </div>
            <div style="background: #0b1120; border: 1px solid #334155; border-radius: 8px; padding: 12px 16px;">
                <audio id="first30-session-audio" controls preload="metadata" style="width: 100%; height: 38px;">
                    <source src="{sid_val}_first_30_trials.webm" type="audio/webm">
                    <source src="{clean_first30_path}" type="audio/webm">
                    <source src="/data/{clean_first30_path}" type="audio/webm">
                    <source src="/api/export/first30_audio?session_id={sid_val}" type="audio/webm">
                </audio>
            </div>
        </div>

        <!-- Full-Session Continuous Batch Audio Recording Card -->
        <div class="card" id="batch-recording-card" style="margin-bottom: 24px; border: 1px solid rgba(249, 115, 22, 0.45); background: linear-gradient(145deg, #1e293b 0%, #0f172a 100%);">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 14px; border-bottom: 1px solid #334155; padding-bottom: 10px;">
                <div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: #f97316; box-shadow: 0 0 8px #f97316;"></span>
                        <h3 style="font-size: 1.1rem; font-weight: 700; color: #f8fafc; margin: 0;">🎙️ Batch Recording — Full Continuous Session Audio (Start-to-Finish)</h3>
                        <span class="badge" style="background: rgba(249, 115, 22, 0.15); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.4);">{batch_size_str}</span>
                    </div>
                    <p style="font-size: 0.78rem; color: #94a3b8; margin-top: 3px;">
                        Uninterrupted master recording from session start until all trials are completed, captured alongside individual per-trial audio clips below.
                    </p>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <a class="btn" style="background: #ea580c; font-size: 0.8rem; padding: 6px 14px;" href="{clean_batch_path}" download>💾 Download Batch Audio (.webm)</a>
                    <a class="btn btn-secondary" style="font-size: 0.8rem; padding: 6px 14px;" href="/api/export/batch_audio?session_id={sid_val}" download>📥 Download via Server API</a>
                </div>
            </div>
            <div style="background: #0b1120; border: 1px solid #334155; border-radius: 8px; padding: 12px 16px; margin-bottom: 12px;">
                <audio id="batch-session-audio" controls preload="metadata" style="width: 100%; height: 38px;">
                    <source src="{sid_val}_batch_full_session.webm" type="audio/webm">
                    <source src="{clean_batch_path}" type="audio/webm">
                    <source src="/data/{clean_batch_path}" type="audio/webm">
                    <source src="/api/export/batch_audio?session_id={sid_val}" type="audio/webm">
                </audio>
            </div>
            <div>
                <div style="font-size: 0.74rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 6px;">
                    ⏱️ Quick-Jump Trial Markers in Full-Session Batch Audio:
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 6px; max-height: 110px; overflow-y: auto; padding: 4px 0;">
                    {batch_timeline_pills_html}
                </div>
            </div>
        </div>

        <!-- Trial Explorer -->
        <div class="card">
            <div style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; margin-bottom: 16px; gap: 12px;">
                <div>
                    <h3 style="font-size: 1.1rem; font-weight: 700; color: #f8fafc; margin: 0;">📋 Trial-by-Trial Evaluation Log</h3>
                    <span id="trials-count-badge" style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">Showing 0 of 0 trials</span>
                </div>
                <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
                    <input type="text" id="trial-search-input" placeholder="🔍 Search trial, phrase, condition..." oninput="onSearchTrials(this.value)" style="background: #0f172a; border: 1px solid #334155; border-radius: 6px; padding: 5px 12px; color: #fff; font-size: 0.78rem; outline: none; width: 220px;">
                    <div id="filter-bar" style="display: flex; gap: 6px; flex-wrap: wrap;">
                        <button class="btn btn-secondary" id="btn-filter-ALL" onclick="filterTrials('ALL')" style="font-size: 0.75rem; padding: 4px 10px;">All</button>
                        <button class="btn btn-secondary" id="btn-filter-TRUE_POSITIVE" onclick="filterTrials('TRUE_POSITIVE')" style="font-size: 0.75rem; padding: 4px 10px; color: #34d399;">True Positives</button>
                        <button class="btn btn-secondary" id="btn-filter-FALSE_NEGATIVE" onclick="filterTrials('FALSE_NEGATIVE')" style="font-size: 0.75rem; padding: 4px 10px; color: #f87171;">False Negatives</button>
                        <button class="btn btn-secondary" id="btn-filter-FALSE_POSITIVE" onclick="filterTrials('FALSE_POSITIVE')" style="font-size: 0.75rem; padding: 4px 10px; color: #fbbf24;">False Positives</button>
                        <button class="btn btn-secondary" id="btn-filter-TRUE_NEGATIVE" onclick="filterTrials('TRUE_NEGATIVE')" style="font-size: 0.75rem; padding: 4px 10px; color: #94a3b8;">True Negatives</button>
                    </div>
                </div>
            </div>

            <!-- Visual Acoustic Timeline Legend -->
            <div style="display:flex; flex-wrap:wrap; align-items:center; gap:14px; background:#0b1120; border:1px solid #1e293b; border-radius:8px; padding:7px 12px; margin-bottom:10px; font-size:0.74rem; color:#cbd5e1;">
                <span style="font-weight:700; color:#94a3b8; text-transform:uppercase; letter-spacing:0.04em;">Waveform Timeline Markers:</span>
                <span style="display:inline-flex; align-items:center; gap:5px;"><span style="display:inline-block; width:12px; height:10px; background:rgba(56,189,248,0.28); border-left:2px solid #38bdf8; border-right:1.5px dashed #38bdf8;"></span> <strong style="color:#38bdf8;">🗣️ Hotword Speech</strong> (Onset &rarr; End)</span>
                <span style="display:inline-flex; align-items:center; gap:5px;"><span style="display:inline-block; width:14px; height:0; border-top:2px dashed #fbbf24;"></span> <strong style="color:#fbbf24;">+ms Latency</strong> (Hotword End &rarr; Earcon)</span>
                <span style="display:inline-flex; align-items:center; gap:5px;"><span style="display:inline-block; width:3px; height:11px; background:#34d399; box-shadow:0 0 6px #34d399;"></span> <strong style="color:#34d399;">🔔 Glasses Earcon Onset</strong></span>
                <span style="display:inline-flex; align-items:center; gap:5px;"><span style="display:inline-block; width:2px; height:11px; background:#f43f5e;"></span> <span style="color:#94a3b8;">Playhead (Click waveform to seek)</span></span>
            </div>

            <div style="overflow-x: auto; max-height: 560px; overflow-y: auto; border: 1px solid rgba(51, 65, 85, 0.4); border-radius: 8px;">
                <table id="trials-table">
                    <thead>
                        <tr>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Trial</th>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Condition</th>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Target Hotword</th>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Spoken Transcript</th>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Invocation Status</th>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Latency</th>
                            <th style="position: sticky; top: 0; background: #0f172a; z-index: 10;">Audio (Per-Trial & Batch)</th>
                        </tr>
                    </thead>
                    <tbody id="trials-tbody">
                        <!-- Populated by JS -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Expandable Raw Telemetry & ADB Logcat Execution Log -->
        <div class="card" style="margin-top: 16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; cursor:pointer;" onclick="toggleTerminalLog()">
                <div>
                    <h3 style="font-size: 1rem; font-weight: 700; color: #f8fafc; margin: 0;">📟 Raw Session & ADB Telemetry Execution Log</h3>
                    <p style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">Chronological timeline of all trial triggers, voice detection, and audio saves.</p>
                </div>
                <button class="btn btn-secondary" id="terminal-toggle-btn" style="font-size: 0.75rem; padding: 4px 10px;">▼ View Raw Logs ({len(aligned_rows)})</button>
            </div>
            <div id="terminal-log-container" style="display:none; margin-top: 12px; background: #050811; border: 1px solid #1e293b; border-radius: 6px; padding: 12px; font-family: monospace; font-size: 0.74rem; max-height: 280px; overflow-y: auto; color: #cbd5e1; line-height: 1.6;">
                {terminal_logs_html}
            </div>
        </div>

        <p style="text-align: center; color: #64748b; font-size: 0.75rem; margin-top: 30px;">
            Generated by Smart Glasses Wearer & Hotword Automated Testbed • Google DeepMind & Project XR Glasses
        </p>
    </div>

    <script>
        const trialsData = {json_rows_safe};
        let activeFilter = 'ALL';
        let searchQuery = '';

        function toggleTerminalLog() {{
            const box = document.getElementById('terminal-log-container');
            const btn = document.getElementById('terminal-toggle-btn');
            if (!box) return;
            if (box.style.display === 'none' || !box.style.display) {{
                box.style.display = 'block';
                if (btn) btn.textContent = '▲ Hide Raw Logs';
            }} else {{
                box.style.display = 'none';
                if (btn) btn.textContent = '▼ View Raw Logs ({len(aligned_rows)})';
            }}
        }}

        function onSearchTrials(query) {{
            searchQuery = (query || '').toLowerCase().trim();
            applyFilterAndSearch();
        }}

        function filterTrials(type) {{
            activeFilter = type;
            document.querySelectorAll('#filter-bar button').forEach(b => b.classList.remove('active'));
            const activeBtn = document.getElementById('btn-filter-' + type);
            if (activeBtn) activeBtn.classList.add('active');
            applyFilterAndSearch();
        }}

        function applyFilterAndSearch() {{
            let filtered = trialsData;
            if (activeFilter !== 'ALL') {{
                filtered = filtered.filter(r => r.classification === activeFilter);
            }}
            if (searchQuery) {{
                filtered = filtered.filter(r => {{
                    const s = [r.trial_id, r.condition, r.phrase, r.spoken_transcript, r.target_hotword, r.response_outcome, r.classification].join(' ').toLowerCase();
                    return s.includes(searchQuery);
                }});
            }}
            renderTable(filtered);
        }}

        function seekAudio(audioId, sec) {{
            const aud = document.getElementById(audioId);
            if (aud) {{
                aud.currentTime = Math.max(0, sec);
                aud.play().catch(e => console.warn(e));
            }}
        }}

        function seekTimelineClick(event, audioId, defaultMaxDur) {{
            const bar = event.currentTarget;
            const aud = document.getElementById(audioId);
            if (!bar || !aud) return;
            const rect = bar.getBoundingClientRect();
            const ratio = Math.max(0, Math.min(1, (event.clientX - rect.left) / Math.max(1, rect.width)));
            const dsDur = bar.dataset && bar.dataset.duration ? parseFloat(bar.dataset.duration) : 0;
            const dur = (aud.duration && isFinite(aud.duration) && aud.duration > 0.5)
                ? aud.duration
                : (dsDur > 0.5 ? dsDur : defaultMaxDur);
            aud.currentTime = ratio * dur;
            aud.play().catch(e => console.warn(e));
        }}

        function updateTimelineDomPositions(audId, onsetS, endS, earconS, dur) {{
            if (!dur || !isFinite(dur) || dur <= 0.2) return;
            const wrap = document.getElementById('tl_' + audId);
            if (!wrap) return;
            wrap.dataset.duration = dur.toFixed(3);
            const durLbl = document.getElementById('tldur_' + audId);
            if (durLbl) durLbl.textContent = dur.toFixed(2) + 's';

            const hwBox = document.getElementById('tlhw_' + audId);
            if (hwBox && onsetS > 0) {{
                const leftPct = Math.min(96, Math.max(0, (onsetS / dur) * 100));
                const widthPct = Math.min(100 - leftPct, Math.max(2.5, ((Math.max(endS, onsetS + 0.25) - onsetS) / dur) * 100));
                hwBox.style.left = leftPct.toFixed(2) + '%';
                hwBox.style.width = widthPct.toFixed(2) + '%';
            }}

            const gapBox = document.getElementById('tlgap_' + audId);
            if (gapBox && earconS && endS && earconS > endS) {{
                const gapLeft = Math.min(96, Math.max(0, (endS / dur) * 100));
                const gapWidth = Math.min(100 - gapLeft, Math.max(1.5, ((earconS - endS) / dur) * 100));
                gapBox.style.left = gapLeft.toFixed(2) + '%';
                gapBox.style.width = gapWidth.toFixed(2) + '%';
            }}

            const ecPin = document.getElementById('tlec_' + audId);
            if (ecPin && earconS) {{
                const ecLeft = Math.min(98.5, Math.max(0, (earconS / dur) * 100));
                ecPin.style.left = ecLeft.toFixed(2) + '%';
            }}

            const ecZone = document.getElementById('tleczone_' + audId);
            if (ecZone && earconS) {{
                const ecLeft = Math.min(97, Math.max(0, (earconS / dur) * 100));
                const ecWidth = Math.min(100 - ecLeft, Math.max(2.0, (0.38 / dur) * 100));
                ecZone.style.left = ecLeft.toFixed(2) + '%';
                ecZone.style.width = ecWidth.toFixed(2) + '%';
            }}
        }}

        function updateTimelineScale(audioEl, audId, onsetS, endS, earconS, defaultMaxDur) {{
            const wrap = document.getElementById('tl_' + audId);
            const dsDur = (wrap && wrap.dataset && wrap.dataset.duration) ? parseFloat(wrap.dataset.duration) : 0;
            const dur = (audioEl && audioEl.duration && isFinite(audioEl.duration) && audioEl.duration > 0.5)
                ? audioEl.duration
                : (dsDur > 0.5 ? dsDur : defaultMaxDur);
            updateTimelineDomPositions(audId, onsetS, endS, earconS, dur);
            drawTrialWaveformCanvas(audId, onsetS, endS, earconS, dur);
        }}

        function syncPlayhead(audioEl, audId, defaultMaxDur) {{
            const head = document.getElementById('tlhead_' + audId);
            const wrap = document.getElementById('tl_' + audId);
            if (!head || !audioEl) return;
            const dur = (audioEl.duration && isFinite(audioEl.duration) && audioEl.duration > 0.5)
                ? audioEl.duration
                : (wrap && wrap.dataset.duration ? parseFloat(wrap.dataset.duration) : defaultMaxDur);
            const pct = Math.max(0, Math.min(100, (audioEl.currentTime / Math.max(0.1, dur)) * 100));
            head.style.left = pct.toFixed(2) + '%';
            head.style.opacity = (audioEl.currentTime > 0 || !audioEl.paused) ? '1' : '0.45';
            if (!audioEl.paused) {{
                requestAnimationFrame(() => syncPlayhead(audioEl, audId, defaultMaxDur));
            }}
        }}

        const waveformCache = {{}};
        let sharedDecodeCtx = null;

        function drawSyntheticEnvelope(ctx, w, h, onsetS, endS, earconS, dur) {{
            ctx.clearRect(0, 0, w, h);
            const nBars = 72;
            const barW = Math.max(2, (w / nBars) - 1.5);
            const midY = h / 2;
            for (let i = 0; i < nBars; i++) {{
                const t = ((i + 0.5) / nBars) * dur;
                const isHw = (onsetS > 0 && t >= onsetS && t <= Math.max(endS, onsetS + 0.35));
                const isEc = (earconS && t >= earconS && t <= earconS + 0.38);
                let amp = 0.14 + 0.06 * Math.sin(i * 1.7);
                if (isHw) {{
                    const rel = (t - onsetS) / Math.max(0.15, endS - onsetS);
                    amp = 0.48 + 0.42 * Math.sin(rel * Math.PI) * (0.75 + 0.25 * Math.cos(i * 2.3));
                    ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
                }} else if (isEc) {{
                    const rel = (t - earconS) / 0.38;
                    amp = Math.max(0.22, 0.88 * Math.exp(-rel * 2.6));
                    ctx.fillStyle = 'rgba(52, 211, 153, 0.95)';
                }} else {{
                    ctx.fillStyle = 'rgba(100, 116, 139, 0.35)';
                }}
                const bh = Math.max(2, amp * (h - 6));
                const x = i * (w / nBars);
                ctx.fillRect(x, midY - bh / 2, barW, bh);
            }}
        }}

        async function drawTrialWaveformCanvas(audId, onsetS, endS, earconS, fallbackDur) {{
            const canvas = document.getElementById('tlwf_' + audId);
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;
            const srcUrl = canvas.dataset.src;

            // Draw immediate stylized envelope first so UI is instant
            drawSyntheticEnvelope(ctx, w, h, onsetS, endS, earconS, fallbackDur);

            if (!srcUrl || window.location.protocol === 'file:') return;
            try {{
                let peaks = waveformCache[srcUrl];
                if (!peaks) {{
                    const resp = await fetch(srcUrl);
                    if (!resp.ok) return;
                    const buf = await resp.arrayBuffer();
                    const Ctx = window.AudioContext || window.webkitAudioContext;
                    if (!Ctx) return;
                    if (!sharedDecodeCtx || sharedDecodeCtx.state === 'closed') {{
                        sharedDecodeCtx = new Ctx();
                    }}
                    const audioBuf = await sharedDecodeCtx.decodeAudioData(buf.slice(0));
                    const ch = audioBuf.getChannelData(0);
                    const nBars = 80;
                    const step = Math.max(1, Math.floor(ch.length / nBars));
                    const arr = [];
                    let maxP = 0.01;
                    for (let i = 0; i < nBars; i++) {{
                        let sum = 0;
                        const start = i * step;
                        const limit = Math.min(ch.length, start + step);
                        for (let j = start; j < limit; j++) {{
                            const v = Math.abs(ch[j]);
                            if (v > sum) sum = v;
                        }}
                        arr.push(sum);
                        if (sum > maxP) maxP = sum;
                    }}
                    peaks = {{ values: arr.map(v => v / maxP), duration: audioBuf.duration }};
                    waveformCache[srcUrl] = peaks;
                }}

                if (peaks && peaks.values) {{
                    const dur = (peaks.duration && isFinite(peaks.duration) && peaks.duration > 0.2) ? peaks.duration : fallbackDur;
                    // Synchronize DOM markers (#tlec_, #tlhw_, #tlgap_) with exact decoded audio duration!
                    updateTimelineDomPositions(audId, onsetS, endS, earconS, dur);

                    ctx.clearRect(0, 0, w, h);
                    const nBars = peaks.values.length;
                    const barW = Math.max(2, (w / nBars) - 1.2);
                    const midY = h / 2;
                    for (let i = 0; i < nBars; i++) {{
                        const t = ((i + 0.5) / nBars) * dur;
                        const isHw = (onsetS > 0 && t >= (onsetS - 0.03) && t <= (Math.max(endS, onsetS + 0.3) + 0.03));
                        const isEc = (earconS && t >= (earconS - 0.02) && t <= (earconS + 0.38));
                        if (isHw) {{
                            ctx.fillStyle = '#38bdf8';
                        }} else if (isEc) {{
                            ctx.fillStyle = '#34d399';
                        }} else {{
                            ctx.fillStyle = 'rgba(100, 116, 139, 0.42)';
                        }}
                        const amp = Math.max(0.08, Math.min(1.0, Math.pow(peaks.values[i], 0.75)));
                        const bh = Math.max(2, amp * (h - 6));
                        const x = i * (w / nBars);
                        ctx.fillRect(x, midY - bh / 2, barW, bh);
                    }}
                }}
            }} catch (e) {{
                // Keep stylized envelope if fetch/decode fails
            }}
        }}

        function seekBatchAudio(sec) {{
            const batchAud = document.getElementById('batch-session-audio');
            if (batchAud) {{
                batchAud.currentTime = Math.max(0, sec);
                batchAud.play().catch(e => console.warn(e));
                batchAud.scrollIntoView({{ behavior: 'smooth', block: 'center' }});
            }}
        }}

        function renderTable(data) {{
            const badge = document.getElementById('trials-count-badge');
            if (badge) badge.textContent = `Showing ${{data.length}} of ${{trialsData.length}} trials (with per-trial & full-session batch 48 kHz audio)`;
            const tbody = document.getElementById('trials-tbody');
            if (!tbody) return;
            tbody.innerHTML = data.map(r => {{
                let outcomeLabel = r.response_outcome || r.classification || '—';
                let outcomeStyle = 'badge-tn';
                if (r.response_outcome === 'ACTIVATED_ANSWERED_QUERY' || r.classification === 'TRUE_POSITIVE') {{
                    outcomeStyle = 'badge-tp';
                    outcomeLabel = '🟢 INVOKED (Answered)';
                }} else if (r.response_outcome === 'ACTIVATED_NO_ANSWER') {{
                    outcomeStyle = 'badge-fp';
                    outcomeLabel = '🔵 INVOKED (No Answer)';
                }} else if (r.response_outcome === 'STAYED_ASLEEP' || r.classification === 'FALSE_NEGATIVE') {{
                    outcomeStyle = 'badge-fn';
                    outcomeLabel = '🔴 STAYED ASLEEP';
                }} else if (r.classification === 'TRUE_NEGATIVE') {{
                    outcomeStyle = 'badge-tn';
                    outcomeLabel = '⚪ REJECTED DISTRACTOR';
                }}

                const earconLatMs = (r.earcon_latency_ms !== undefined && r.earcon_latency_ms !== null)
                    ? Number(r.earcon_latency_ms)
                    : ((r.audio_to_trigger_delta_ms !== undefined && r.audio_to_trigger_delta_ms !== null) ? Number(r.audio_to_trigger_delta_ms) : null);

                const onsetMs = (r.prompt_to_audio_delta_ms && r.prompt_to_audio_delta_ms > 0) ? Number(r.prompt_to_audio_delta_ms) : 0;
                const earconOnsetMs = (r.earcon_onset_offset_ms && r.earcon_onset_offset_ms > 0)
                    ? Number(r.earcon_onset_offset_ms)
                    : ((r.total_latency_delta_ms && r.total_latency_delta_ms > 0) ? Number(r.total_latency_delta_ms) : null);
                const speechEndMs = (r.speech_end_offset_ms && r.speech_end_offset_ms > 0)
                    ? Number(r.speech_end_offset_ms)
                    : ((earconOnsetMs && earconLatMs !== null && earconOnsetMs > earconLatMs)
                        ? (earconOnsetMs - earconLatMs)
                        : (onsetMs > 0 ? onsetMs + 520 : 0));

                const onsetSecNum = onsetMs > 0 ? (onsetMs / 1000) : 0;
                const speechEndSecNum = speechEndMs > 0 ? (speechEndMs / 1000) : (onsetSecNum > 0 ? onsetSecNum + 0.52 : 0);
                const earconSecNum = earconOnsetMs ? (earconOnsetMs / 1000) : null;

                const latHtml = earconLatMs !== null
                    ? `<div style="font-weight:700; color:#fbbf24; font-family:monospace; font-size:0.9rem;">${{earconLatMs}} ms</div>` +
                      (earconSecNum ? `<div style="font-size:0.68rem; color:#64748b; font-family:monospace; margin-top:2px;">🗣️ ${{speechEndSecNum.toFixed(2)}}s &rarr; 🔔 ${{earconSecNum.toFixed(2)}}s</div>` : '')
                    : '<span style="color:#64748b;">—</span>';

                const spokenText = r.spoken_transcript || r.phrase || '—';
                const targetText = r.prompt_text ? `<strong style="color:#38bdf8;">${{r.target_hotword || ''}}</strong><span style="display:block; color:#64748b; font-size:0.75rem; margin-top:2px;">${{r.prompt_text}}</span>` : (r.target_hotword || '—');
                
                let batchSeekBtn = '';
                if (r.batch_offset_sec !== null && r.batch_offset_sec !== undefined && r.batch_offset_sec !== '') {{
                    const bSec = Number(r.batch_offset_sec);
                    const bMin = Math.floor(bSec / 60);
                    const bRem = Math.floor(bSec % 60).toString().padStart(2, '0');
                    batchSeekBtn = `<button onclick="seekBatchAudio(${{bSec.toFixed(2)}})" title="Jump to this trial (${{bMin}}:${{bRem}}) in the Full-Session Batch Recording" style="background:rgba(249,115,22,0.15); border:1px solid #f97316; color:#fb923c; border-radius:4px; font-size:0.68rem; padding:2px 6px; cursor:pointer;">🎙️ Batch @ ${{bMin}}:${{bRem}}</button>`;
                }}

                let audioHtml = batchSeekBtn || '<span style="color:#64748b; font-size:0.75rem;">—</span>';
                if (r.audio_file) {{
                    const audId = 'aud_' + (r.trial_id || Math.random().toString(36).substr(2, 5));
                    const onsetSec = onsetSecNum.toFixed(2);
                    const speechEndSec = speechEndSecNum.toFixed(2);
                    const triggerSec = earconSecNum ? earconSecNum.toFixed(2) : null;
                    const knownDur = (r.audio_duration_sec && Number(r.audio_duration_sec) > 0.5) ? Number(r.audio_duration_sec) : null;
                    const defaultMaxDur = knownDur || Math.max(4.8, (earconSecNum || speechEndSecNum || 3.0) + 1.6);

                    const hwLeftPct = onsetSecNum > 0 ? Math.min(95, (onsetSecNum / defaultMaxDur) * 100) : 0;
                    const hwWidthPct = onsetSecNum > 0 ? Math.min(100 - hwLeftPct, Math.max(3, ((Math.max(speechEndSecNum, onsetSecNum + 0.25) - onsetSecNum) / defaultMaxDur) * 100)) : 0;
                    const gapLeftPct = (earconSecNum && speechEndSecNum) ? Math.min(95, (speechEndSecNum / defaultMaxDur) * 100) : 0;
                    const gapWidthPct = (earconSecNum && speechEndSecNum && earconSecNum > speechEndSecNum) ? Math.min(100 - gapLeftPct, Math.max(2, ((earconSecNum - speechEndSecNum) / defaultMaxDur) * 100)) : 0;
                    const ecLeftPct = earconSecNum ? Math.min(98, (earconSecNum / defaultMaxDur) * 100) : 0;
                    const ecZoneWidthPct = earconSecNum ? Math.min(100 - ecLeftPct, Math.max(2.5, (0.38 / defaultMaxDur) * 100)) : 0;

                    let seekBtns = '';
                    if (triggerSec) {{
                        seekBtns = `
                            <button onclick="seekAudio('${{audId}}', ${{onsetSec}})" title="Seek to Hotword speech window (${{onsetSec}}s – ${{speechEndSec}}s)" style="background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; border-radius:4px; font-size:0.68rem; padding:2px 6px; cursor:pointer; font-weight:600;">🗣️ Hotword ${{onsetSec}}s–${{speechEndSec}}s</button>
                            <button onclick="seekAudio('${{audId}}', ${{triggerSec}})" title="Seek to XR Glasses Hotword Wake-Up Earcon chime onset (${{triggerSec}}s)" style="background:rgba(52,211,153,0.18); border:1px solid #34d399; color:#34d399; border-radius:4px; font-size:0.68rem; padding:2px 6px; cursor:pointer; font-weight:700;">🔔 Earcon ${{triggerSec}}s</button>
                        `;
                    }} else if (onsetSecNum > 0) {{
                        seekBtns = `
                            <button onclick="seekAudio('${{audId}}', ${{onsetSec}})" title="Seek to Hotword speech window (${{onsetSec}}s – ${{speechEndSec}}s)" style="background:rgba(56,189,248,0.15); border:1px solid #38bdf8; color:#38bdf8; border-radius:4px; font-size:0.68rem; padding:2px 6px; cursor:pointer; font-weight:600;">🗣️ Hotword ${{onsetSec}}s–${{speechEndSec}}s</button>
                        `;
                    }}

                    const cleanAudioPath = (r.audio_file || '').replace(/^[/]?data[/]/, '');
                    const isWav = cleanAudioPath.toLowerCase().endsWith('.wav');
                    const mimeType = isWav ? 'audio/wav' : 'audio/webm';

                    const visualTimelineHtml = `
                        <div id="tl_${{audId}}" data-duration="${{defaultMaxDur.toFixed(3)}}" onclick="seekTimelineClick(event, '${{audId}}', ${{defaultMaxDur.toFixed(3)}})" title="Click anywhere on the waveform timeline to seek audio (🗣️ Blue = Hotword Speech, ⚡ Amber = Latency Delta, 🔔 Green = XR Glasses Glasses Earcon)" style="position:relative; width:100%; min-width:290px; max-width:390px; height:34px; background:#070b14; border:1px solid #334155; border-radius:6px; margin-top:5px; overflow:hidden; cursor:pointer; user-select:none;">
                            <canvas id="tlwf_${{audId}}" width="340" height="34" data-src="${{cleanAudioPath}}" style="position:absolute; inset:0; width:100%; height:100%; pointer-events:none;"></canvas>

                            ${{onsetSecNum > 0 ? `
                            <div id="tlhw_${{audId}}" style="position:absolute; top:0; bottom:0; left:${{hwLeftPct.toFixed(2)}}%; width:${{hwWidthPct.toFixed(2)}}%; background:rgba(56,189,248,0.20); border-left:2px solid #38bdf8; border-right:1.5px dashed rgba(56,189,248,0.85); pointer-events:none;">
                                <span style="position:absolute; top:1px; left:3px; font-size:0.58rem; font-family:monospace; font-weight:700; color:#bae6fd; white-space:nowrap; text-shadow:0 1px 2px #000;">🗣️ ${{onsetSec}}s</span>
                            </div>` : ''}}

                            ${{(earconSecNum && speechEndSecNum && earconSecNum > speechEndSecNum) ? `
                            <div id="tlgap_${{audId}}" style="position:absolute; top:50%; left:${{gapLeftPct.toFixed(2)}}%; width:${{gapWidthPct.toFixed(2)}}%; height:0; border-top:1.5px dashed #fbbf24; pointer-events:none; display:flex; justify-content:center; align-items:center;">
                                <span style="background:rgba(15,23,42,0.92); border:1px solid rgba(251,191,36,0.65); color:#fbbf24; font-size:0.56rem; font-family:monospace; font-weight:700; padding:0 3px; border-radius:3px; transform:translateY(-1px); white-space:nowrap;">+${{earconLatMs}}ms</span>
                            </div>` : ''}}

                            ${{earconSecNum ? `
                            <div id="tleczone_${{audId}}" style="position:absolute; top:0; bottom:0; left:${{ecLeftPct.toFixed(2)}}%; width:${{ecZoneWidthPct.toFixed(2)}}%; background:rgba(52,211,153,0.18); pointer-events:none;"></div>
                            <div id="tlec_${{audId}}" style="position:absolute; top:0; bottom:0; left:${{ecLeftPct.toFixed(2)}}%; width:2px; background:#34d399; box-shadow:0 0 8px #34d399; pointer-events:none;">
                                <span style="position:absolute; bottom:1px; left:3px; font-size:0.58rem; font-family:monospace; font-weight:800; color:#6ee7b7; white-space:nowrap; text-shadow:0 1px 2px #000;">🔔 ${{triggerSec}}s</span>
                            </div>` : ''}}

                            <div id="tlhead_${{audId}}" style="position:absolute; top:0; bottom:0; left:0%; width:2px; background:#f43f5e; box-shadow:0 0 6px #f43f5e; opacity:0.45; pointer-events:none; transition:left 0.05s linear;"></div>
                            <span id="tldur_${{audId}}" style="position:absolute; bottom:1px; right:4px; font-size:0.55rem; font-family:monospace; color:#64748b; pointer-events:none;">${{defaultMaxDur.toFixed(2)}}s</span>
                        </div>
                    `;

                    audioHtml = `
                        <div style="display:flex; flex-direction:column; gap:2px;">
                            <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                                <audio id="${{audId}}" controls preload="metadata"
                                    onloadedmetadata="updateTimelineScale(this, '${{audId}}', ${{onsetSecNum}}, ${{speechEndSecNum}}, ${{earconSecNum || 'null'}}, ${{defaultMaxDur.toFixed(3)}})"
                                    ontimeupdate="syncPlayhead(this, '${{audId}}', ${{defaultMaxDur.toFixed(3)}})"
                                    onplay="syncPlayhead(this, '${{audId}}', ${{defaultMaxDur.toFixed(3)}})"
                                    style="height:26px; width:125px; border-radius:4px;">
                                    <source src="${{cleanAudioPath}}" type="${{mimeType}}">
                                    <source src="/data/${{cleanAudioPath}}" type="${{mimeType}}">
                                </audio>
                                ${{seekBtns}}
                                ${{batchSeekBtn}}
                                <a href="${{cleanAudioPath}}" download target="_blank" title="Download Per-Trial Audio" style="color:#94a3b8; text-decoration:none; font-size:0.85rem;">💾</a>
                            </div>
                            ${{visualTimelineHtml}}
                        </div>
                    `;
                }}

                return `<tr class="border-b border-slate-800">
                    <td class="font-bold text-slate-200">${{r.trial_id || '—'}}</td>
                    <td>${{r.condition || '—'}}</td>
                    <td><div style="font-size: 0.82rem;">${{targetText}}</div></td>
                    <td><div style="font-size: 0.82rem; color: #f1f5f9; font-style: italic;">"${{spokenText}}"</div></td>
                    <td><span class="badge ${{outcomeStyle}}">${{outcomeLabel}}</span></td>
                    <td>${{latHtml}}</td>
                    <td>${{audioHtml}}</td>
                </tr>`;
            }}).join('');

            // Render waveforms for all visible trial canvases
            data.forEach(r => {{
                if (!r.audio_file) return;
                const audId = 'aud_' + (r.trial_id || '');
                const onsetS = (r.prompt_to_audio_delta_ms && r.prompt_to_audio_delta_ms > 0) ? (r.prompt_to_audio_delta_ms / 1000) : 0;
                const earconMs = (r.earcon_onset_offset_ms && r.earcon_onset_offset_ms > 0) ? r.earcon_onset_offset_ms : (r.total_latency_delta_ms || null);
                const earconLat = (r.earcon_latency_ms !== undefined && r.earcon_latency_ms !== null) ? r.earcon_latency_ms : r.audio_to_trigger_delta_ms;
                const endMs = (r.speech_end_offset_ms && r.speech_end_offset_ms > 0) ? r.speech_end_offset_ms : ((earconMs && earconLat) ? (earconMs - earconLat) : (onsetS * 1000 + 520));
                const endS = endMs / 1000;
                const earconS = earconMs ? (earconMs / 1000) : null;
                const knownDur = (r.audio_duration_sec && Number(r.audio_duration_sec) > 0.5) ? Number(r.audio_duration_sec) : null;
                const defDur = knownDur || Math.max(4.8, (earconS || endS || 3.0) + 1.6);
                drawTrialWaveformCanvas(audId, onsetS, endS, earconS, defDur);
            }});
        }}

        // Initial render
        applyFilterAndSearch();
    </script>
</body>
</html>
"""
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html_content)

