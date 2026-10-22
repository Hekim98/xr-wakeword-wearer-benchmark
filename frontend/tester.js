const DEFAULT_SUITE = {"suite_name": "Gemini Hotwords Suite (30 Hotword Recording + 90 Noise Environment = 120 Trials)", "version": "3.0", "description": "Phase 1: 30 clean recording trials in silent condition (10 Hey Google, 10 OK Google, 10 Hey Gemini), followed by STOP RECORDING break. Phase 2: 90 noise environment trials across 6 acoustic conditions.", "total_trials": 120, "randomized": false, "random_seed": 42, "conditions": ["Silent", "Multi-Talker Babble", "Traffic / Industrial", "Calm / Indoor", "Moderate Breeze", "Music Playback"], "phrases": ["Hey Google", "OK Google", "Hey Gemini"], "settings": {"default_countdown_sec": 0, "default_listen_window_sec": 6, "inter_trial_delay_sec": 0, "auto_advance": false}, "trials": [{"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "noise_level": "", "trial_id": "T001"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "noise_level": "", "trial_id": "T002"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "noise_level": "", "trial_id": "T003"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "noise_level": "", "trial_id": "T004"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "noise_level": "", "trial_id": "T005"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "noise_level": "", "trial_id": "T006"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "noise_level": "", "trial_id": "T007"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "noise_level": "", "trial_id": "T008"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "noise_level": "", "trial_id": "T009"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "noise_level": "", "trial_id": "T010"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "noise_level": "", "trial_id": "T011"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "noise_level": "", "trial_id": "T012"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "noise_level": "", "trial_id": "T013"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "noise_level": "", "trial_id": "T014"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "noise_level": "", "trial_id": "T015"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 6, "listen_window_sec": 6, "noise_level": "", "trial_id": "T016"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 6, "listen_window_sec": 6, "noise_level": "", "trial_id": "T017"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 6, "listen_window_sec": 6, "noise_level": "", "trial_id": "T018"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 7, "listen_window_sec": 6, "noise_level": "", "trial_id": "T019"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 7, "listen_window_sec": 6, "noise_level": "", "trial_id": "T020"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 7, "listen_window_sec": 6, "noise_level": "", "trial_id": "T021"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 8, "listen_window_sec": 6, "noise_level": "", "trial_id": "T022"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 8, "listen_window_sec": 6, "noise_level": "", "trial_id": "T023"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 8, "listen_window_sec": 6, "noise_level": "", "trial_id": "T024"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 9, "listen_window_sec": 6, "noise_level": "", "trial_id": "T025"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 9, "listen_window_sec": 6, "noise_level": "", "trial_id": "T026"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 9, "listen_window_sec": 6, "noise_level": "", "trial_id": "T027"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 10, "listen_window_sec": 6, "noise_level": "", "trial_id": "T028"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 10, "listen_window_sec": 6, "noise_level": "", "trial_id": "T029"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 10, "listen_window_sec": 6, "noise_level": "", "trial_id": "T030"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T031", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T032", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T033", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T034", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T035", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T036", "noise_level": "Loud"}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 1 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T037", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T038", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T039", "noise_level": ""}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T040", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T041", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T042", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T043", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T044", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T045", "noise_level": "Loud"}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T046", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T047", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T048", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T049", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T050", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T051", "noise_level": "Loud"}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 1 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T052", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T053", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T054", "noise_level": ""}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T055", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T056", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T057", "noise_level": "Loud"}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T058", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T059", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T060", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Turn the white fan on to Level 1 then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T061", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Leave the fan on then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T062", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T063", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Turn the white fan on to Level 1 then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T064", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Leave the fan on then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T065", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T066", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T067", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T068", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T069", "noise_level": "Whisper"}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T070", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T071", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T072", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T073", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T074", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T075", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 1 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T076", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T077", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T078", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T079", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T080", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T081", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T082", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T083", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T084", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T085", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T086", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T087", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T088", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T089", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T090", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T091", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T092", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T093", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T094", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T095", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T096", "noise_level": "Loud"}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T097", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T098", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T099", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T100", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T101", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T102", "noise_level": "Loud"}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T103", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T104", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Leave the fan on then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T105", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T106", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T107", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T108", "noise_level": ""}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T109", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T110", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T111", "noise_level": "Whisper"}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T112", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T113", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T114", "noise_level": ""}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T115", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T116", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T117", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T118", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T119", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T120", "noise_level": "Loud"}]};
const DEFAULT_SUITE_120 = {"suite_name": "Gemini Hotword Robustness Suite with Distractors (120 Trials)", "version": "2.3", "description": "30 blocks of 4 trials (1 condition per block: Hey Google, OK Google, Hey Gemini, Google Distractor), randomly switching conditions between blocks = 120 trials", "total_trials": 120, "randomized": false, "random_seed": 42, "conditions": ["Silent", "Multi-Talker Babble", "Traffic / Industrial", "Calm / Indoor", "Moderate Breeze", "Music Playback"], "phrases": ["Hey Google", "OK Google", "Hey Gemini", "Play Google", "OK cool", "Okay good", "Okay go on", "Hey dude"], "settings": {"default_countdown_sec": 0, "default_listen_window_sec": 6, "inter_trial_delay_sec": 0, "auto_advance": false}, "trials": [{"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T001", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T002", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T003", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "Okay go on", "prompt_text": "Press play on the YouTube video on your laptop then say \"Okay go on\" in a Conversational tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T004", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T005", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T006", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T007", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Play Google", "prompt_text": "Wait for the audio to begin then say \"Play Google\" in a Loud tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T008", "noise_level": "Loud"}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 1 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T009", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T010", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T011", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Play Google", "prompt_text": "Leave the fan on then say \"Play Google\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T012", "noise_level": ""}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T013", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T014", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T015", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "OK cool", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK cool\" in a Whisper tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T016", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T017", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T018", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T019", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "Play Google", "prompt_text": "Say \"Play Google\" in a Conversational tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T020", "noise_level": "Conversational"}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T021", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T022", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T023", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Okay go on", "prompt_text": "Open up youtube and select a music video to play then say \"Okay go on\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T024", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T025", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T026", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T027", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Play Google", "prompt_text": "Wait for the audio to begin then say \"Play Google\" in a Conversational tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 1, "listen_window_sec": 6, "trial_id": "T028", "noise_level": "Conversational"}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 1 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T029", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T030", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T031", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey dude", "prompt_text": "Leave the fan on then say \"Hey dude\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T032", "noise_level": ""}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T033", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T034", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T035", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "Okay good", "prompt_text": "Say \"Okay good\" in a Conversational tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T036", "noise_level": "Conversational"}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T037", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T038", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T039", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Okay good", "prompt_text": "Leave the fan on then say \"Okay good\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T040", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Turn the white fan on to Level 1 then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T041", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Leave the fan on then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T042", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T043", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Play Google", "prompt_text": "Leave the fan on then say \"Play Google\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T044", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Turn the white fan on to Level 1 then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T045", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Leave the fan on then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T046", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T047", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Okay go on", "prompt_text": "Leave the fan on then say \"Okay go on\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 2, "listen_window_sec": 6, "trial_id": "T048", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T049", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T050", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T051", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "Play Google", "prompt_text": "Wait for the audio to begin then say \"Play Google\" in a Whisper tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T052", "noise_level": "Whisper"}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T053", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T054", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T055", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK cool", "prompt_text": "Leave the fan on then say \"OK cool\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T056", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T057", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T058", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T059", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Okay good", "prompt_text": "Open up youtube and select a music video to play then say \"Okay good\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T060", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 1 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T061", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T062", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T063", "noise_level": ""}, {"condition": "Calm / Indoor", "phrase": "Hey dude", "prompt_text": "Leave the fan on then say \"Hey dude\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T064", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T065", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T066", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T067", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Okay good", "prompt_text": "Leave the fan on then say \"Okay good\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T068", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T069", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Leave the fan on then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T070", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T071", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK cool", "prompt_text": "Leave the fan on then say \"OK cool\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 3, "listen_window_sec": 6, "trial_id": "T072", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T073", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Conversational tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T074", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T075", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Okay go on", "prompt_text": "Wait for the audio to begin then say \"Okay go on\" in a Conversational tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T076", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T077", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T078", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Loud tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T079", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "OK cool", "prompt_text": "Say \"OK cool\" in a Whisper tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T080", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T081", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T082", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T083", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "Okay good", "prompt_text": "Press play on the YouTube video on your laptop then say \"Okay good\" in a Loud tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T084", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T085", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T086", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T087", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "Hey dude", "prompt_text": "Say \"Hey dude\" in a Loud tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T088", "noise_level": "Loud"}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T089", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T090", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T091", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK cool", "prompt_text": "Open up youtube and select a music video to play then say \"OK cool\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T092", "noise_level": ""}, {"condition": "Traffic / Industrial", "phrase": "Hey Google", "prompt_text": "Wait for the audio to begin then say \"Hey Google\" in a Whisper tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T093", "noise_level": "Whisper"}, {"condition": "Traffic / Industrial", "phrase": "OK Google", "prompt_text": "Wait for the audio to begin then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T094", "noise_level": "Conversational"}, {"condition": "Traffic / Industrial", "phrase": "Hey Gemini", "prompt_text": "Wait for the audio to begin then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T095", "noise_level": "Loud"}, {"condition": "Traffic / Industrial", "phrase": "Play Google", "prompt_text": "Wait for the audio to begin then say \"Play Google\" in a Loud tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 4, "listen_window_sec": 6, "trial_id": "T096", "noise_level": "Loud"}, {"condition": "Moderate Breeze", "phrase": "Hey Gemini", "prompt_text": "Turn the white fan on to Level 3 then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T097", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "OK Google", "prompt_text": "Leave the fan on then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T098", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Hey Google", "prompt_text": "Leave the fan on then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T099", "noise_level": ""}, {"condition": "Moderate Breeze", "phrase": "Okay go on", "prompt_text": "Leave the fan on then say \"Okay go on\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T100", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T101", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T102", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T103", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey dude", "prompt_text": "Open up youtube and select a music video to play then say \"Hey dude\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T104", "noise_level": ""}, {"condition": "Silent", "phrase": "Hey Google", "prompt_text": "Say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T105", "noise_level": "Loud"}, {"condition": "Silent", "phrase": "OK Google", "prompt_text": "Say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T106", "noise_level": "Conversational"}, {"condition": "Silent", "phrase": "Hey Gemini", "prompt_text": "Say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T107", "noise_level": "Whisper"}, {"condition": "Silent", "phrase": "Play Google", "prompt_text": "Say \"Play Google\" in a Whisper tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T108", "noise_level": "Whisper"}, {"condition": "Music Playback", "phrase": "OK Google", "prompt_text": "Open up youtube and select a music video to play then say \"OK Google\" and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T109", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Gemini", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Gemini\" and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T110", "noise_level": ""}, {"condition": "Music Playback", "phrase": "Hey Google", "prompt_text": "Open up youtube and select a music video to play then say \"Hey Google\" and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T111", "noise_level": ""}, {"condition": "Music Playback", "phrase": "OK cool", "prompt_text": "Open up youtube and select a music video to play then say \"OK cool\" and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T112", "noise_level": ""}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Whisper tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T113", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Loud tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T114", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Conversational tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T115", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "Okay good", "prompt_text": "Press play on the YouTube video on your laptop then say \"Okay good\" in a Whisper tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T116", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "OK Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK Google\" in a Whisper tone and select result below.", "target_hotword": "OK_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T117", "noise_level": "Whisper"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Google", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Google\" in a Conversational tone and select result below.", "target_hotword": "HEY_GOOGLE", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T118", "noise_level": "Conversational"}, {"condition": "Multi-Talker Babble", "phrase": "Hey Gemini", "prompt_text": "Press play on the YouTube video on your laptop then say \"Hey Gemini\" in a Loud tone and select result below.", "target_hotword": "HEY_GEMINI", "category": "positive", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T119", "noise_level": "Loud"}, {"condition": "Multi-Talker Babble", "phrase": "OK cool", "prompt_text": "Press play on the YouTube video on your laptop then say \"OK cool\" in a Loud tone and select result below.", "target_hotword": "NONE", "category": "distractor", "repeat_index": 5, "listen_window_sec": 6, "trial_id": "T120", "noise_level": "Loud"}]};
/**
 * Gemini Hotwords QA Evaluation Testbed - Client Application Logic
 */

// Application State
const state = {
  currentView: 'runner',
  configs: [],
  selectedConfig: null,
  activeSuite: JSON.parse(JSON.stringify(DEFAULT_SUITE)),
  participantId: 'P01',
  aiAssistant: 'Gemini Live - Android',
  conversationMode: 'Wearer',
  session: null,
  trialIndex: 0,
  trialState: 'idle', // 'pre_trial' | 'stop_recording' | 'idle' | 'countdown' | 'listening' | 'finished'
  wearerIntroDone: false,
  includeDistractors: false,
  wearerStopRecordingDone: false,
  countdownTimer: null,
  listenTimer: null,
  
  // Timing & Telemetry (Acoustic Hotword Speech -> Smart Glasses Earcon Latency)
  tPromptStart: 0,
  tAudioOnset: 0,
  tSpeechEnd: 0,
  tEarconOnset: 0,
  tLastSpeechActive: 0,
  tDeviceTrigger: 0,
  detectedHotword: null,
  detectionConfidence: 1.0,
  
  // Audio / Mic VAD & Synchronized Recording
  enableAudioRecording: true,
  audioContext: null,
  analyser: null,
  analyserTX1: null,
  analyserTX2: null,
  channelSplitter: null,
  channelGainTX1: null,
  channelGainTX2: null,
  isolatedAudioDest: null,
  activeRecordingStream: null,
  activeMicChannel: (typeof localStorage !== 'undefined' ? localStorage.getItem('active_wireless_tx') : null) || 'TX1',
  micStream: null,
  selectedAudioDeviceId: (typeof localStorage !== 'undefined' ? localStorage.getItem('preferred_audio_device') : '') || '',
  audioDevices: [],
  vadThreshold: 20,
  isAudioOnsetDetected: false,
  isSpeechEnded: false,
  isEarconDetected: false,
  trialNoiseFloor: 6,
  earconConsecutiveFrames: 0,
  trialMediaRecorder: null,
  trialAudioChunks: [],
  isRecordingTrialAudio: false,
  batchMediaRecorder: null,
  isRecordingBatchAudio: false,
  batchRecordingStartMs: 0,
  batchChunkSeq: 0,
  pendingBatchChunkUploads: [],
  batchAudioFile: null,
  first30MediaRecorder: null,
  isRecordingFirst30Audio: false,
  first30RecordingStartMs: 0,
  first30ChunkSeq: 0,
  pendingFirst30ChunkUploads: [],
  first30AudioFile: null,
  currentTrialSpokenTranscript: '',
  
  // Trials History
  trialRecords: [],
  telemetryEvents: [],
  
  // SSE connection
  sseSource: null,
  adbDevices: [],
  phone1Id: null,
  phone2Id: null,
};

// DOM Element Map
const specialCases = {
  navTabs: () => document.querySelectorAll('.nav-tab'),
  viewSections: () => document.querySelectorAll('.view-section'),
  phone1Badge: 'phone1-status-badge',
  phone2Badge: 'phone2-status-badge',
};

const el = new Proxy({}, {
  get(target, prop) {
    if (specialCases[prop]) {
      const val = specialCases[prop];
      return typeof val === 'function' ? val() : document.getElementById(val);
    }
    const id = prop.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
    return document.getElementById(id) || document.getElementById(prop);
  },
  set(target, prop, value) {
    // Ignore any attempts to set properties on el to prevent TypeErrors
    return true;
  }
});

const PHRASE_MAP_META = {
  'Hey Google': 'Hey Meta',
  'Hey Gemini': 'Hey Meta',
  'Hey Meta': 'Hey Meta',
  'OK Google': 'OK Meta',
  'Ok Google': 'OK Meta',
  'OK Gemini': 'OK Meta',
  'OK Meta': 'OK Meta',
  'Play Google': 'Play Meta',
  'Play Gemini': 'Play Meta',
  'Play Meta': 'Play Meta',
  'Okay good': 'Okay, bet',
  'Okay, good': 'Okay, bet',
  'OK, got mine': 'Okay, bet',
  'OK got mine': 'Okay, bet',
  'Okay bet': 'Okay, bet',
  'Okay, bet': 'Okay, bet',
  'Okay go on': 'Okay, better',
  'Okay, go on': 'Okay, better',
  'OK, come by': 'Okay, better',
  'OK come by': 'Okay, better',
  'Okay better': 'Okay, better',
  'Okay, better': 'Okay, better',
  'Hey dude': 'Hey man',
  'Hey, dime': 'Hey man',
  'Hey dime': 'Hey man',
  'Hey man': 'Hey man',
  'OK cool': 'Okay, minute',
  'OK, good night': 'Okay, minute',
  'OK good night': 'Okay, minute',
  'Okay minute': 'Okay, minute',
  'Okay, minute': 'Okay, minute'
};

const TARGET_MAP_META = {
  'HEY_GOOGLE': 'HEY_META',
  'HEY_GEMINI': 'HEY_META',
  'HEY_META': 'HEY_META',
  'OK_GOOGLE': 'OK_META',
  'OK_GEMINI': 'OK_META',
  'OK_META': 'OK_META',
  'NONE': 'NONE'
};

const PHRASE_MAP_IOS = {
  'Hey Meta': 'Hey Google',
  'Hey Google': 'Hey Google',
  'Hey Gemini': 'Hey Gemini',
  'OK Meta': 'OK Google',
  'OK Google': 'OK Google',
  'Ok Google': 'OK Google',
  'Play Meta': 'Play Google',
  'Play Google': 'Play Google',
  'Okay, bet': 'Okay good',
  'Okay bet': 'Okay good',
  'Okay good': 'Okay good',
  'Okay, good': 'Okay good',
  'Okay, better': 'Okay go on',
  'Okay better': 'Okay go on',
  'Okay go on': 'Okay go on',
  'Okay, go on': 'Okay go on',
  'Hey man': 'Hey dude',
  'Hey dude': 'Hey dude',
  'Hey, dime': 'Hey dude',
  'Hey dime': 'Hey dude',
  'Okay, minute': 'OK cool',
  'Okay minute': 'OK cool',
  'OK cool': 'OK cool',
  'OK, good night': 'OK cool',
  'OK good night': 'OK cool'
};

const TARGET_MAP_IOS = {
  'HEY_META': 'HEY_GOOGLE',
  'HEY_GEMINI': 'HEY_GEMINI',
  'HEY_GOOGLE': 'HEY_GOOGLE',
  'OK_META': 'OK_GOOGLE',
  'OK_GEMINI': 'OK_GOOGLE',
  'OK_GOOGLE': 'OK_GOOGLE',
  'NONE': 'NONE'
};

const PHRASE_MAP_ANDROID = {
  'Hey Meta': 'Hey Google',
  'Hey Google': 'Hey Google',
  'Hey Gemini': 'Hey Gemini',
  'OK Meta': 'OK Google',
  'OK Google': 'OK Google',
  'Ok Google': 'OK Google',
  'Play Meta': 'Play Google',
  'Play Google': 'Play Google',
  'Okay, bet': 'Okay good',
  'Okay bet': 'Okay good',
  'Okay good': 'Okay good',
  'Okay, good': 'Okay good',
  'Okay, better': 'Okay go on',
  'Okay better': 'Okay go on',
  'Okay go on': 'Okay go on',
  'Okay, go on': 'Okay go on',
  'Hey man': 'Hey dude',
  'Hey dude': 'Hey dude',
  'Hey, dime': 'Hey dude',
  'Hey dime': 'Hey dude',
  'Okay, minute': 'OK cool',
  'Okay minute': 'OK cool',
  'OK cool': 'OK cool',
  'OK, good night': 'OK cool',
  'OK good night': 'OK cool'
};

const TARGET_MAP_ANDROID = {
  'HEY_META': 'HEY_GOOGLE',
  'HEY_GEMINI': 'HEY_GEMINI',
  'HEY_GOOGLE': 'HEY_GOOGLE',
  'OK_META': 'OK_GOOGLE',
  'OK_GEMINI': 'OK_GOOGLE',
  'OK_GOOGLE': 'OK_GOOGLE',
  'NONE': 'NONE'
};

function transformSuiteForAssistant(suite, assistant) {
  if (!suite || !suite.trials) return suite;
  const isMeta = (assistant === 'Meta AI');
  const isIos = (assistant === 'Gemini Live - iOS');
  const phraseMap = isMeta ? PHRASE_MAP_META : (isIos ? PHRASE_MAP_IOS : PHRASE_MAP_ANDROID);
  const targetMap = isMeta ? TARGET_MAP_META : (isIos ? TARGET_MAP_IOS : TARGET_MAP_ANDROID);

  const newSuite = JSON.parse(JSON.stringify(suite));
  if (Array.isArray(newSuite.conditions)) {
    newSuite.conditions = newSuite.conditions.filter(c => !String(c).toLowerCase().includes('bystander'));
  }
  newSuite.trials = newSuite.trials.filter(t => !String(t.condition || '').toLowerCase().includes('bystander'));
  newSuite.total_trials = newSuite.trials.length;

  if (isMeta) {
    newSuite.suite_name = `Meta AI Hotword Robustness Suite (${newSuite.trials.length} Trials)`;
    newSuite.phrases = ['Hey Meta', 'OK Meta'];
  } else if (isIos) {
    newSuite.suite_name = `Gemini Live (iOS) Hotword Robustness Suite (${newSuite.trials.length} Trials)`;
    newSuite.phrases = ['Hey Google', 'OK Google', 'Hey Gemini'];
  } else {
    newSuite.suite_name = `Gemini Live (Android) Hotword Robustness Suite (${newSuite.trials.length} Trials)`;
    newSuite.phrases = ['Hey Google', 'OK Google', 'Hey Gemini'];
  }

  newSuite.trials = newSuite.trials.map((trial, idx) => {
    const t = { ...trial, trial_id: `T${String(idx + 1).padStart(3, '0')}` };
    const isDistractor = (t.category === 'distractor' || t.target_hotword === 'NONE');
    if (isDistractor && state.includeDistractors) {
      t.category = 'distractor';
      t.target_hotword = 'NONE';
      if (!isMeta && t.phrase === 'Play Meta') {
        t.phrase = 'Play Google';
      }
    } else if (!isMeta && isDistractor) {
      t.phrase = 'Hey Gemini';
      t.target_hotword = 'HEY_GEMINI';
      t.category = 'positive';
    } else {
      const p = t.phrase;
      if (p && phraseMap[p]) {
        t.phrase = phraseMap[p];
      }
      const tgt = t.target_hotword;
      if (tgt && targetMap[tgt]) {
        t.target_hotword = targetMap[tgt];
      }
      if (!isMeta && t.phrase === 'Hey Gemini') {
        t.target_hotword = 'HEY_GEMINI';
        t.category = 'positive';
      }
    }
    setupTrialPromptAndNoise(t);
    return t;
  });
  return newSuite;
}

function generateBystanderSuite(assistant) {
  const isMeta = (assistant === 'Meta AI');
  const isIos = (assistant === 'Gemini Live - iOS');
  const distances = ['1.5 ft', '3 ft', '4.5 ft'];
  const degrees = ['0°', '30°', '60°', '90°', '120°', '150°', '180°', '210°', '240°', '270°', '300°', '330°'];
  const vocalLevels = ['Conversational', 'Loud'];
  const phrases = isMeta
    ? [
        { phrase: 'Hey Meta', target_hotword: 'HEY_META', category: 'positive' },
        { phrase: 'OK Meta', target_hotword: 'OK_META', category: 'positive' }
      ]
    : [
        { phrase: 'Hey Google', target_hotword: 'HEY_GOOGLE', category: 'positive' },
        { phrase: 'OK Google', target_hotword: 'OK_GOOGLE', category: 'positive' },
        { phrase: 'Hey Gemini', target_hotword: 'HEY_GEMINI', category: 'positive' }
      ];

  const trials = [];
  let idx = 1;
  // Fixed outer progression: rotate 0°–330° in order at each distance (1.5 ft -> 3 ft -> 4.5 ft)
  for (const dist of distances) {
    for (const deg of degrees) {
      // Build all (hotword × vocal_level) combinations for this (distance, degree) spot
      const spotCombos = [];
      for (const p of phrases) {
        for (const vl of vocalLevels) {
          spotCombos.push({ p, vl });
        }
      }
      // Randomize ONLY the order of hotwords and vocal levels within this (distance, degree) spot
      for (let i = spotCombos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [spotCombos[i], spotCombos[j]] = [spotCombos[j], spotCombos[i]];
      }

      for (const { p, vl } of spotCombos) {
        const condLabel = `Distance: ${dist} • Angle: ${deg}`;
        const t = {
          is_bystander_suite: true,
          condition: condLabel,
          distance: dist,
          degree: deg,
          vocal_level: vl,
          noise_level: vl,
          phrase: p.phrase,
          target_hotword: p.target_hotword,
          category: p.category,
          repeat_index: 1,
          listen_window_sec: 6,
          trial_id: `T${String(idx++).padStart(3, '0')}`
        };
        setupTrialPromptAndNoise(t);
        trials.push(t);
      }
    }
  }

  const totalTrials = trials.length; // 216 for Gemini Live (Android/iOS), 144 for Meta AI
  return {
    suite_name: isMeta
      ? `Meta AI Bystander Suite (${totalTrials} Trials)`
      : (isIos ? `Gemini Live (iOS) Bystander Suite (${totalTrials} Trials)` : `Gemini Live (Android) Bystander Suite (${totalTrials} Trials)`),
    version: '1.0',
    description: isMeta
      ? '12 Degrees × 3 Distances × 2 Phrases × 2 Vocal Levels = 144 Trials'
      : '12 Degrees × 3 Distances × 3 Phrases × 2 Vocal Levels = 216 Trials',
    total_trials: totalTrials,
    randomized: true,
    conditions: degrees,
    phrases: phrases.map(p => p.phrase),
    settings: { default_countdown_sec: 0, default_listen_window_sec: 6, inter_trial_delay_sec: 0, auto_advance: false },
    trials
  };
}

function getTargetSuiteFilename(assistant, conversationMode) {
  const isMeta = (assistant === 'Meta AI');
  const isBystander = (conversationMode === 'Bystander');
  if (isBystander) {
    return isMeta ? 'meta_bystander_suite.json' : 'gemini_bystander_suite.json';
  }
  if (isMeta) return 'meta_hotwords_suite.json';
  return state.includeDistractors ? 'gemini_hotwords_suite_120.json' : 'gemini_hotwords_suite.json';
}

// AI Assistant & Conversation Mode UI & State Sync
function updateAiAssistantUI(assistant, reloadSuite = true, conversationModeOverride = null) {
  const name = assistant || state.aiAssistant || 'Gemini Live - Android';
  const mode = conversationModeOverride || state.conversationMode || 'Wearer';
  state.aiAssistant = name;
  state.conversationMode = mode;
  const isMeta = (name === 'Meta AI');
  const isIos = (name === 'Gemini Live - iOS');
  const isBystander = (mode === 'Bystander');

  if (el.aiAssistantBadgeVal) el.aiAssistantBadgeVal.textContent = name;
  if (el.conversationModeBadgeVal) el.conversationModeBadgeVal.textContent = mode;

  if (el.modalSelectAiAssistant && el.modalSelectAiAssistant.value !== name) {
    el.modalSelectAiAssistant.value = name;
  }
  if (el.selectAiAssistant && el.selectAiAssistant.value !== name) {
    el.selectAiAssistant.value = name;
  }
  if (el.modalSelectConversationMode && el.modalSelectConversationMode.value !== mode) {
    el.modalSelectConversationMode.value = mode;
  }
  if (el.selectConversationMode && el.selectConversationMode.value !== mode) {
    el.selectConversationMode.value = mode;
  }

  const brandTitle = document.querySelector('.brand-title');
  if (brandTitle) {
    brandTitle.textContent = isMeta ? 'Meta AI Hotwords QA Tester' : 'Gemini Hotwords QA Tester';
  }
  document.title = isMeta ? 'Meta AI Hotwords QA Evaluation Testbed' : 'Gemini Hotwords QA Evaluation Testbed';

  const btnLabel = isMeta ? 'Meta AI' : 'Gemini Live';
  const btnNoAnswerSpan = el.btnGeminiActivatedNoAnswer?.querySelector('span');
  if (btnNoAnswerSpan) btnNoAnswerSpan.textContent = `${btnLabel} Activated - No Answer`;
  if (el.btnGeminiActivatedNoAnswer) {
    el.btnGeminiActivatedNoAnswer.title = `${btnLabel} Activated - No Answer [1]`;
    el.btnGeminiActivatedNoAnswer.classList.toggle('hidden', !isBystander);
  }
  const btnSpan = el.btnGeminiActivated?.querySelector('span');
  if (btnSpan) {
    btnSpan.textContent = isBystander ? `${btnLabel} Activated - Answered Query` : `${btnLabel} Activated`;
  }
  if (el.btnGeminiActivated) {
    el.btnGeminiActivated.title = isBystander
      ? `${btnLabel} Activated - Answered Query [2, Y, or Space]`
      : `${btnLabel} Activated [Y or Space]`;
  }

  const platformLabel = document.getElementById('trial-platform-label');
  if (platformLabel) {
    platformLabel.textContent = `${name} • ${mode}`;
  }

  if (el.simHotwordSelect) {
    const curr = el.simHotwordSelect.value;
    if (isMeta) {
      el.simHotwordSelect.innerHTML = `
        <option value="HEY_META">Trigger: Hey Meta</option>
        <option value="OK_META">Trigger: OK Meta</option>
        <option value="META_AI_ACTIVATED">Trigger: Meta AI Activated</option>
      `;
      if (curr.includes('OK')) el.simHotwordSelect.value = 'OK_META';
      else if (curr.includes('ACTIVATED') || curr.includes('GEMINI')) el.simHotwordSelect.value = 'META_AI_ACTIVATED';
      else el.simHotwordSelect.value = 'HEY_META';
    } else if (isIos) {
      el.simHotwordSelect.innerHTML = `
        <option value="HEY_GEMINI">Trigger: Hey Gemini</option>
        <option value="OK_GEMINI">Trigger: OK Gemini</option>
        <option value="GEMINI_LIVE_ACTIVATED">Trigger: Gemini Activated</option>
      `;
      if (curr.includes('OK')) el.simHotwordSelect.value = 'OK_GEMINI';
      else if (curr.includes('ACTIVATED')) el.simHotwordSelect.value = 'GEMINI_LIVE_ACTIVATED';
      else el.simHotwordSelect.value = 'HEY_GEMINI';
    } else {
      el.simHotwordSelect.innerHTML = `
        <option value="HEY_GOOGLE">Trigger: Hey Google</option>
        <option value="OK_GOOGLE">Trigger: OK Google</option>
        <option value="HEY_GEMINI">Trigger: Hey Gemini</option>
      `;
      if (curr.includes('OK')) el.simHotwordSelect.value = 'OK_GOOGLE';
      else if (curr.includes('GEMINI')) el.simHotwordSelect.value = 'HEY_GEMINI';
      else el.simHotwordSelect.value = 'HEY_GOOGLE';
    }
  }

  const targetSuiteFile = getTargetSuiteFilename(name, mode);
  if (el.modalSelectSuite) {
    el.modalSelectSuite.value = targetSuiteFile;
  }
  if (el.selectSuite) {
    el.selectSuite.value = targetSuiteFile;
  }

  if (reloadSuite) {
    if (isBystander) {
      state.activeSuite = generateBystanderSuite(name);
      state.trialIndex = 0;
      loadCurrentTrial();
    } else {
      loadSuiteConfig(targetSuiteFile);
    }
  }
}

function updateConversationModeUI(mode, reloadSuite = true) {
  updateAiAssistantUI(state.aiAssistant, reloadSuite, mode);
}

// Initialize Application
async function initApp() {
  bindEvents();

  const urlParams = new URLSearchParams(window.location.search);
  const sessionParam = urlParams.get('session');
  if (sessionParam) {
    if (el.modalParticipantId) el.modalParticipantId.value = sessionParam;
  }
  const aiParam = urlParams.get('ai') || urlParams.get('assistant');
  if (aiParam) {
    const low = aiParam.toLowerCase();
    state.aiAssistant = low.includes('meta') ? 'Meta AI' : (low.includes('ios') ? 'Gemini Live - iOS' : 'Gemini Live - Android');
  } else if (el.modalSelectAiAssistant && el.modalSelectAiAssistant.value) {
    state.aiAssistant = el.modalSelectAiAssistant.value;
  }
  updateAiAssistantUI(state.aiAssistant, true);

  loadCurrentTrial();
  
  // Optional backend features (fail gracefully when running on a static python server)
  try { initSSE(); } catch (e) { console.warn('SSE not available:', e); }
  try { await loadSuites(); } catch (e) { console.warn('Backend suites not available, using default:', e); }
  try { await refreshDevices(); } catch (e) { console.warn('Backend devices not available:', e); }
  try { initStageController(); } catch (e) { console.warn('Stage controller init error:', e); }
  const modalRecEl = document.getElementById('modal-check-audio-recording');
  if (modalRecEl) {
    state.enableAudioRecording = modalRecEl.checked;
  }
  if (state.enableAudioRecording) {
    try { initAudioVAD(); } catch (e) { console.warn('Audio VAD init error:', e); }
  } else {
    updateAudioRecIndicator('disabled');
  }
  
  loadCurrentTrial();

  // Broadcast initial trial to Phone 1 right away!
  const trial = state.activeSuite?.trials?.[state.trialIndex];
  if (trial) {
    broadcastTrialEvent('TRIAL_PREPARED', {
      condition: trial.condition,
      phrase: trial.phrase,
      target_hotword: trial.target_hotword,
      category: trial.category,
      trial_index: state.trialIndex + 1,
      total_trials: state.activeSuite.trials.length
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}



// Event Bindings
function bindEvents() {
  const setParticipantId = (pid) => {
    state.participantId = pid || 'P01';
    if (el.participantBadgeVal) el.participantBadgeVal.textContent = `${state.participantId} ✎`;
    if (el.inputParticipantId && el.inputParticipantId.value !== state.participantId) {
      el.inputParticipantId.value = state.participantId;
    }
    broadcastTrialEvent('PARTICIPANT_ID_CHANGED', { participant_id: state.participantId });
  };

  const onModalSubmit = (e) => {
    if (e) e.preventDefault();
    const pid = el.modalParticipantId?.value?.trim() || el.inputParticipantId?.value?.trim() || 'P01';
    setParticipantId(pid);
    state.sessionStarted = true;
    if (el.inputParticipantId) el.inputParticipantId.value = pid;

    const modalAudioCheck = document.getElementById('modal-check-audio-recording');
    if (modalAudioCheck) {
      setAudioRecordingEnabled(modalAudioCheck.checked, true);
    }

    if (el.modalCheckDistractors) {
      state.includeDistractors = el.modalCheckDistractors.checked;
      if (el.checkIncludeDistractors) el.checkIncludeDistractors.checked = state.includeDistractors;
    }

    const assistant = el.modalSelectAiAssistant?.value || el.selectAiAssistant?.value || 'Gemini Live - Android';
    const mode = el.modalSelectConversationMode?.value || el.selectConversationMode?.value || 'Wearer';
    updateAiAssistantUI(assistant, true, mode);

    const suite = el.modalSelectSuite?.value || el.selectSuite?.value || getTargetSuiteFilename(assistant, mode);
    if (el.selectSuite) el.selectSuite.value = suite;

    const randomize = el.modalCheckRandomize ? el.modalCheckRandomize.checked : false;
    if (el.checkRandomizeSuite) el.checkRandomizeSuite.checked = randomize;

    if (el.sessionStartModal) {
      el.sessionStartModal.classList.add('hidden');
      el.sessionStartModal.style.display = 'none';
    }
    const modalEl = document.getElementById('session-start-modal');
    if (modalEl) {
      modalEl.classList.add('hidden');
      modalEl.style.display = 'none';
    }

    try {
      if (!peerHost || currentSessionCode !== pid) {
        initPeerHost();
      } else {
        updateSessionCodeUI(pid);
      }
    } catch (err) {
      console.warn('initPeerHost error:', err);
    }

    if (state.enableAudioRecording) {
      try {
        initAudioVAD();
      } catch (e) {}
    } else {
      updateAudioRecIndicator('disabled');
    }

    try {
      startNewSession();
    } catch (err) {
      console.error('startNewSession error:', err);
      switchView('runner');
    }
  };

  window.beginEvaluation = onModalSubmit;
  const btnModal = document.getElementById('btn-modal-start-session');
  if (btnModal) {
    btnModal.onclick = onModalSubmit;
  }
  const formModal = document.getElementById('form-start-modal');
  if (formModal) {
    formModal.onsubmit = onModalSubmit;
  }

  // Click participant, AI, Conversation Mode, or Audio Rec badge in header
  const openSessionModal = () => {
    if (el.modalParticipantId) el.modalParticipantId.value = state.participantId || 'P01';
    if (el.modalSelectAiAssistant) el.modalSelectAiAssistant.value = state.aiAssistant || 'Gemini Live - Android';
    if (el.modalSelectConversationMode) el.modalSelectConversationMode.value = state.conversationMode || 'Wearer';
    const modalAudioCheck = document.getElementById('modal-check-audio-recording');
    if (modalAudioCheck) modalAudioCheck.checked = Boolean(state.enableAudioRecording);
    const modalEl = document.getElementById('session-start-modal');
    if (modalEl) {
      modalEl.classList.remove('hidden');
      modalEl.style.display = '';
    }
    setTimeout(() => el.modalParticipantId?.focus(), 100);
  };
  el.btnHeaderChangeParticipant?.addEventListener('click', openSessionModal);
  el.aiAssistantBadge?.addEventListener('click', openSessionModal);
  el.conversationModeBadge?.addEventListener('click', openSessionModal);

  const recBadge = document.getElementById('audio-rec-badge');
  if (recBadge) {
    recBadge.style.cursor = 'pointer';
    recBadge.onclick = () => {
      setAudioRecordingEnabled(!state.enableAudioRecording);
    };
  }

  const modalAudioCheckEl = document.getElementById('modal-check-audio-recording');
  const setupAudioCheckEl = document.getElementById('check-enable-audio-recording');
  if (modalAudioCheckEl) {
    modalAudioCheckEl.addEventListener('change', (e) => {
      setAudioRecordingEnabled(e.target.checked);
    });
  }
  if (setupAudioCheckEl) {
    setupAudioCheckEl.addEventListener('change', (e) => {
      setAudioRecordingEnabled(e.target.checked);
    });
  }

  // Audio Input Device Selector Changes (Header & Setup Card Sync)
  const onAudioDeviceChange = (e) => {
    const newDeviceId = e.target.value;
    state.selectedAudioDeviceId = newDeviceId;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('preferred_audio_device', newDeviceId);
    }
    initAudioVAD(newDeviceId);
    logEntry(`[MIC] Switched target microphone input (deviceId: ${newDeviceId || 'default'})`, 'info');
  };

  const selHeaderMic = document.getElementById('select-audio-input');
  if (selHeaderMic) selHeaderMic.onchange = onAudioDeviceChange;

  const selSetupMic = document.getElementById('select-audio-device-setup');
  if (selSetupMic) selSetupMic.onchange = onAudioDeviceChange;

  const btnRefreshMics = document.getElementById('btn-refresh-audio-devices');
  if (btnRefreshMics) {
    btnRefreshMics.onclick = async () => {
      btnRefreshMics.disabled = true;
      btnRefreshMics.textContent = '⏳ Scanning...';
      await refreshAudioDeviceList();
      setTimeout(() => {
        btnRefreshMics.disabled = false;
        btnRefreshMics.textContent = '🔄 Re-scan Mics';
      }, 400);
    };
  }

  // Device Plug/Unplug auto-refresh
  if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.addEventListener) {
    navigator.mediaDevices.addEventListener('devicechange', () => {
      console.log('[AUDIO REC] Audio devices changed on host, refreshing list...');
      refreshAudioDeviceList();
    });
  }

  // Quick 3-Second Mic Verification Test & Playback
  const btnQuickTest = document.getElementById('btn-quick-mic-test');
  const audioPlayback = document.getElementById('mic-test-playback');
  const micTestStatus = document.getElementById('mic-test-status');
  if (btnQuickTest) {
    btnQuickTest.onclick = async () => {
      if (!state.micStream) {
        await initAudioVAD();
      }
      if (!state.micStream) {
        alert('Microphone not accessible. Please check browser microphone permissions.');
        return;
      }
      try {
        const currentTrack = state.micStream.getAudioTracks()[0];
        const currentLabel = currentTrack ? (currentTrack.label || 'Microphone') : 'Microphone';
        const isInternal = /built-in|macbook|internal/i.test(currentLabel);

        btnQuickTest.disabled = true;
        const activeChLabel = state.activeMicChannel || "TX1";
        btnQuickTest.textContent = `🔴 Recording 3s [${activeChLabel}] (${currentLabel.slice(0, 14)})...`;
        if (micTestStatus) {
          if (isInternal) {
            micTestStatus.innerHTML = `<span style="color:#ef4444;font-weight:700;">⚠️ WARNING: Recording from MacBook Internal Mic (${currentLabel})!</span> Please select <strong>Wireless PRO RX</strong> above.`;
          } else {
            micTestStatus.innerHTML = `<span style="color:#22c55e;font-weight:700;">🎙️ Recording from "${currentLabel}"</span> (Deity Mic on Glasses). Speak or let glasses speak now!`;
          }
        }
        if (audioPlayback) audioPlayback.style.display = 'none';

        const testChunks = [];
        const mimeType = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))
          ? 'audio/webm;codecs=opus' : 'audio/webm';
        const streamToRecord = state.activeRecordingStream || state.micStream;
        const recorder = new MediaRecorder(streamToRecord, { mimeType });
        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) testChunks.push(e.data);
        };
        recorder.onstop = () => {
          const testBlob = new Blob(testChunks, { type: mimeType });
          const url = URL.createObjectURL(testBlob);
          if (audioPlayback) {
            audioPlayback.src = url;
            audioPlayback.style.display = 'block';
            audioPlayback.play().catch(() => {});
          }
          btnQuickTest.disabled = false;
          btnQuickTest.textContent = '🎙️ Test Mic (3-Sec Record & Playback)';
          if (micTestStatus) {
            micTestStatus.innerHTML = `✅ Sample recorded from <strong>${currentLabel}</strong> & playing back! Check volume to verify glasses audio.`;
          }
        };
        recorder.start();
        setTimeout(() => {
          if (recorder.state === 'recording') recorder.stop();
        }, 3000);
      } catch (e) {
        console.error('Quick test error:', e);
        btnQuickTest.disabled = false;
        btnQuickTest.textContent = '🎙️ Test Mic (3-Sec Record & Playback)';
        if (micTestStatus) micTestStatus.textContent = '❌ Test failed: ' + e.message;
      }
    };
  }

  // Navigation Tabs
  el.navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  // Runner Controls
  if (el.btnStartTrial) {
    el.btnStartTrial.onclick = (e) => {
      if (e) e.preventDefault();
      if (state.trialState === 'pre_trial') {
        state.wearerIntroDone = true;
        loadCurrentTrial();
      } else if (state.trialState === 'stop_recording') {
        state.wearerStopRecordingDone = true;
        loadCurrentTrial();
      } else if (state.trialState === 'detected' || state.trialState === 'timeout') {
        nextTrial();
      } else {
        startTrial();
      }
    };
  }
  if (el.btnGeminiActivatedNoAnswer) {
    el.btnGeminiActivatedNoAnswer.onclick = (e) => {
      if (e) e.preventDefault();
      markManualTriggered('NO_ANSWER');
    };
  }
  if (el.btnGeminiActivated) {
    el.btnGeminiActivated.onclick = (e) => {
      if (e) e.preventDefault();
      markManualTriggered('ANSWERED_QUERY');
    };
  }
  if (el.btnStayedAsleep) {
    el.btnStayedAsleep.onclick = (e) => {
      if (e) e.preventDefault();
      markManualIgnored();
    };
  }
  if (el.btnRetry) {
    el.btnRetry.onclick = (e) => {
      if (e) e.preventDefault();
      retryTrial();
    };
  }
  if (el.btnBack) {
    el.btnBack.onclick = (e) => {
      if (e) e.preventDefault();
      prevTrial();
    };
  }
  if (el.btnSkip) {
    el.btnSkip.onclick = (e) => {
      if (e) e.preventDefault();
      skipTrial();
    };
  }

  // Edit Prompt
  el.editPromptBtn?.addEventListener('click', toggleEditPrompt);
  el.promptEditInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') toggleEditPrompt();
  });

  // Drawer Toggle
  el.drawerToggle?.addEventListener('click', (e) => {
    if (e.target.closest('.sim-tools')) return;
    if (el.telemetryDrawer) el.telemetryDrawer.classList.toggle('collapsed');
    if (el.drawerBody) el.drawerBody.style.display = el.telemetryDrawer.classList.contains('collapsed') ? 'none' : 'block';
    if (el.drawerChevron) el.drawerChevron.textContent = el.telemetryDrawer.classList.contains('collapsed') ? '▼' : '▲';
  });

  // Simulation Trigger
  el.btnSimTrigger?.addEventListener('click', injectMockTrigger);

  // Setup Actions
  el.btnRefreshDevices?.addEventListener('click', refreshDevices);
  el.btnReversePhone1?.addEventListener('click', reversePhone1Bridge);
  el.btnReversePhone2?.addEventListener('click', reversePhone2Bridge);
  el.btnConnectPhone2?.addEventListener('click', attachPhone2Logcat);
  el.selectSourceMode?.addEventListener('change', updateSourceMode);
  el.btnStartSession?.addEventListener('click', startNewSession);
  el.inputParticipantId?.addEventListener('input', () => {
    setParticipantId(el.inputParticipantId?.value);
  });
  el.selectAiAssistant?.addEventListener('change', (e) => {
    updateAiAssistantUI(e.target.value, true, state.conversationMode);
  });
  el.modalSelectAiAssistant?.addEventListener('change', (e) => {
    updateAiAssistantUI(e.target.value, true, state.conversationMode);
  });
  el.selectConversationMode?.addEventListener('change', (e) => {
    updateConversationModeUI(e.target.value, true);
  });
  el.modalSelectConversationMode?.addEventListener('change', (e) => {
    updateConversationModeUI(e.target.value, true);
  });

  const onDistractorToggleChange = async (e) => {
    const checked = e.target.checked;
    state.includeDistractors = checked;
    if (el.modalCheckDistractors) el.modalCheckDistractors.checked = checked;
    if (el.checkIncludeDistractors) el.checkIncludeDistractors.checked = checked;
    const curVal = el.modalSelectSuite?.value || el.selectSuite?.value || '';
    if (curVal.includes('gemini_hotwords_suite')) {
      const nextSuite = checked ? 'gemini_hotwords_suite_120.json' : 'gemini_hotwords_suite.json';
      if (el.modalSelectSuite) el.modalSelectSuite.value = nextSuite;
      if (el.selectSuite) el.selectSuite.value = nextSuite;
      await loadSuiteConfig(nextSuite, el.checkRandomizeSuite?.checked || el.modalCheckRandomize?.checked);
    }
  };
  el.modalCheckDistractors?.addEventListener('change', onDistractorToggleChange);
  el.checkIncludeDistractors?.addEventListener('change', onDistractorToggleChange);

  el.modalSelectSuite?.addEventListener('change', async (e) => {
    const val = e.target.value;
    if (el.selectSuite) el.selectSuite.value = val;
    if (val === 'gemini_hotwords_suite_120.json') {
      state.includeDistractors = true;
      if (el.modalCheckDistractors) el.modalCheckDistractors.checked = true;
      if (el.checkIncludeDistractors) el.checkIncludeDistractors.checked = true;
    } else if (val === 'gemini_hotwords_suite.json' || val === 'gemini_hotwords_suite_noise90.json') {
      state.includeDistractors = false;
      if (el.modalCheckDistractors) el.modalCheckDistractors.checked = false;
      if (el.checkIncludeDistractors) el.checkIncludeDistractors.checked = false;
    }
    const targetMode = val.includes('bystander') ? 'Bystander' : 'Wearer';
    const targetAsst = val.includes('meta')
      ? 'Meta AI'
      : ((state.aiAssistant && state.aiAssistant.startsWith('Gemini Live')) ? state.aiAssistant : 'Gemini Live - Android');
    updateAiAssistantUI(targetAsst, false, targetMode);
    await loadSuiteConfig(val, el.modalCheckRandomize?.checked);
  });

  el.selectSuite?.addEventListener('change', async (e) => {
    const val = e.target.value;
    if (el.modalSelectSuite) el.modalSelectSuite.value = val;
    if (val === 'gemini_hotwords_suite_120.json') {
      state.includeDistractors = true;
      if (el.modalCheckDistractors) el.modalCheckDistractors.checked = true;
      if (el.checkIncludeDistractors) el.checkIncludeDistractors.checked = true;
    } else if (val === 'gemini_hotwords_suite.json' || val === 'gemini_hotwords_suite_noise90.json') {
      state.includeDistractors = false;
      if (el.modalCheckDistractors) el.modalCheckDistractors.checked = false;
      if (el.checkIncludeDistractors) el.checkIncludeDistractors.checked = false;
    }
    const targetMode = val.includes('bystander') ? 'Bystander' : 'Wearer';
    const targetAsst = val.includes('meta')
      ? 'Meta AI'
      : ((state.aiAssistant && state.aiAssistant.startsWith('Gemini Live')) ? state.aiAssistant : 'Gemini Live - Android');
    updateAiAssistantUI(targetAsst, false, targetMode);
    await loadSuiteConfig(val, el.checkRandomizeSuite?.checked);
  });

  // Analytics Exports
  el.btnExportCsv?.addEventListener('click', exportCSV);
  el.btnExportBenchmarkCsv?.addEventListener('click', exportDetailedBenchmarkCSV);
  el.btnExportBenchmarkMd?.addEventListener('click', exportMarkdownSummary);
  el.btnExportJson?.addEventListener('click', exportJSON);
  el.btnFinalizeSession?.addEventListener('click', finalizeSession);
  el.btnFinalizeSessionRunner?.addEventListener('click', finalizeSession);

  // Keyboard Shortcuts
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (state.currentView !== 'runner') return;

    if (state.trialState === 'pre_trial') {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        state.wearerIntroDone = true;
        loadCurrentTrial();
      }
      return;
    } else if (state.trialState === 'stop_recording') {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        state.wearerStopRecordingDone = true;
        loadCurrentTrial();
      } else if (e.key === 'b' || e.key === 'B' || e.key === 'ArrowLeft') {
        e.preventDefault();
        prevTrial();
      }
      return;
    } else if (state.trialState === 'idle') {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        startTrial();
      }
    } else if (state.trialState === 'detected' || state.trialState === 'timeout') {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        nextTrial();
      }
    } else {
      const isBystander = state.conversationMode === 'Bystander' || Boolean(getCurrentTrial()?.is_bystander_suite);
      if (e.key === '1' && isBystander) {
        e.preventDefault();
        markManualTriggered('NO_ANSWER');
      } else if (e.code === 'Space' || e.key === '2' || (e.key === '1' && !isBystander) || e.key === 'y' || e.key === 'Y') {
        e.preventDefault();
        markManualTriggered('ANSWERED_QUERY');
      } else if (e.code === 'Backspace' || e.key === '3' || e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        markManualIgnored();
      }
    }
    if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      retryTrial();
    } else if (e.key === 'b' || e.key === 'B' || e.key === 'ArrowLeft') {
      e.preventDefault();
      prevTrial();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      skipTrial();
    }
  });
}

function markManualTriggered(responseMode = 'ANSWERED_QUERY') {
  const trial = getCurrentTrial();
  if (!trial) return;
  if (!state.tPromptStart) state.tPromptStart = Date.now() - 400;
  const isMeta = state.aiAssistant === 'Meta AI';
  const isIos = state.aiAssistant === 'Gemini Live - iOS';
  const defaultHw = isMeta ? 'HEY_META' : (isIos ? 'HEY_GEMINI' : 'HEY_GOOGLE');
  const target = (trial.target_hotword || trial.phrase || defaultHw).toUpperCase();
  let hw;
  if (target.includes('GEMINI') || isIos) {
    hw = target.includes('OK') ? 'OK_GEMINI' : 'HEY_GEMINI';
  } else if (target.includes('META') || isMeta) {
    hw = target.includes('OK') ? 'OK_META' : 'HEY_META';
  } else {
    hw = target.includes('OK') ? 'OK_GOOGLE' : 'HEY_GOOGLE';
  }
  state.lastResponseOutcome = (responseMode === 'NO_ANSWER')
    ? 'ACTIVATED_NO_ANSWER'
    : 'ACTIVATED_ANSWERED_QUERY';
  const labelText = (responseMode === 'NO_ANSWER') ? 'Activated - No Answer' : 'Activated - Answered Query';
  logEntry(`[MANUAL] Marked ${state.aiAssistant || 'Assistant'} ${labelText}: ${hw}`, 'trigger');
  
  // Record current trial using acoustic earcon onset timestamp if detected (otherwise fallback to current time until waveform analyzer refines it)
  const triggerTs = state.tEarconOnset || state.tDeviceTrigger || Date.now();
  onDeviceHotwordTrigger(hw, 1.0, triggerTs);
  state.trialAttempt = 1;

  // Advance to next trial in idle state so evaluator can hang up and prepare
  nextTrial();
}

function markManualIgnored() {
  const trial = getCurrentTrial();
  if (!trial) return;
  if (!state.tPromptStart) state.tPromptStart = Date.now() - 400;

  state.lastResponseOutcome = 'STAYED_ASLEEP';
  logEntry(`[MANUAL] Marked Stayed Asleep`, 'system');
  finishTrial('TIMEOUT');
  state.trialAttempt = 1;

  // Advance to next trial in idle state so evaluator can prepare
  nextTrial();
}

function switchView(viewName) {
  state.currentView = viewName;
  if (viewName !== 'runner') {
    stopLocalConditionAudio();
  }
  el.navTabs.forEach(t => t.classList.toggle('active', t.dataset.view === viewName));
  el.viewSections.forEach(s => s.classList.toggle('active', s.id === `view-${viewName}`));
}

// -------------------------------------------------------------
// Suite & Session Loading
// -------------------------------------------------------------
async function loadSuites() {
  if (window.EMBEDDED_SUITE_DATA) {
    await loadSuiteConfig('gemini_hotwords_suite.json');
    return;
  }

  try {
    const res = await fetch('/api/configs').catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      if (el.selectSuite) el.selectSuite.innerHTML = '';
      if (el.modalSelectSuite) el.modalSelectSuite.innerHTML = '';
      
      data.configs.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.filename;
        opt.textContent = `${c.suite_name} (${c.trial_count} Trials)`;
        if (el.selectSuite) el.selectSuite.appendChild(opt);

        const optModal = opt.cloneNode(true);
        if (el.modalSelectSuite) el.modalSelectSuite.appendChild(optModal);
      });

      const defaultSuite = data.configs.find(c => c.filename.includes('hotwords')) || data.configs[0];
      if (defaultSuite) {
        if (el.selectSuite) el.selectSuite.value = defaultSuite.filename;
        if (el.modalSelectSuite) el.modalSelectSuite.value = defaultSuite.filename;
        await loadSuiteConfig(defaultSuite.filename);
      }
      return;
    }
  } catch (err) {
    console.error('Failed to fetch /api/configs:', err);
  }

  // Static Fallback
  const fallbackSuite = (state.aiAssistant === 'Meta AI') ? 'meta_hotwords_suite.json' : 'gemini_hotwords_suite.json';
  await loadSuiteConfig(fallbackSuite);
}

function shuffleTrials(trials) {
  // If this is the 120-trial Gemini suite (30 recording + 90 noise trials),
  // shuffle recording blocks (0..29) and noise blocks (30..119) separately
  // so the 30 recording trials always precede the STOP RECORDING break at trial 30!
  if (trials.length === 120 && trials[0]?.condition === 'Silent' && !trials[0]?.noise_level && !trials[0]?.is_bystander_suite) {
    const recTrials = trials.slice(0, 30);
    const noiseTrials = trials.slice(30);

    const recBlocks = [];
    for (let i = 0; i < recTrials.length; i += 3) {
      recBlocks.push(recTrials.slice(i, i + 3));
    }
    for (let i = recBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [recBlocks[i], recBlocks[j]] = [recBlocks[j], recBlocks[i]];
    }

    const noiseBlocks = [];
    for (let i = 0; i < noiseTrials.length; i += 3) {
      noiseBlocks.push(noiseTrials.slice(i, i + 3));
    }
    for (let i = noiseBlocks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [noiseBlocks[i], noiseBlocks[j]] = [noiseBlocks[j], noiseBlocks[i]];
    }

    const shuffled = [...recBlocks.flat(), ...noiseBlocks.flat()];
    return shuffled.map((t, idx) => ({
      ...t,
      trial_id: `T${String(idx + 1).padStart(3, '0')}`
    }));
  }

  // Group trials into blocks of 3 (1 condition per block)
  const blocks = [];
  for (let i = 0; i < trials.length; i += 3) {
    blocks.push(trials.slice(i, i + 3));
  }
  
  // Shuffle the blocks of 3 so conditions are randomized, but each condition stays in a 3-trial block
  for (let i = blocks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [blocks[i], blocks[j]] = [blocks[j], blocks[i]];
  }

  // Flatten back into a single array and re-index trial_ids
  const shuffled = blocks.flat();
  return shuffled.map((t, idx) => ({
    ...t,
    trial_id: `T${String(idx + 1).padStart(3, '0')}`
  }));
}

async function loadSuiteConfig(filename, forceRandomize = false) {
  const isBystander = (filename && filename.includes('bystander')) || state.conversationMode === 'Bystander';
  const targetAsst = (state.aiAssistant === 'Meta AI' || (filename && filename.includes('meta')))
    ? 'Meta AI'
    : (state.aiAssistant || 'Gemini Live - Android');

  if (isBystander) {
    state.activeSuite = generateBystanderSuite(targetAsst);
    state.trialIndex = 0;
    state.wearerIntroDone = false;
    state.wearerStopRecordingDone = false;
    state.trialRecords = [];
    loadCurrentTrial();
    return;
  }

  if (window.EMBEDDED_SUITE_DATA) {
    state.activeSuite = JSON.parse(JSON.stringify(window.EMBEDDED_SUITE_DATA));
    state.activeSuite = transformSuiteForAssistant(state.activeSuite, targetAsst);
    if (forceRandomize || el.checkRandomizeSuite?.checked) {
      state.activeSuite.trials = shuffleTrials(state.activeSuite.trials);
    }
    state.trialIndex = 0;
    state.wearerIntroDone = false;
    state.wearerStopRecordingDone = false;
    state.trialRecords = [];
    loadCurrentTrial();
    return;
  }

  try {
    const t = Date.now();
    const pathsToTry = [
      `/api/configs/${filename}?t=${t}`,
      `configs/${filename}?t=${t}`,
      `/configs/${filename}?t=${t}`,
      `../configs/${filename}?t=${t}`,
      `configs/meta_hotwords_suite.json?t=${t}`,
      `configs/gemini_hotwords_suite.json?t=${t}`,
      `/configs/meta_hotwords_suite.json?t=${t}`,
      `/configs/gemini_hotwords_suite.json?t=${t}`
    ];
    let res = null;
    for (const p of pathsToTry) {
      res = await fetch(p).catch(() => null);
      if (res && res.ok) break;
    }
    if (res && res.ok) {
      state.activeSuite = await res.json();
    }

    // Fail-safe: if activeSuite is still null, use embedded DEFAULT_SUITE or DEFAULT_SUITE_120
    if (!state.activeSuite || !state.activeSuite.trials) {
      console.warn('[SUITE] Could not fetch suite config from any path, using embedded DEFAULT_SUITE');
      const fallbackSuite = (state.includeDistractors && typeof DEFAULT_SUITE_120 !== 'undefined') ? DEFAULT_SUITE_120 : DEFAULT_SUITE;
      state.activeSuite = JSON.parse(JSON.stringify(fallbackSuite));
    }

    // If includeDistractors is enabled and we expressly requested the distractor suite
    if (state.includeDistractors && filename === 'gemini_hotwords_suite_120.json' && state.activeSuite && state.activeSuite.trials && state.activeSuite.trials.length === 90 && typeof DEFAULT_SUITE_120 !== 'undefined') {
      state.activeSuite = JSON.parse(JSON.stringify(DEFAULT_SUITE_120));
    }

    state.activeSuite = transformSuiteForAssistant(state.activeSuite, targetAsst);

    if (forceRandomize || el.checkRandomizeSuite?.checked) {
      if (state.activeSuite?.trials) {
        state.activeSuite.trials = shuffleTrials(state.activeSuite.trials);
      }
    }

    state.trialIndex = 0;
    state.wearerIntroDone = false;
    state.wearerStopRecordingDone = false;
    state.trialRecords = [];
    loadCurrentTrial();
  } catch (err) {
    console.error('Failed to load suite config:', err);
  }
}

async function startNewSession() {
  state.wearerIntroDone = false;
  state.wearerStopRecordingDone = false;
  state.participantId = el.inputParticipantId?.value || el.modalParticipantId?.value || 'P01';
  if (el.participantBadgeVal) el.participantBadgeVal.textContent = state.participantId;
  const suiteFile = el.selectSuite?.value || el.modalSelectSuite?.value || getTargetSuiteFilename(state.aiAssistant, state.conversationMode);

  try {
    await loadSuiteConfig(suiteFile, el.checkRandomizeSuite?.checked || el.modalCheckRandomize?.checked);
  } catch (err) {
    console.warn('loadSuiteConfig error:', err);
  }

  try {
    const sResp = await fetch('/api/session/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        participant_id: state.participantId,
        ai_assistant: state.aiAssistant || 'Gemini Live - Android',
        conversation_mode: state.conversationMode || 'Wearer',
        suite_name: state.activeSuite?.suite_name || (state.aiAssistant === 'Meta AI' ? 'Meta AI Hotwords Suite' : 'Gemini Hotwords Suite')
      })
    });
    const sData = await sResp.json();
    if (sData && sData.session) {
      state.activeSession = sData.session;
      console.log('[SESSION] Active session initialized:', state.activeSession.session_id);
      const setupSidBadge = document.getElementById('setup-session-id');
      if (setupSidBadge) setupSidBadge.textContent = `Session: ${state.activeSession.session_id}`;
      const first30Btn = document.getElementById('btn-export-first30-audio');
      if (first30Btn) first30Btn.href = `/api/export/first30_audio?session_id=${encodeURIComponent(state.activeSession.session_id)}`;
      const first30RunnerBtn = document.getElementById('btn-export-first30-audio-runner');
      if (first30RunnerBtn) first30RunnerBtn.href = `/api/export/first30_audio?session_id=${encodeURIComponent(state.activeSession.session_id)}`;
      const batchBtn = document.getElementById('btn-export-batch-audio');
      if (batchBtn) batchBtn.href = `/api/export/batch_audio?session_id=${encodeURIComponent(state.activeSession.session_id)}`;
      const zipBtn = document.getElementById('btn-export-recordings-zip');
      if (zipBtn) zipBtn.href = `/api/export/package_zip?session_id=${encodeURIComponent(state.activeSession.session_id)}`;
    }
  } catch (err) {
    console.error('Failed to start session API:', err);
  }

  // Start continuous Full-Session ("Batch") Audio Recording AND First-30-Trials Audio Recording from session start (only if audio recording is enabled)
  if (state.enableAudioRecording) {
    try {
      startBatchSessionRecording(true);
      startFirst30SessionRecording(true);
    } catch (batchErr) {
      console.warn('[BATCH REC] Could not start on session init:', batchErr);
    }
  } else {
    updateAudioRecIndicator('disabled');
  }

  switchView('runner');
}

// -------------------------------------------------------------
// Trial Runner Mechanics
// -------------------------------------------------------------
function updateAttemptBadge() {
  if (el.attemptBadge) el.attemptBadge.classList.add('hidden');
}

function setupTrialPromptAndNoise(trial) {
  if (!trial) return;
  const phrase = trial.phrase || trial.target_hotword || 'Hey Google';

  if (trial.is_bystander_suite) {
    const dist = trial.distance || '1.5 ft';
    const deg = trial.degree || '0°';
    const vl = trial.vocal_level || trial.noise_level || 'Conversational';
    trial.noise_level = vl;
    const basePhrase = phrase.replace(/,?\s*how is the weather today\??/i, '').trim();
    const queryPhrase = `${basePhrase}, how is the weather today?`;
    trial.prompt_html = `Position at <span style="color: #0284c7; font-weight: bold;">${dist} (${deg})</span> and say <span style="color: #0284c7; font-weight: bold;">"${queryPhrase}"</span><br>in a <span style="color: #0284c7; font-weight: bold;">${vl}</span> tone and select result below.`;
    trial.prompt_text = `Position at ${dist} (${deg}) and say "${queryPhrase}" in a ${vl} tone and select result below.`;
    return;
  }

  const cond = (trial.condition || '').toLowerCase();
  
  const VALID_LEVELS = ['Whisper', 'Conversational', 'Loud'];
  if (cond.includes('multi-talker babble') || cond.includes('traffic')) {
    if (!trial.noise_level || !VALID_LEVELS.includes(trial.noise_level)) {
      trial.noise_level = VALID_LEVELS[Math.floor(Math.random() * VALID_LEVELS.length)];
    }
  } else if (cond.includes('silent')) {
    if (trial.noise_level && !VALID_LEVELS.includes(trial.noise_level)) {
      trial.noise_level = '';
    }
  } else {
    trial.noise_level = '';
  }

  const nl = trial.noise_level;

  if (cond.includes('multi-talker babble') || cond.includes('traffic') || cond.includes('babble') || cond.includes('industrial')) {
    trial.prompt_html = `Background noise active. Now say: <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span><br>in a <span style="color: #0284c7; font-weight: bold;">${nl}</span> tone and select result below.`;
    trial.prompt_text = `Background noise active. Now say: "${phrase}" in a ${nl} tone and select result below.`;
  } else if (cond.includes('silent')) {
    if (nl) {
      trial.prompt_html = `Say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> in a <span style="color: #0284c7; font-weight: bold;">${nl}</span> tone and select result below.`;
      trial.prompt_text = `Say "${phrase}" in a ${nl} tone and select result below.`;
    } else {
      trial.prompt_html = `Say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Say "${phrase}" and select result below.`;
    }
  } else if (cond.includes('music')) {
    const posInBlock = state.trialIndex % 3;
    if (posInBlock === 0) {
      trial.prompt_html = `Open up youtube <u style="text-decoration: underline;">on your phone</u> and select a music video to play then say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Open up youtube on your phone and select a music video to play then say "${phrase}" and select result below.`;
    } else {
      trial.prompt_html = `Resume the youtube video then say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Resume the youtube video then say "${phrase}" and select result below.`;
    }
  } else if (cond.includes('breeze') || cond.includes('wind')) {
    const posInBlock = state.trialIndex % 3;
    if (posInBlock === 0) {
      trial.prompt_html = `Turn the white fan on to Level 3 then say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Turn the white fan on to Level 3 then say "${phrase}" and select result below.`;
    } else {
      trial.prompt_html = `Leave the fan on then say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Leave the fan on then say "${phrase}" and select result below.`;
    }
  } else if (cond.includes('calm') || cond.includes('indoor')) {
    const posInBlock = state.trialIndex % 3;
    if (posInBlock === 0) {
      trial.prompt_html = `Turn the white fan on to Level 1 then say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Turn the white fan on to Level 1 then say "${phrase}" and select result below.`;
    } else {
      trial.prompt_html = `Leave the fan on then say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> and select result below.`;
      trial.prompt_text = `Leave the fan on then say "${phrase}" and select result below.`;
    }
  } else if (cond.includes('bystander')) {
    trial.prompt_html = `Stay silent and have another person say <span style="color: #0284c7; font-weight: bold;">"${phrase}"</span> then select result below.`;
    trial.prompt_text = `Stay silent and have another person say "${phrase}" then select result below.`;
  } else {
    trial.prompt_html = `Now say: <span style="color: #0284c7; font-weight: bold;">'${phrase}'</span>`;
    trial.prompt_text = `Now say: '${phrase}'`;
  }
}

function getCurrentTrial() {
  if (!state.activeSuite || !state.activeSuite.trials) return null;
  return state.activeSuite.trials[state.trialIndex] || null;
}

function is30Plus90RecordingSuite() {
  if (!state.enableAudioRecording) return false;
  const trials = state.activeSuite?.trials;
  return Boolean(trials && trials.length === 120 && trials[0]?.condition === 'Silent' && !trials[0]?.noise_level && !trials[0]?.is_bystander_suite);
}

function loadCurrentTrial() {
  stopLocalConditionAudio();
  const trial = getCurrentTrial();
  if (!trial) {
    el.promptDisplayText.textContent = 'Session Complete / No Trials';
    return;
  }
  setupTrialPromptAndNoise(trial);

  const total = state.activeSuite.trials.length;
  const currentNum = state.trialIndex + 1;
  const pct = ((currentNum / total) * 100).toFixed(1);

  // Update Tracker
  el.trialCounterText.textContent = `Trial ${currentNum} of ${total}`;
  el.trialPctText.textContent = `(${pct}%)`;
  el.trialProgressBar.style.width = `${pct}%`;

  // Quick visual flash on prompt card to signify trial change
  if (el.promptCard) {
    el.promptCard.classList.remove('trial-changed-flash');
    void el.promptCard.offsetWidth; // trigger reflow
    el.promptCard.classList.add('trial-changed-flash');
  }

  // Update Condition Banner (Always Visible, No Emoji)
  const currentCondition = trial.condition || 'Default';
  const conditionClass = 'condition-' + currentCondition.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (el.promptCard) {
    // Remove all previous condition-* classes
    Array.from(el.promptCard.classList).forEach(cls => {
      if (cls.startsWith('condition-')) el.promptCard.classList.remove(cls);
    });
    el.promptCard.classList.add(conditionClass);
  }

  if (el.conditionChangeBannerText) {
    if (trial.is_bystander_suite) {
      el.conditionChangeBannerText.textContent = `DISTANCE: ${(trial.distance || '').toUpperCase()}  •  ANGLE: ${(trial.degree || '').toUpperCase()}  •  VOCAL LEVEL: ${(trial.vocal_level || '').toUpperCase()}`;
    } else {
      el.conditionChangeBannerText.textContent = `CONDITION: ${currentCondition.toUpperCase()}`;
    }
  }
  const isBystanderTrial = Boolean(trial.is_bystander_suite || state.conversationMode === 'Bystander');
  const btnLabel = (state.aiAssistant === 'Meta AI') ? 'Meta AI' : 'Gemini Live';
  if (el.btnGeminiActivatedNoAnswer) {
    el.btnGeminiActivatedNoAnswer.classList.toggle('hidden', !isBystanderTrial);
  }
  const btnSpan = el.btnGeminiActivated?.querySelector('span');
  if (btnSpan) {
    btnSpan.textContent = isBystanderTrial ? `${btnLabel} Activated - Answered Query` : `${btnLabel} Activated`;
  }
  state.previousCondition = currentCondition;

  if (el.currentConditionVal) {
    el.currentConditionVal.textContent = currentCondition;
  }
  if (el.currentHotwordVal) {
    el.currentHotwordVal.textContent = trial.phrase || trial.target_hotword || 'Hey Google';
  }
  
  const isDistractor = trial.category === 'distractor';
  if (el.categoryPill) {
    el.categoryPill.className = `tracker-pill category-pill ${isDistractor ? 'distractor' : 'positive'}`;
  }
  if (el.currentCategoryVal) {
    el.currentCategoryVal.textContent = isDistractor ? 'Distractor / Negative' : 'Positive Target';
  }

  // Update Prompt Display (moved to setTrialState)

  // Reset State & Attempts
  state.trialAttempt = 1;
  updateAttemptBadge();
  const has30Rec = is30Plus90RecordingSuite();
  const isWearerIntro = (state.trialIndex === 0 && !isBystanderTrial && has30Rec && !state.wearerIntroDone);
  const isWearerStopRecording = (state.trialIndex === 30 && !isBystanderTrial && has30Rec && !state.wearerStopRecordingDone);
  if (el.btnBack) {
    el.btnBack.disabled = isWearerIntro ? true : (state.trialIndex <= 0 && (!has30Rec || isBystanderTrial));
  }
  if (isWearerIntro) {
    setTrialState('pre_trial');
  } else if (isWearerStopRecording) {
    setTrialState('stop_recording');
  } else {
    setTrialState('idle');
  }
  resetLatencyReadouts();
  if (el.detectionResultPill) {
    el.detectionResultPill.classList.add('hidden');
  }

  // Broadcast current trial details to Phone 1 (Soundbar Node)
  broadcastTrialEvent('TRIAL_PREPARED', {
    trial_id: trial.trial_id,
    trial_index: currentNum,
    total_trials: total,
    condition: trial.condition,
    distance: trial.distance || '',
    degree: trial.degree || '',
    vocal_level: trial.vocal_level || '',
    noise_level: trial.noise_level || '',
    target_hotword: trial.target_hotword || trial.phrase || 'HEY_GOOGLE',
    phrase: trial.phrase || trial.target_hotword,
    prompt_text: trial.prompt_text || trial.phrase,
    category: trial.category || 'positive'
  });
}

function getListeningInstruction(condition) {
  return 'Trial Active';
}

function setTrialState(newState, extraInfo = '') {
  state.trialState = newState;
  el.promptCard.className = 'prompt-card';
  const isInterstitial = (newState === 'pre_trial' || newState === 'stop_recording');
  el.stateIndicatorBadge.className = `state-indicator-badge state-${isInterstitial ? 'idle' : newState}`;

  if (el.conditionChangeBanner) {
    el.conditionChangeBanner.classList.toggle('hidden', isInterstitial);
  }
  if (el.btnRetry) el.btnRetry.disabled = isInterstitial;
  if (el.btnSkip) el.btnSkip.disabled = isInterstitial;

  if (isInterstitial || newState === 'idle' || newState === 'listening' || newState === 'countdown') {
    el.detectionResultPill?.classList.add('hidden');
    if (el.detectionLatencyTag) el.detectionLatencyTag.textContent = '';
    if (el.detectionResultText) el.detectionResultText.textContent = '';
  }

  // Ensure noise audio is strictly silent unless actively in listening state
  if (isInterstitial || newState === 'idle' || newState === 'detected' || newState === 'timeout') {
    stopLocalConditionAudio();
  }

  if (newState === 'pre_trial') {
    el.btnStartTrial?.classList.remove('hidden');
    el.actionButtonsGroup?.classList.add('hidden');
    el.stateIcon.textContent = '⏸';
    const span = el.btnStartTrial?.querySelector('span');
    if (span) span.textContent = 'Ready to Start';
    if (el.promptDisplayText) {
      el.promptDisplayText.innerHTML = `Before you begin, <span style="color: #dc2626; font-weight: 700;">please start recording your session</span> (Automatic per-trial, First-30-Trials &amp; full-batch 48kHz recording is also active). Begin recording, then click &lsquo;Ready to Start&rsquo; to begin the 30 silent recording trials.`;
    }
    el.stateText.textContent = "Start recording, then press 'Ready to Start'";
  } else if (newState === 'stop_recording') {
    // Automatically finalize the dedicated First-30-Trials recording right as Trial 30 finishes!
    stopAndFinalizeFirst30Recording();
    el.btnStartTrial?.classList.remove('hidden');
    el.actionButtonsGroup?.classList.add('hidden');
    el.stateIcon.textContent = '⏹';
    const span = el.btnStartTrial?.querySelector('span');
    if (span) span.textContent = 'Continue to Noise Trials →';
    if (el.promptDisplayText) {
      el.promptDisplayText.innerHTML = `<span style="color: #dc2626; font-weight: 700;">STOP RECORDING.</span><br><br>Stop your external recording now (<strong style="color:#059669;">✅ First 30 Trials audio file saved!</strong> Per-trial &amp; full-session batch recording will continue automatically). When ready, continue to begin the 90 noise environment trials.`;
    }
    el.stateText.textContent = "Stop recording, then press 'Continue to Noise Trials →'";
  } else if (newState === 'idle') {
    el.btnStartTrial?.classList.remove('hidden');
    el.actionButtonsGroup?.classList.add('hidden');
    el.stateIcon.textContent = '⏸';
    const span = el.btnStartTrial?.querySelector('span');
    if (span) span.textContent = 'Start Trial';
    const trial = getCurrentTrial();
    const cond = (trial?.condition || '').toLowerCase();
    let noiseNotice = '';
    if (cond.includes('babble') || cond.includes('traffic') || cond.includes('industrial')) {
      noiseNotice = `<span style="font-size: 1.05rem; font-weight: 600; color: #d97706; display: block; margin-top: 0.35rem;">🔊 Background noise will begin once you click Start Trial.</span>`;
    }
    if (el.promptDisplayText) {
      const posLine = trial?.is_bystander_suite
        ? `<span style="font-size: 1.25rem; font-weight: 700; color: #0284c7; display: block; margin-top: 0.4rem;">Position: ${trial.distance} at ${trial.degree}</span>`
        : '';
      if (state.trialIndex === 0) {
        el.promptDisplayText.innerHTML = `Get Ready.${posLine}${noiseNotice}<span style="font-size: 1.2rem; font-weight: 500; color: #0f172a; display: block; margin-top: 0.4rem;">Read the instructions on the next page before you begin.</span>`;
      } else {
        const asstName = (state.aiAssistant === 'Meta AI') ? 'Meta AI' : 'Gemini';
        const prevTrialObj = state.activeSuite?.trials?.[state.trialIndex - 1];
        const prevCond = (prevTrialObj?.condition || '').toLowerCase();
        const wasFanCondition = !trial?.is_bystander_suite && (prevCond.includes('breeze') || prevCond.includes('wind') || prevCond.includes('calm') || prevCond.includes('indoor'));
        const wasMusicCondition = !trial?.is_bystander_suite && prevCond.includes('music');
        const isStartOfNewBlock = (state.trialIndex % 3 === 0);
        let hangupText = `Hang up on ${asstName}.`;
        if (isStartOfNewBlock && wasFanCondition) {
          hangupText = `Turn the fan off and hang up on ${asstName}.`;
        } else if (isStartOfNewBlock && wasMusicCondition) {
          hangupText = `Pause the video and hang up on ${asstName}.`;
        }
        el.promptDisplayText.innerHTML = `<span style="color: #dc2626; font-weight: 700;">${hangupText}</span> Get Ready.${posLine}${noiseNotice}<span style="font-size: 1.2rem; font-weight: 500; color: #0f172a; display: block; margin-top: 0.4rem;">Read the instructions on the next page before you begin.</span>`;
      }
    }
    el.stateText.textContent = "Press Start Trial to begin";
  } else if (newState === 'listening') {
    el.btnStartTrial?.classList.add('hidden');
    el.actionButtonsGroup?.classList.remove('hidden');
    el.promptCard.classList.add('listening');
    el.stateIcon.textContent = '🎤';
    const trial = getCurrentTrial();
    if (trial) setupTrialPromptAndNoise(trial);
    if (el.promptDisplayText) {
      el.promptDisplayText.innerHTML = trial?.prompt_html || trial?.prompt_text || 'Now speak';
    }
    el.stateText.textContent = getListeningInstruction(trial?.condition);
  } else if (newState === 'detected') {
    el.btnStartTrial?.classList.remove('hidden');
    el.actionButtonsGroup?.classList.add('hidden');
    el.promptCard.classList.add('detected');
    el.stateIcon.textContent = '✅';
    el.stateText.textContent = `Trigger Detected: ${extraInfo}`;
    const span = el.btnStartTrial?.querySelector('span');
    if (span) span.textContent = 'Next Trial →';
  } else if (newState === 'timeout') {
    el.btnStartTrial?.classList.remove('hidden');
    el.actionButtonsGroup?.classList.add('hidden');
    el.promptCard.classList.add('distractor-rejected');
    el.stateIcon.textContent = '⏱';
    el.stateText.textContent = extraInfo || 'Stayed Asleep';
    const span = el.btnStartTrial?.querySelector('span');
    if (span) span.textContent = 'Next Trial →';
  }
}

function onStartNextClick() {
  if (state.trialState === 'pre_trial') {
    state.wearerIntroDone = true;
    loadCurrentTrial();
  } else if (state.trialState === 'stop_recording') {
    state.wearerStopRecordingDone = true;
    loadCurrentTrial();
  } else if (state.trialState === 'idle') {
    startTrial();
  } else if (state.trialState === 'listening') {
    finishTrial('MANUAL_STOP');
  } else if (state.trialState === 'detected' || state.trialState === 'timeout') {
    nextTrial();
  }
}

let localConditionAudio = null;

function stopLocalConditionAudio() {
  if (localConditionAudio) {
    try {
      localConditionAudio.pause();
      localConditionAudio.currentTime = 0;
    } catch (e) {}
    localConditionAudio = null;
  }
  const noiseBadge = document.getElementById('runner-noise-indicator');
  if (noiseBadge) {
    noiseBadge.style.display = 'none';
    noiseBadge.classList.add('hidden');
  }
}

function playLocalConditionAudio(trial) {
  try {
    stopLocalConditionAudio();
    if (!trial || trial.is_bystander_suite) return;
    // Only play locally on the laptop if no remote soundbar phone is actively connected
    const hasRemoteSoundbar = (typeof peerClients !== 'undefined') && Array.from(peerClients).some(c => c && c.open);
    if (hasRemoteSoundbar) return;

    const cond = (trial.condition || '').toLowerCase();
    let trackUrl = null;
    let trackLabel = '';
    if (cond.includes('multi-talker babble') || cond.includes('babble')) {
      trackUrl = '/audio/Multi_Talker_Babble/babble.mp3?v=2';
      trackLabel = '🔊 Noise Active: Multi-Talker Babble';
    } else if (cond.includes('traffic') || cond.includes('industrial')) {
      trackUrl = '/audio/Traffic_Industrial/TRA3.mp3?v=2';
      trackLabel = '🔊 Noise Active: Traffic / Industrial';
    }

    if (trackUrl) {
      state.currentAudioTrack = trackUrl;
      localConditionAudio = new Audio(trackUrl);
      localConditionAudio.loop = true;
      localConditionAudio.volume = 0.85;
      localConditionAudio.play().then(() => {
        const noiseBadge = document.getElementById('runner-noise-indicator');
        const noiseText = document.getElementById('runner-noise-text');
        if (noiseBadge) {
          if (noiseText) noiseText.textContent = trackLabel;
          noiseBadge.classList.remove('hidden');
          noiseBadge.style.display = 'inline-flex';
        }
      }).catch(err => {
        console.warn('[LOCAL AUDIO] Playback error:', err);
      });
    }
  } catch (err) {
    console.warn('[LOCAL AUDIO] Error starting condition audio:', err);
  }
}

function startTrial() {
  const trial = getCurrentTrial();
  if (!trial) return;

  clearTimers();
  state.isAudioOnsetDetected = false;
  state.isSpeechEnded = false;
  state.isEarconDetected = false;
  state.earconConsecutiveFrames = 0;
  state.detectedHotword = null;
  state.tAudioOnset = 0;
  state.tSpeechEnd = 0;
  state.tEarconOnset = 0;
  state.tLastSpeechActive = 0;
  state.tDeviceTrigger = 0;
  state.currentAudioTrack = null;
  state.currentTrialSpokenTranscript = '';
  resetLatencyReadouts();
  const speechPill = document.getElementById('live-speech-pill');
  if (speechPill) speechPill.classList.add('hidden');

  // Broadcast trial start to Phone 1 (starts background noise loop and updates display)
  broadcastTrialEvent('TRIAL_STARTED', {
    trial_id: trial.trial_id,
    condition: trial.condition,
    noise_level: trial.noise_level || '',
    target_hotword: trial.target_hotword || trial.phrase || 'HEY_GOOGLE',
    phrase: trial.phrase || trial.target_hotword,
    prompt_text: trial.prompt_text || trial.phrase,
    category: trial.category || 'positive',
    audio_url: trial.audio_url || (trial.drive_id ? `/api/drive_audio?id=${trial.drive_id}` : null)
  });

  // Play condition audio locally on laptop if no remote soundbar is connected
  playLocalConditionAudio(trial);

  // Start listening immediately
  beginListeningWindow(trial);
}

function beginListeningWindow(trial) {
  state.tPromptStart = Date.now();
  setTrialState('listening');

  if (state.enableAudioRecording) {
    // Ensure continuous Full-Session Batch Recording is running from session start until all trials finish
    if (!state.isRecordingBatchAudio || !state.batchMediaRecorder || state.batchMediaRecorder.state === 'inactive') {
      startBatchSessionRecording(state.batchChunkSeq === 0);
    }

    // Ensure First-30-Trials Audio Recording is running while trialIndex < 30
    if (state.trialIndex < 30 && (!state.isRecordingFirst30Audio || !state.first30MediaRecorder || state.first30MediaRecorder.state === 'inactive')) {
      startFirst30SessionRecording(state.first30ChunkSeq === 0);
    }

    // Start synchronized trial audio recording
    startTrialAudioRecording();
  }
}

function onDeviceHotwordTrigger(hotword, confidence = 1.0, timestampMs = null) {
  if (state.trialState !== 'listening' && state.trialState !== 'idle') return;

  // Prefer the acoustically detected Earcon Chime onset timestamp over the manual button-click timestamp
  state.tDeviceTrigger = state.tEarconOnset || timestampMs || Date.now();
  state.detectedHotword = hotword.toUpperCase();
  state.detectionConfidence = confidence;

  finishTrial('TRIGGERED');
}

function finishTrial(reason) {
  clearTimers();
  stopLocalConditionAudio();
  const trial = getCurrentTrial();
  if (!trial) return;

  const now = Date.now();
  if (!state.tDeviceTrigger && reason === 'TRIGGERED') {
    state.tDeviceTrigger = state.tEarconOnset || now;
  }

  // Normalized Hotword Mapping
  function cleanHw(hw) {
    if (!hw) return 'NONE';
    const c = hw.toString().trim().toUpperCase().replace(/[_\s]+/g, '_');
    if (c === 'OKAY_GOOGLE' || c === 'OK_GOOGLE') return 'OK_GOOGLE';
    if (c === 'HEY_GOOGLE') return 'HEY_GOOGLE';
    if (c === 'OKAY_GEMINI' || c === 'OK_GEMINI') return 'OK_GEMINI';
    if (c === 'HEY_GEMINI') return 'HEY_GEMINI';
    if (c === 'OKAY_META' || c === 'OK_META') return 'OK_META';
    if (c === 'HEY_META') return 'HEY_META';
    if (c === 'NONE' || c === '') return 'NONE';
    return c;
  }

  const normTarget = cleanHw(trial.target_hotword || trial.phrase);
  const normDetected = cleanHw(state.detectedHotword);
  const TRUE_TARGETS = ['HEY_GOOGLE', 'OK_GOOGLE', 'HEY_GEMINI', 'OK_GEMINI', 'HEY_META', 'OK_META'];
  const isTargetHotword = TRUE_TARGETS.includes(normTarget) && trial.category !== 'distractor';
  const hasTriggered = normDetected !== 'NONE';

  // Calculate Acoustic Latency Deltas (Hotword Speech End -> Smart Glasses Earcon Onset)
  const promptToAudio = (state.tAudioOnset && state.tPromptStart) ? Math.max(0, state.tAudioOnset - state.tPromptStart) : null;
  const speechEndOffset = (state.tSpeechEnd && state.tPromptStart) ? Math.max(0, state.tSpeechEnd - state.tPromptStart) : null;
  const earconOffset = (state.tEarconOnset && state.tPromptStart) ? Math.max(0, state.tEarconOnset - state.tPromptStart) : null;

  let audioToTrigger = null;
  let totalLatency = null;
  if (hasTriggered) {
    if (state.tEarconOnset && state.tSpeechEnd && state.tEarconOnset > state.tSpeechEnd) {
      audioToTrigger = Math.max(0, state.tEarconOnset - state.tSpeechEnd);
      totalLatency = Math.max(0, state.tEarconOnset - state.tPromptStart);
    } else if (state.tEarconOnset && state.tAudioOnset && state.tEarconOnset > state.tAudioOnset) {
      audioToTrigger = Math.max(0, state.tEarconOnset - state.tAudioOnset);
      totalLatency = Math.max(0, state.tEarconOnset - state.tPromptStart);
    } else if (state.tDeviceTrigger && state.tSpeechEnd && state.tDeviceTrigger > state.tSpeechEnd) {
      audioToTrigger = Math.max(0, state.tDeviceTrigger - state.tSpeechEnd);
      totalLatency = Math.max(0, state.tDeviceTrigger - state.tPromptStart);
    } else if (state.tDeviceTrigger && state.tAudioOnset && state.tDeviceTrigger > state.tAudioOnset) {
      audioToTrigger = Math.max(0, state.tDeviceTrigger - state.tAudioOnset);
      totalLatency = Math.max(0, state.tDeviceTrigger - state.tPromptStart);
    } else if (state.tDeviceTrigger && state.tPromptStart) {
      totalLatency = Math.max(0, state.tDeviceTrigger - state.tPromptStart);
      audioToTrigger = totalLatency;
    }
  }

  // Latency Metrics (safe check)
  if (el.valPromptToAudio) el.valPromptToAudio.textContent = promptToAudio !== null ? `${promptToAudio} ms` : '-- ms';
  if (el.valAudioToTrigger) el.valAudioToTrigger.textContent = audioToTrigger !== null ? `${audioToTrigger} ms` : '-- ms';
  if (el.valTotalLatency) el.valTotalLatency.textContent = totalLatency !== null ? `${totalLatency} ms` : '-- ms';

  // Classification Rules:
  // - True Hotwords ('Hey Google', 'OK Google', 'Hey Meta', 'OK Meta'):
  //     Correct trigger -> TRUE_POSITIVE
  //     Wrong trigger -> FALSE_NEGATIVE
  //     Undetected -> FALSE_NEGATIVE
  // - Non-Hotwords (Anything aside from true hotwords):
  //     Any trigger -> FALSE_POSITIVE
  //     Undetected -> TRUE_NEGATIVE
  let classification = 'TRUE_NEGATIVE';
  if (isTargetHotword) {
    const isAssistantActivated = (state.aiAssistant === 'Meta AI' && normDetected === 'META_AI_ACTIVATED') ||
                                 (state.aiAssistant !== 'Meta AI' && normDetected === 'GEMINI_LIVE_ACTIVATED');
    if (hasTriggered && (normDetected === normTarget || isAssistantActivated)) {
      classification = 'TRUE_POSITIVE';
    } else if (hasTriggered) {
      classification = 'FALSE_NEGATIVE';
    } else {
      classification = 'FALSE_NEGATIVE';
    }
  } else {
    if (hasTriggered) {
      classification = 'FALSE_POSITIVE';
    } else {
      classification = 'TRUE_NEGATIVE';
    }
  }

  // Purely Factual Visual Display (No confusing checkmark on undetected)
  if (hasTriggered) {
    el.detectionResultPill.classList.remove('hidden');
    el.detectionResultPill.classList.remove('pill-danger');
    el.detectionResultText.textContent = `Trigger: ${normDetected}`;
    el.detectionLatencyTag.textContent = `Earcon: ${audioToTrigger || totalLatency}ms`;
    setTrialState('detected', `${normDetected} (Earcon Latency: ${audioToTrigger || totalLatency}ms)`);
  } else {
    el.detectionResultPill.classList.remove('hidden');
    el.detectionResultPill.classList.add('pill-danger');
    el.detectionResultText.textContent = `Result: STAYED_ASLEEP`;
    el.detectionLatencyTag.textContent = `(Undetected)`;
    setTrialState('timeout', 'Window Closed (Stayed Asleep)');
  }

  // Record Trial
  const responseOutcome = state.lastResponseOutcome || (hasTriggered ? 'ACTIVATED_ANSWERED_QUERY' : 'STAYED_ASLEEP');
  state.lastResponseOutcome = null;
  const batchOffsetSec = (state.batchRecordingStartMs && state.tPromptStart >= state.batchRecordingStartMs)
    ? Math.max(0, Math.round((state.tPromptStart - state.batchRecordingStartMs) / 10) / 100)
    : null;
  const record = {
    attempts: state.trialAttempt || 1,
    trial_id: trial.trial_id,
    ai_assistant: state.aiAssistant || 'Gemini Live - Android',
    conversation_mode: state.conversationMode || 'Wearer',
    condition: trial.condition,
    distance: trial.distance || '',
    degree: trial.degree || '',
    vocal_level: trial.vocal_level || trial.noise_level || '',
    noise_level: trial.noise_level || '',
    phrase: trial.phrase,
    prompt_text: trial.prompt_text,
    spoken_transcript: state.currentTrialSpokenTranscript || trial.phrase || '',
    category: isTargetHotword ? 'positive' : 'distractor',
    target_hotword: isTargetHotword ? normTarget : 'NON_HOTWORD',
    detected_hotword: hasTriggered ? normDetected : 'UNDETECTED',
    response_outcome: responseOutcome,
    classification: classification,
    confidence_score: state.detectionConfidence,
    prompt_start_ms: state.tPromptStart,
    audio_onset_ms: state.tAudioOnset || null,
    speech_end_offset_ms: speechEndOffset,
    earcon_onset_offset_ms: earconOffset,
    device_trigger_ms: hasTriggered ? (state.tEarconOnset || state.tDeviceTrigger || null) : null,
    prompt_to_audio_delta_ms: promptToAudio,
    audio_to_trigger_delta_ms: audioToTrigger,
    earcon_latency_ms: audioToTrigger,
    total_latency_delta_ms: totalLatency,
    batch_offset_sec: batchOffsetSec,
    audio_track_played: state.currentAudioTrack || 'none',
    active_mic_channel: state.activeMicChannel || 'TX1',
  };

  // Upsert record
  const existingIdx = state.trialRecords.findIndex(r => r.trial_id === trial.trial_id);
  if (existingIdx >= 0) {
    state.trialRecords[existingIdx] = record;
  } else {
    state.trialRecords.push(record);
  }

  // Update Setup tab completed counter
  const setupCount = document.getElementById('setup-trials-count');
  if (setupCount) {
    setupCount.textContent = `Completed: ${state.trialRecords.length} Trials`;
  }

  // Stop, run exact 48kHz waveform Earcon latency analysis, and upload synchronized trial audio
  stopAndUploadTrialAudio(trial, record);

  // Send to backend
  broadcastTrialEvent('TRIAL_COMPLETED', record);
}

function nextTrial() {
  if (!state.activeSuite || !state.activeSuite.trials) return;
  if (state.trialIndex < state.activeSuite.trials.length - 1) {
    state.trialIndex++;
    if (state.trialIndex >= 30 && state.isRecordingFirst30Audio) {
      stopAndFinalizeFirst30Recording();
    }
    loadCurrentTrial();
  } else {
    switchView('setup');
    alert('All trials completed in this suite! Auto-downloading session data CSV...');
    finalizeSession();
  }
}

let navToastTimer = null;
function triggerNavActionFeedback(actionType, message) {
  const btnMap = {
    back: { btn: el.btnBack, btnCls: 'btn-flash-back', cardCls: 'card-flash-back', toastCls: 'toast-back' },
    retry: { btn: el.btnRetry, btnCls: 'btn-flash-retry', cardCls: 'card-flash-retry', toastCls: 'toast-retry' },
    skip: { btn: el.btnSkip, btnCls: 'btn-flash-skip', cardCls: 'card-flash-skip', toastCls: 'toast-skip' }
  };
  const cfg = btnMap[actionType];
  if (!cfg) return;

  if (cfg.btn) {
    cfg.btn.classList.remove('btn-flash-back', 'btn-flash-retry', 'btn-flash-skip');
    void cfg.btn.offsetWidth;
    cfg.btn.classList.add(cfg.btnCls);
    setTimeout(() => cfg.btn.classList.remove(cfg.btnCls), 380);
  }

  if (el.promptCard) {
    el.promptCard.classList.remove('card-flash-back', 'card-flash-retry', 'card-flash-skip');
    void el.promptCard.offsetWidth;
    el.promptCard.classList.add(cfg.cardCls);

    let toast = document.getElementById('nav-action-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nav-action-toast';
      toast.className = 'nav-action-toast';
      const header = el.promptCard.querySelector('.prompt-card-header');
      if (header && header.parentNode) {
        header.parentNode.insertBefore(toast, header);
      } else {
        el.promptCard.prepend(toast);
      }
    }
    toast.className = `nav-action-toast ${cfg.toastCls}`;
    toast.textContent = message;
    toast.style.display = 'inline-flex';
    toast.style.opacity = '1';

    if (navToastTimer) clearTimeout(navToastTimer);
    navToastTimer = setTimeout(() => {
      if (toast) {
        toast.style.opacity = '0';
        setTimeout(() => {
          if (toast && toast.style.opacity === '0') toast.style.display = 'none';
        }, 200);
      }
    }, 1400);
  }
}

function prevTrial() {
  abortTrialAudioRecording();
  const trial = getCurrentTrial();
  const isBystanderTrial = Boolean(trial?.is_bystander_suite || state.conversationMode === 'Bystander');
  const has30Rec = is30Plus90RecordingSuite();
  if (state.trialIndex === 0 && !isBystanderTrial && has30Rec && state.trialState !== 'pre_trial') {
    state.wearerIntroDone = false;
    loadCurrentTrial();
    return;
  }
  if (state.trialIndex === 30 && !isBystanderTrial && has30Rec && state.trialState !== 'stop_recording') {
    state.wearerStopRecordingDone = false;
    loadCurrentTrial();
    return;
  }
  if (state.trialIndex > 0) {
    if (state.trialIndex === 30) {
      state.wearerStopRecordingDone = false;
    }
    state.trialIndex--;
    loadCurrentTrial();
    const total = state.activeSuite?.trials?.length || 0;
    triggerNavActionFeedback('back', `⬅️ Went Back to Trial #${state.trialIndex + 1} of ${total}`);
  }
}

function retryTrial() {
  clearTimers();
  abortTrialAudioRecording();
  const nextAttempt = (state.trialAttempt || 1) + 1;
  const trial = getCurrentTrial();
  if (trial) {
    state.trialRecords = state.trialRecords.filter(r => r.trial_id !== trial.trial_id);
  }
  loadCurrentTrial();
  state.trialAttempt = nextAttempt;
  updateAttemptBadge();
  triggerNavActionFeedback('retry', `🔄 Retrying Trial #${state.trialIndex + 1} (Attempt #${nextAttempt})`);
  startTrial();
}

function skipTrial() {
  const skippedTrialNum = state.trialIndex + 1;
  const trial = getCurrentTrial();
  if (trial) {
    const batchOffsetSec = (state.batchRecordingStartMs && state.tPromptStart && state.tPromptStart >= state.batchRecordingStartMs)
      ? Math.max(0, Math.round((state.tPromptStart - state.batchRecordingStartMs) / 10) / 100)
      : null;
    const record = {
      attempts: state.trialAttempt || 1,
      trial_id: trial.trial_id,
      ai_assistant: state.aiAssistant || 'Gemini Live - Android',
      conversation_mode: state.conversationMode || 'Wearer',
      condition: trial.condition,
      distance: trial.distance || '',
      degree: trial.degree || '',
      vocal_level: trial.vocal_level || trial.noise_level || '',
      noise_level: trial.noise_level || '',
      phrase: trial.phrase,
      prompt_text: trial.prompt_text,
      category: trial.category || 'positive',
      target_hotword: (trial.target_hotword || 'NONE').toUpperCase(),
      detected_hotword: 'SKIPPED',
      classification: 'SKIPPED',
      response_outcome: 'SKIPPED',
      confidence_score: null,
      prompt_start_ms: state.tPromptStart || null,
      audio_onset_ms: null,
      device_trigger_ms: null,
      prompt_to_audio_delta_ms: null,
      audio_to_trigger_delta_ms: null,
      total_latency_delta_ms: null,
      batch_offset_sec: batchOffsetSec,
      audio_track_played: state.currentAudioTrack || 'none',
      active_mic_channel: state.activeMicChannel || 'TX1',
    };
    const existingIdx = state.trialRecords.findIndex(r => r.trial_id === trial.trial_id);
    if (existingIdx >= 0) {
      state.trialRecords[existingIdx] = record;
    } else {
      state.trialRecords.push(record);
    }
  }
  nextTrial();
  triggerNavActionFeedback('skip', `⏭️ Skipped Trial #${skippedTrialNum} → Now on Trial #${state.trialIndex + 1}`);
}

function toggleEditPrompt() {
  const isEditing = !el.promptEditInput.classList.contains('hidden');
  if (isEditing) {
    const newText = el.promptEditInput.value;
    el.promptDisplayText.textContent = newText;
    const trial = getCurrentTrial();
    if (trial) trial.prompt_text = newText;
    el.promptEditInput.classList.add('hidden');
    el.promptDisplayText.style.display = 'block';
    el.editPromptBtn.textContent = 'Edit';
  } else {
    el.promptEditInput.classList.remove('hidden');
    el.promptDisplayText.style.display = 'none';
    el.promptEditInput.focus();
    el.editPromptBtn.textContent = 'Save';
  }
}

function clearTimers() {
  if (state.countdownTimer) clearInterval(state.countdownTimer);
  if (state.listenTimer) clearTimeout(state.listenTimer);
}

function resetLatencyReadouts() {
  if (el.valPromptToAudio) el.valPromptToAudio.textContent = '-- ms';
  if (el.valAudioToTrigger) el.valAudioToTrigger.textContent = '-- ms';
  if (el.valTotalLatency) el.valTotalLatency.textContent = '-- ms';
  updateRunnerVisualTimeline(null, null, null, null);
}

function updateRunnerVisualTimeline(onsetMs, speechEndMs, earconMs, latencyMs) {
  const statusEl = document.getElementById('runner-tl-status');
  const hwEl = document.getElementById('runner-tl-hw');
  const hwLbl = document.getElementById('runner-tl-hw-lbl');
  const gapEl = document.getElementById('runner-tl-gap');
  const gapLbl = document.getElementById('runner-tl-gap-lbl');
  const ecEl = document.getElementById('runner-tl-earcon');
  const ecLbl = document.getElementById('runner-tl-earcon-lbl');
  if (!hwEl || !ecEl) return;

  if (!onsetMs) {
    hwEl.style.display = 'none';
    if (gapEl) gapEl.style.display = 'none';
    ecEl.style.display = 'none';
    if (statusEl) statusEl.textContent = '🎙️ Trial Timeline: Listening for Hotword & Glasses Earcon...';
    return;
  }

  const maxMs = Math.max(5000, (earconMs || speechEndMs || onsetMs) + 1400);
  const endMs = speechEndMs || (onsetMs + 480);
  const hwLeft = Math.min(92, Math.max(0, (onsetMs / maxMs) * 100));
  const hwWidth = Math.min(100 - hwLeft, Math.max(4, ((endMs - onsetMs) / maxMs) * 100));
  hwEl.style.display = 'block';
  hwEl.style.left = `${hwLeft.toFixed(1)}%`;
  hwEl.style.width = `${hwWidth.toFixed(1)}%`;
  if (hwLbl) {
    hwLbl.textContent = speechEndMs
      ? `🗣️ ${(onsetMs / 1000).toFixed(2)}s–${(speechEndMs / 1000).toFixed(2)}s`
      : `🗣️ ${(onsetMs / 1000).toFixed(2)}s`;
  }

  if (earconMs && earconMs > endMs) {
    const gapLeft = Math.min(94, (endMs / maxMs) * 100);
    const gapWidth = Math.min(100 - gapLeft, Math.max(2, ((earconMs - endMs) / maxMs) * 100));
    if (gapEl) {
      gapEl.style.display = 'flex';
      gapEl.style.left = `${gapLeft.toFixed(1)}%`;
      gapEl.style.width = `${gapWidth.toFixed(1)}%`;
    }
    const lat = latencyMs !== null && latencyMs !== undefined ? latencyMs : Math.round(earconMs - endMs);
    if (gapLbl) gapLbl.textContent = `+${lat}ms`;

    const ecLeft = Math.min(98, (earconMs / maxMs) * 100);
    ecEl.style.display = 'block';
    ecEl.style.left = `${ecLeft.toFixed(1)}%`;
    if (ecLbl) ecLbl.textContent = `🔔 ${(earconMs / 1000).toFixed(2)}s`;
    if (statusEl) {
      statusEl.innerHTML = `🎯 <span style="color:#38bdf8;">Hotword: ${(onsetMs / 1000).toFixed(2)}s–${(endMs / 1000).toFixed(2)}s</span> &rarr; <span style="color:#34d399;">Earcon: ${(earconMs / 1000).toFixed(2)}s</span> (<strong style="color:#fbbf24;">Latency: ${lat} ms</strong>)`;
    }
  } else {
    if (gapEl) gapEl.style.display = 'none';
    ecEl.style.display = 'none';
    if (statusEl) {
      statusEl.innerHTML = speechEndMs
        ? `🗣️ <span style="color:#38bdf8;">Hotword: ${(onsetMs / 1000).toFixed(2)}s–${(speechEndMs / 1000).toFixed(2)}s</span> — Waiting for 🔔 Earcon...`
        : `🗣️ <span style="color:#38bdf8;">Hotword Onset: ${(onsetMs / 1000).toFixed(2)}s</span>...`;
    }
  }
}

// -------------------------------------------------------------
// Audio & Voice Activity Detection (VAD) + Synchronized Recording
// -------------------------------------------------------------
let speechRecognizer = null;

function updateAudioRecIndicator(status, extraInfo) {
  const badgeVal = document.getElementById('audio-rec-val');
  if (!badgeVal) return;
  if (!state.enableAudioRecording || status === 'disabled') {
    badgeVal.textContent = '🔇 OFF (Click to Enable)';
    badgeVal.style.color = '#94a3b8';
    badgeVal.style.fontWeight = '600';
    return;
  }
  if (status === 'recording') {
    badgeVal.textContent = state.isRecordingBatchAudio ? '🔴 Trial + Batch Rec' : '🔴 Recording...';
    badgeVal.style.color = '#f87171';
    badgeVal.style.fontWeight = 'bold';
  } else if (status === 'saving') {
    badgeVal.textContent = '💾 Saving...';
    badgeVal.style.color = '#38bdf8';
    badgeVal.style.fontWeight = '600';
  } else if (status === 'saved') {
    badgeVal.textContent = state.isRecordingBatchAudio ? '🟢 Saved (Batch Rec)' : '🟢 Saved';
    badgeVal.style.color = '#4ade80';
    badgeVal.style.fontWeight = '600';
    setTimeout(() => {
      if (badgeVal.textContent && badgeVal.textContent.startsWith('🟢 Saved')) {
        updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
      }
    }, 2500);
  } else if (status === 'ready') {
    if (state.isRecordingBatchAudio) {
      badgeVal.textContent = '🟠 Batch Rec Active';
      badgeVal.style.color = '#fb923c';
      badgeVal.style.fontWeight = '700';
    } else {
      badgeVal.textContent = '🟢 Ready';
      badgeVal.style.color = '#34d399';
      badgeVal.style.fontWeight = '500';
    }
  } else {
    badgeVal.textContent = extraInfo || 'Standby';
    badgeVal.style.color = '#94a3b8';
    badgeVal.style.fontWeight = 'normal';
  }
}

async function setAudioRecordingEnabled(enabled, fromModal = false) {
  state.enableAudioRecording = Boolean(enabled);

  const modalCheck = document.getElementById('modal-check-audio-recording');
  const setupCheck = document.getElementById('check-enable-audio-recording');
  if (modalCheck && modalCheck.checked !== state.enableAudioRecording) {
    modalCheck.checked = state.enableAudioRecording;
  }
  if (setupCheck && setupCheck.checked !== state.enableAudioRecording) {
    setupCheck.checked = state.enableAudioRecording;
  }

  // Toggle visibility of acoustic UI widgets in the runner so No-Audio mode is clean
  const feedbackStrip = document.querySelector('.audio-feedback-strip');
  const timelineBar = document.getElementById('runner-acoustic-timeline');
  const first30BtnRunner = document.getElementById('btn-export-first30-audio-runner');
  const batchBtnRunner = document.getElementById('btn-export-batch-audio-runner');
  const micBadge = document.getElementById('audio-input-badge');
  if (feedbackStrip) feedbackStrip.style.display = state.enableAudioRecording ? 'flex' : 'none';
  if (timelineBar) timelineBar.style.display = state.enableAudioRecording ? 'flex' : 'none';
  if (first30BtnRunner) first30BtnRunner.style.display = state.enableAudioRecording ? '' : 'none';
  if (batchBtnRunner) batchBtnRunner.style.display = state.enableAudioRecording ? '' : 'none';
  if (micBadge) micBadge.style.opacity = state.enableAudioRecording ? '1' : '0.45';

  if (!state.enableAudioRecording) {
    abortTrialAudioRecording();
    try { await stopAndFinalizeFirst30Recording(); } catch (e) {}
    try { await stopAndFinalizeBatchRecording(); } catch (e) {}
    if (speechRecognizer) {
      try { speechRecognizer.stop(); } catch (e) {}
    }
    if (state.micStream) {
      try { state.micStream.getTracks().forEach(t => t.stop()); } catch (e) {}
      state.micStream = null;
    }
    if (state.audioContext && state.audioContext.state !== 'closed') {
      try { state.audioContext.close(); } catch (e) {}
      state.audioContext = null;
    }
    updateAudioRecIndicator('disabled');
    logEntry('[AUDIO REC] 🔇 Audio Recording DISABLED for this session (No audio files will be recorded).', 'system');
    if (state.trialState === 'pre_trial' || state.trialState === 'stop_recording') {
      loadCurrentTrial();
    }
  } else {
    logEntry('[AUDIO REC] 🎙️ Audio Recording ENABLED.', 'system');
    updateAudioRecIndicator('standby', 'Connecting...');
    if (!fromModal) {
      await initAudioVAD();
      if (state.sessionStarted || state.activeSession) {
        startBatchSessionRecording(state.batchChunkSeq === 0);
        if (state.trialIndex < 30) {
          startFirst30SessionRecording(state.first30ChunkSeq === 0);
        }
      }
    }
  }
}
window.setAudioRecordingEnabled = setAudioRecordingEnabled;

async function startBatchSessionRecording(forceRestart = false) {
  if (!state.enableAudioRecording) {
    updateAudioRecIndicator('disabled');
    return;
  }
  if (!state.micStream) {
    await initAudioVAD();
    if (!state.micStream) return;
  }

  if (state.batchMediaRecorder && state.batchMediaRecorder.state === 'recording' && !forceRestart) {
    return;
  }

  try {
    if (state.batchMediaRecorder && state.batchMediaRecorder.state !== 'inactive') {
      try {
        state.batchMediaRecorder.onstop = null;
        state.batchMediaRecorder.stop();
      } catch (e) {}
    }

    if (forceRestart || state.batchChunkSeq === 0) {
      state.batchChunkSeq = 0;
      state.batchRecordingStartMs = Date.now();
      state.pendingBatchChunkUploads = [];
    }

    const mimeType = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))
      ? 'audio/webm;codecs=opus'
      : ((typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm')) ? 'audio/webm' : '');
    const options = mimeType ? { mimeType } : {};
    const streamToRecord = state.activeRecordingStream || state.micStream;

    state.batchMediaRecorder = new MediaRecorder(streamToRecord, options);
    state.batchMediaRecorder.ondataavailable = (e) => {
      if (!e.data || e.data.size === 0) return;
      const chunkBlob = e.data;
      const seqNum = state.batchChunkSeq++;
      const batchStart = state.batchRecordingStartMs || Date.now();

      const uploadTask = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const resultStr = (reader.result || '').toString();
            const base64Data = resultStr.includes(',') ? resultStr.split(',')[1] : '';
            if (!base64Data) {
              resolve(null);
              return;
            }
            const resp = await fetch('/api/session/upload_batch_chunk', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                session_id: (state.activeSession && state.activeSession.session_id) || 'session_current',
                seq: seqNum,
                batch_start_ms: batchStart,
                audio_base64: base64Data
              })
            });
            const res = await resp.json().catch(() => null);
            if (res && res.batch_audio_file) {
              state.batchAudioFile = res.batch_audio_file;
            }
            resolve(res);
          } catch (err) {
            console.warn('[BATCH REC] Chunk upload error:', err);
            resolve(null);
          }
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(chunkBlob);
      });

      state.pendingBatchChunkUploads.push(uploadTask);
      uploadTask.finally(() => {
        const idx = state.pendingBatchChunkUploads.indexOf(uploadTask);
        if (idx >= 0) state.pendingBatchChunkUploads.splice(idx, 1);
      });
    };

    // Flush a continuous WebM segment every 4 seconds throughout the entire session
    state.batchMediaRecorder.start(4000);
    state.isRecordingBatchAudio = true;
    logEntry(`[BATCH REC] 🟠 Continuous Full-Session Batch Audio Recording started (48 kHz stream)`, 'system');
    if (!state.isRecordingTrialAudio) {
      updateAudioRecIndicator('ready');
    }
  } catch (err) {
    console.warn('[BATCH REC] Failed to start continuous batch MediaRecorder:', err);
  }
}

async function stopAndFinalizeBatchRecording() {
  if (state.batchMediaRecorder && state.batchMediaRecorder.state !== 'inactive') {
    const rec = state.batchMediaRecorder;
    state.batchMediaRecorder = null;
    state.isRecordingBatchAudio = false;
    await new Promise((resolve) => {
      rec.onstop = () => resolve();
      try {
        rec.stop();
      } catch (e) {
        resolve();
      }
    });
  } else {
    state.isRecordingBatchAudio = false;
  }

  if (state.pendingBatchChunkUploads && state.pendingBatchChunkUploads.length > 0) {
    try {
      await Promise.allSettled([...state.pendingBatchChunkUploads]);
    } catch (e) {}
  }
  updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
}

async function startFirst30SessionRecording(forceRestart = false) {
  if (!state.enableAudioRecording) return;
  if (!state.micStream) {
    await initAudioVAD();
    if (!state.micStream) return;
  }

  if (state.first30MediaRecorder && state.first30MediaRecorder.state === 'recording' && !forceRestart) {
    return;
  }

  try {
    if (state.first30MediaRecorder && state.first30MediaRecorder.state !== 'inactive') {
      try {
        state.first30MediaRecorder.onstop = null;
        state.first30MediaRecorder.stop();
      } catch (e) {}
    }

    if (forceRestart || state.first30ChunkSeq === 0) {
      state.first30ChunkSeq = 0;
      state.first30RecordingStartMs = Date.now();
      state.pendingFirst30ChunkUploads = [];
    }

    const mimeType = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))
      ? 'audio/webm;codecs=opus'
      : ((typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm')) ? 'audio/webm' : '');
    const options = mimeType ? { mimeType } : {};
    const streamToRecord = state.activeRecordingStream || state.micStream;

    state.first30MediaRecorder = new MediaRecorder(streamToRecord, options);
    state.first30MediaRecorder.ondataavailable = (e) => {
      if (!e.data || e.data.size === 0) return;
      const chunkBlob = e.data;
      const seqNum = state.first30ChunkSeq++;
      const first30Start = state.first30RecordingStartMs || Date.now();

      const uploadTask = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const resultStr = (reader.result || '').toString();
            const base64Data = resultStr.includes(',') ? resultStr.split(',')[1] : '';
            if (!base64Data) {
              resolve(null);
              return;
            }
            const resp = await fetch('/api/session/upload_first30_chunk', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                session_id: (state.activeSession && state.activeSession.session_id) || 'session_current',
                seq: seqNum,
                first30_start_ms: first30Start,
                audio_base64: base64Data
              })
            });
            const res = await resp.json().catch(() => null);
            if (res && res.first30_audio_file) {
              state.first30AudioFile = res.first30_audio_file;
            }
            resolve(res);
          } catch (err) {
            console.warn('[FIRST30 REC] Chunk upload error:', err);
            resolve(null);
          }
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(chunkBlob);
      });

      state.pendingFirst30ChunkUploads.push(uploadTask);
      uploadTask.finally(() => {
        const idx = state.pendingFirst30ChunkUploads.indexOf(uploadTask);
        if (idx >= 0) state.pendingFirst30ChunkUploads.splice(idx, 1);
      });
    };

    state.first30MediaRecorder.start(4000);
    state.isRecordingFirst30Audio = true;
    logEntry(`[FIRST-30 REC] 🎯 Dedicated First-30-Trials Audio Recording started (T001–T030 stream)`, 'system');
  } catch (err) {
    console.warn('[FIRST30 REC] Failed to start First-30 MediaRecorder:', err);
  }
}

async function stopAndFinalizeFirst30Recording() {
  if (state.first30MediaRecorder && state.first30MediaRecorder.state !== 'inactive') {
    const rec = state.first30MediaRecorder;
    state.first30MediaRecorder = null;
    state.isRecordingFirst30Audio = false;
    await new Promise((resolve) => {
      rec.onstop = () => resolve();
      try {
        rec.stop();
      } catch (e) {
        resolve();
      }
    });
    logEntry(`[FIRST-30 REC] ✅ Dedicated First-30-Trials Audio Recording saved & finalized`, 'system');
  } else {
    state.isRecordingFirst30Audio = false;
  }

  if (state.pendingFirst30ChunkUploads && state.pendingFirst30ChunkUploads.length > 0) {
    try {
      await Promise.allSettled([...state.pendingFirst30ChunkUploads]);
    } catch (e) {}
  }
}

async function startTrialAudioRecording() {
  if (!state.enableAudioRecording) {
    updateAudioRecIndicator('disabled');
    return;
  }
  if (!state.micStream) {
    await initAudioVAD();
    if (!state.micStream) return;
  }

  // Pre-recording safeguard: Verify that we are not recording through Mac internal mic when Wireless PRO is available!
  try {
    const currentTrack = state.micStream.getAudioTracks()[0];
    const trackLabel = currentTrack ? (currentTrack.label || '') : '';
    if (/built-in|macbook|internal/i.test(trackLabel)) {
      const best = getBestAudioDevice(state.audioDevices);
      if (best && getAudioDeviceScore(best) >= 50 && best.deviceId !== currentTrack.getSettings()?.deviceId) {
        console.warn(`[AUDIO REC] Pre-trial auto-switch: diverting from "${trackLabel}" to "${best.label}"`);
        await initAudioVAD(best.deviceId);
      }
    }
  } catch (chkErr) {
    console.warn('[AUDIO REC] Pre-recording mic check:', chkErr);
  }

  try {
    if (state.trialMediaRecorder && state.trialMediaRecorder.state !== 'inactive') {
      try {
        state.trialMediaRecorder.onstop = null;
        state.trialMediaRecorder.stop();
      } catch (e) {}
    }
    state.trialAudioChunks = [];
    const mimeType = (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm;codecs=opus'))
      ? 'audio/webm;codecs=opus'
      : ((typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported('audio/webm')) ? 'audio/webm' : '');
    const options = mimeType ? { mimeType } : {};
    const streamToRecord = state.activeRecordingStream || state.micStream;
    state.trialMediaRecorder = new MediaRecorder(streamToRecord, options);
    state.trialMediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        state.trialAudioChunks.push(e.data);
      }
    };
    state.trialMediaRecorder.start(100);
    state.isRecordingTrialAudio = true;
    updateAudioRecIndicator('recording');
  } catch (err) {
    console.warn('[AUDIO REC] Failed to start MediaRecorder:', err);
  }
}

async function analyzeRecordedTrialWaveform(audioBlob) {
  try {
    if (!audioBlob || audioBlob.size < 400) return null;
    const arrayBuf = await audioBlob.arrayBuffer();
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    const decodeCtx = (state.audioContext && state.audioContext.state !== 'closed')
      ? state.audioContext
      : new Ctx();
    const audioBuf = await decodeCtx.decodeAudioData(arrayBuf.slice(0));
    if (!audioBuf || audioBuf.length < 1600) return null;

    const sr = audioBuf.sampleRate || 48000;
    const audioDurationSec = Math.round(audioBuf.duration * 1000) / 1000;
    const chData = audioBuf.getChannelData(0); // Isolated active wireless channel
    const win = Math.max(1, Math.floor(sr * 0.01)); // 10ms window
    const nFrames = Math.floor(chData.length / win);
    if (nFrames < 25) return null;

    // Precompute Goertzel / DFT basis vectors for the memorized XR Glasses Hotword Wake-Up Earcon:
    //   Note 1 (Attack, 0..90ms):  247 Hz (B3)
    //   Note 2 (Sustain, 70..280ms): 392 Hz (G4)
    //   Out-of-band speech/babble rejection frequencies: 650 Hz, 850 Hz, 1200 Hz
    const targetFreqs = [247, 392, 650, 850, 1200];
    const cosLut = {};
    const sinLut = {};
    for (const f of targetFreqs) {
      const cArr = new Float32Array(win);
      const sArr = new Float32Array(win);
      const omega = (2.0 * Math.PI * f) / sr;
      for (let j = 0; j < win; j++) {
        cArr[j] = Math.cos(omega * j);
        sArr[j] = Math.sin(omega * j);
      }
      cosLut[f] = cArr;
      sinLut[f] = sArr;
    }

    const rms = new Float32Array(nFrames);
    const e247 = new Float32Array(nFrames);
    const e392 = new Float32Array(nFrames);
    const eMid = new Float32Array(nFrames);

    for (let i = 0; i < nFrames; i++) {
      let sumSq = 0;
      let re247 = 0, im247 = 0;
      let re392 = 0, im392 = 0;
      let re650 = 0, im650 = 0;
      let re850 = 0, im850 = 0;
      let re1200 = 0, im1200 = 0;
      const base = i * win;
      const c247 = cosLut[247], s247 = sinLut[247];
      const c392 = cosLut[392], s392 = sinLut[392];
      const c650 = cosLut[650], s650 = sinLut[650];
      const c850 = cosLut[850], s850 = sinLut[850];
      const c1200 = cosLut[1200], s1200 = sinLut[1200];

      for (let j = 0; j < win; j++) {
        const s = chData[base + j] * 32768.0;
        sumSq += s * s;
        re247 += s * c247[j]; im247 += s * s247[j];
        re392 += s * c392[j]; im392 += s * s392[j];
        re650 += s * c650[j]; im650 += s * s650[j];
        re850 += s * c850[j]; im850 += s * s850[j];
        re1200 += s * c1200[j]; im1200 += s * s1200[j];
      }
      rms[i] = Math.sqrt(sumSq / win);
      e247[i] = (Math.hypot(re247, im247) / win) * 2.0;
      e392[i] = (Math.hypot(re392, im392) / win) * 2.0;
      const m650 = (Math.hypot(re650, im650) / win) * 2.0;
      const m850 = (Math.hypot(re850, im850) / win) * 2.0;
      const m1200 = (Math.hypot(re1200, im1200) / win) * 2.0;
      eMid[i] = (m650 + m850 + m1200) / 3.0;
    }

    const sortedRms = Array.from(rms).sort((a, b) => a - b);
    const noiseFloor = sortedRms[Math.floor(sortedRms.length * 0.25)] || 10.0;
    const peakRms = sortedRms[sortedRms.length - 1] || 0;
    if (peakRms < 120 || peakRms < noiseFloor * 1.8) return null;

    // 1. Scan for the Memorized XR Glasses Hotword Wake-Up Earcon Signature (247 Hz B3 -> 392 Hz G4)
    let xr_glassesEarconIdx = null;
    let bestXR GlassesScore = 0;
    const xr_glassesCandidates = [];
    for (let i = 80; i < nFrames - 28; i++) {
      let p247 = 0, a247 = 0;
      for (let k = i; k < i + 9; k++) {
        if (e247[k] > p247) p247 = e247[k];
        a247 += e247[k];
      }
      a247 /= 9.0;

      let p392 = 0, a392 = 0, aMid2 = 0;
      for (let k = i + 7; k < i + 26; k++) {
        if (e392[k] > p392) p392 = e392[k];
        a392 += e392[k];
        aMid2 += eMid[k];
      }
      a392 /= 19.0;
      aMid2 /= 19.0;

      let a247Late = 0;
      for (let k = i + 12; k < i + 26; k++) a247Late += e247[k];
      a247Late /= 14.0;

      let aRms = 1.0;
      for (let k = i; k < i + 26; k++) aRms += rms[k];
      aRms = Math.max(1.0, aRms / 26.0);

      const tonePurity = (a247 + a392) / aRms;
      if (
        p247 >= 90 &&
        a247 >= 50 &&
        p392 >= 100 &&
        a392 >= 75 &&
        a392 > a247Late * 1.25 &&
        a392 > aMid2 * 1.15 &&
        tonePurity >= 0.42
      ) {
        const score = (a247 * 0.9 + a392 * 1.6) * tonePurity - aMid2 * 0.8;
        xr_glassesCandidates.push([i, score]);
      }
    }

    if (xr_glassesCandidates.length > 0) {
      for (const [, sc] of xr_glassesCandidates) {
        if (sc > bestXR GlassesScore) bestXR GlassesScore = sc;
      }
      let firstStrongIdx = null;
      for (const [idx, sc] of xr_glassesCandidates) {
        if (sc >= bestXR GlassesScore * 0.60) {
          firstStrongIdx = idx;
          break;
        }
      }
      if (firstStrongIdx !== null) {
        while (
          firstStrongIdx > 80 &&
          e247[firstStrongIdx - 1] >= 75 &&
          e247[firstStrongIdx - 1] > eMid[firstStrongIdx - 1] * 1.1
        ) {
          firstStrongIdx--;
        }
        xr_glassesEarconIdx = firstStrongIdx;
      }
    }

    // 2. Group into acoustic speech bursts for Hotword Speech Onset & End
    const thresh = (noiseFloor > 400)
      ? Math.max(noiseFloor * 2.1, noiseFloor + 180)
      : Math.max(noiseFloor * 2.8, noiseFloor + 110);

    const bursts = [];
    let inB = false;
    let bs = 0;
    for (let idx = 0; idx < nFrames; idx++) {
      const r = rms[idx];
      if (r >= thresh && !inB) {
        inB = true;
        bs = idx;
      } else if (r < thresh && inB) {
        let allQuiet = true;
        const lookahead = Math.min(nFrames, idx + 13);
        for (let k = idx; k < lookahead; k++) {
          if (rms[k] >= thresh) {
            allQuiet = false;
            break;
          }
        }
        if (allQuiet) {
          inB = false;
          const be = idx;
          if ((be - bs) >= 4) bursts.push([bs, be]);
        }
      }
    }
    if (inB && (nFrames - bs) >= 4) {
      bursts.push([bs, nFrames]);
    }

    let candidates = bursts.filter(b => !(b[0] * 10 < 200 && (b[1] - b[0]) * 10 < 160));
    if (candidates.length === 0) candidates = bursts;

    let earconOnsetMs = null;
    let earconEndMs = null;
    let speechOnsetMs = null;
    let speechEndMs = null;

    if (xr_glassesEarconIdx !== null) {
      // Matched the exact XR Glasses Hotword Wake-Up Earcon (247Hz B3 -> 392Hz G4)!
      earconOnsetMs = xr_glassesEarconIdx * 10;
      earconEndMs = Math.min(nFrames * 10, earconOnsetMs + 380);

      const preBursts = [];
      for (const [b0, b1] of candidates) {
        if (b0 < xr_glassesEarconIdx - 12) {
          const b1Clamped = Math.min(b1, xr_glassesEarconIdx - 15);
          if ((b1Clamped - b0) >= 4) preBursts.push([b0, b1Clamped]);
        }
      }

      if (preBursts.length > 0) {
        let hwStart = preBursts[0][0];
        let hwEnd = Math.min(preBursts[0][1], hwStart + 145);
        let nextIdx = 1;
        while (nextIdx < preBursts.length) {
          const gapMs = (preBursts[nextIdx][0] - hwEnd) * 10;
          const hwDurMs = (hwEnd - hwStart) * 10;
          if (gapMs <= 240 && hwDurMs < 520) {
            hwEnd = Math.min(preBursts[nextIdx][1], hwStart + 145);
            nextIdx++;
          } else {
            break;
          }
        }
        if ((earconOnsetMs - hwEnd * 10) > 1550 && preBursts.length > nextIdx) {
          const lastB = preBursts[preBursts.length - 1];
          if ((earconOnsetMs - lastB[1] * 10) >= 180) {
            hwStart = lastB[0];
            hwEnd = Math.min(lastB[1], hwStart + 135);
          }
        }
        speechOnsetMs = hwStart * 10;
        speechEndMs = hwEnd * 10;
      } else {
        const searchEnd = Math.max(25, xr_glassesEarconIdx - 25);
        const searchStart = Math.max(15, xr_glassesEarconIdx - 180);
        let peakIdx = Math.max(20, xr_glassesEarconIdx - 95);
        let maxR = -1;
        for (let k = searchStart; k < searchEnd; k++) {
          if (rms[k] > maxR) {
            maxR = rms[k];
            peakIdx = k;
          }
        }
        const hwStart = Math.max(15, peakIdx - 35);
        const hwEnd = Math.min(xr_glassesEarconIdx - 20, peakIdx + 40);
        speechOnsetMs = hwStart * 10;
        speechEndMs = hwEnd * 10;
      }
    } else {
      // Fallback for non-XR Glasses devices (e.g. Meta AI chime)
      if (candidates.length < 2) return null;
      const hwStart = candidates[0][0];
      let hwEnd = candidates[0][1];
      let nextIdx = 1;
      while (nextIdx < candidates.length) {
        const gapMs = (candidates[nextIdx][0] - hwEnd) * 10;
        const hwDurMs = (hwEnd - hwStart) * 10;
        if (gapMs <= 240 && hwDurMs < 460) {
          hwEnd = candidates[nextIdx][1];
          nextIdx++;
        } else {
          break;
        }
      }
      for (let k = nextIdx; k < candidates.length; k++) {
        const b = candidates[k];
        const gapMs = (b[0] - hwEnd) * 10;
        const bDurMs = (b[1] - b[0]) * 10;
        if (gapMs >= 150 && gapMs <= 3800 && bDurMs >= 40) {
          earconOnsetMs = b[0] * 10;
          earconEndMs = b[1] * 10;
          break;
        }
      }
      if (earconOnsetMs === null) return null;
      speechOnsetMs = hwStart * 10;
      speechEndMs = hwEnd * 10;
    }

    const earconLatencyMs = Math.max(0, earconOnsetMs - speechEndMs);
    const onsetToEarconMs = Math.max(0, earconOnsetMs - speechOnsetMs);

    return {
      speech_onset_ms: speechOnsetMs,
      speech_end_ms: speechEndMs,
      earcon_onset_ms: earconOnsetMs,
      earcon_end_ms: earconEndMs,
      earcon_latency_ms: earconLatencyMs,
      onset_to_earcon_ms: onsetToEarconMs,
      audio_duration_sec: audioDurationSec,
      xr_glasses_chime_matched: xr_glassesEarconIdx !== null
    };
  } catch (err) {
    console.warn('[WAVEFORM EARCON] Audio buffer analysis warning:', err);
    return null;
  }
}

function stopAndUploadTrialAudio(trial, record) {
  if (!state.enableAudioRecording) {
    updateAudioRecIndicator('disabled');
    return;
  }
  if (!state.trialMediaRecorder || state.trialMediaRecorder.state === 'inactive') {
    updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
    return;
  }
  try {
    const recorder = state.trialMediaRecorder;
    state.trialMediaRecorder = null;
    state.isRecordingTrialAudio = false;
    updateAudioRecIndicator('saving');

    recorder.onstop = () => {
      try {
        if (!state.trialAudioChunks || state.trialAudioChunks.length === 0) {
          updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
          return;
        }
        const audioBlob = new Blob(state.trialAudioChunks, { type: 'audio/webm' });
        state.trialAudioChunks = [];

        const reader = new FileReader();
        reader.onloadend = async () => {
          try {
            const resultStr = (reader.result || '').toString();
            const base64Data = resultStr.includes(',') ? resultStr.split(',')[1] : '';
            if (!base64Data) {
              updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
              return;
            }

            // Perform sample-accurate 48kHz waveform analysis to extract exact Hotword Speech End -> XR Glasses Glasses Earcon Onset latency
            const isActivated = record.detected_hotword && record.detected_hotword !== 'UNDETECTED' && record.detected_hotword !== 'SKIPPED';
            if (isActivated) {
              const wf = await analyzeRecordedTrialWaveform(audioBlob);
              if (wf && wf.earcon_latency_ms !== null) {
                const t0 = record.prompt_start_ms || Date.now();
                record.prompt_to_audio_delta_ms = wf.speech_onset_ms;
                record.speech_end_offset_ms = wf.speech_end_ms;
                record.earcon_onset_offset_ms = wf.earcon_onset_ms;
                record.audio_to_trigger_delta_ms = wf.earcon_latency_ms;
                record.earcon_latency_ms = wf.earcon_latency_ms;
                record.total_latency_delta_ms = wf.earcon_onset_ms;
                record.audio_onset_ms = t0 + wf.speech_onset_ms;
                record.device_trigger_ms = t0 + wf.earcon_onset_ms;
                if (wf.audio_duration_sec) record.audio_duration_sec = wf.audio_duration_sec;

                if (el.valPromptToAudio) el.valPromptToAudio.textContent = `${wf.speech_onset_ms} ms`;
                if (el.valAudioToTrigger) el.valAudioToTrigger.textContent = `${wf.earcon_latency_ms} ms`;
                if (el.valTotalLatency) el.valTotalLatency.textContent = `${wf.earcon_onset_ms} ms`;
                if (el.detectionLatencyTag) el.detectionLatencyTag.textContent = `Earcon: ${wf.earcon_latency_ms}ms`;
                updateRunnerVisualTimeline(wf.speech_onset_ms, wf.speech_end_ms, wf.earcon_onset_ms, wf.earcon_latency_ms);

                logEntry(`[EARCON WAVEFORM] 🔔 ${record.trial_id}: Hotword=${wf.speech_onset_ms}..${wf.speech_end_ms}ms | XR Glasses Earcon=${wf.earcon_onset_ms}ms | Hotword→Earcon Latency = ${wf.earcon_latency_ms}ms`, 'trigger');
              }
            }

            const payload = {
              session_id: (state.activeSession && state.activeSession.session_id) || 'session_current',
              trial_id: record.trial_id,
              phrase: record.phrase || record.target_hotword || 'trial',
              degree: record.degree || '0',
              outcome: record.response_outcome || (record.detected_hotword !== 'UNDETECTED' ? 'ACTIVATED' : 'STAYED_ASLEEP'),
              prompt_start_ms: record.prompt_start_ms,
              audio_onset_ms: record.audio_onset_ms,
              speech_end_offset_ms: record.speech_end_offset_ms,
              earcon_onset_offset_ms: record.earcon_onset_offset_ms,
              device_trigger_ms: record.device_trigger_ms,
              prompt_to_audio_delta_ms: record.prompt_to_audio_delta_ms,
              audio_to_trigger_delta_ms: record.audio_to_trigger_delta_ms,
              total_latency_delta_ms: record.total_latency_delta_ms,
              audio_duration_sec: record.audio_duration_sec,
              audio_base64: base64Data
            };

            const uploadPromise = fetch('/api/trials/upload_audio', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            }).then(resp => resp.json()).then(res => {
              if (res && res.status === 'saved') {
                record.audio_file = res.audio_file;
                if (res.audio_duration_sec) record.audio_duration_sec = res.audio_duration_sec;
                // Always trust server-side XR Glasses 247Hz->392Hz earcon spectral template if detected
                if (isActivated && res.earcon_latency_ms !== undefined && res.earcon_latency_ms !== null) {
                  record.audio_to_trigger_delta_ms = res.earcon_latency_ms;
                  record.earcon_latency_ms = res.earcon_latency_ms;
                  if (res.speech_onset_ms !== undefined) record.prompt_to_audio_delta_ms = res.speech_onset_ms;
                  if (res.speech_end_ms !== undefined) record.speech_end_offset_ms = res.speech_end_ms;
                  if (res.earcon_onset_ms !== undefined) {
                    record.earcon_onset_offset_ms = res.earcon_onset_ms;
                    record.total_latency_delta_ms = res.earcon_onset_ms;
                  }
                  if (el.valAudioToTrigger) el.valAudioToTrigger.textContent = `${res.earcon_latency_ms} ms`;
                  updateRunnerVisualTimeline(record.prompt_to_audio_delta_ms, record.speech_end_offset_ms, record.earcon_onset_offset_ms, record.earcon_latency_ms);
                }
                logEntry(`[AUDIO REC] 🎙️ Audio saved: ${res.audio_file} (${res.bytes} B)`, 'system');
                updateAudioRecIndicator('saved');
              } else {
                updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
              }
              return res;
            }).catch(postErr => {
              console.warn('[AUDIO REC] Upload error:', postErr);
              updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
            });
            state.pendingAudioUpload = uploadPromise;
            await uploadPromise;
          } catch (postErr) {
            console.warn('[AUDIO REC] Upload handling error:', postErr);
            updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
          }
        };
        reader.readAsDataURL(audioBlob);
      } catch (blobErr) {
        console.warn('[AUDIO REC] Blob handling error:', blobErr);
        updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
      }
    };

    recorder.stop();
  } catch (err) {
    console.warn('[AUDIO REC] Error stopping recorder:', err);
    updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
  }
}

function abortTrialAudioRecording() {
  if (state.trialMediaRecorder && state.trialMediaRecorder.state !== 'inactive') {
    try {
      state.trialMediaRecorder.onstop = null;
      state.trialMediaRecorder.stop();
    } catch (e) {}
  }
  state.trialMediaRecorder = null;
  state.trialAudioChunks = [];
  state.isRecordingTrialAudio = false;
  updateAudioRecIndicator(state.micStream ? 'ready' : 'standby');
}

// -------------------------------------------------------------
// Audio Device Scoring & Prioritization
// -------------------------------------------------------------
function getAudioDeviceScore(device) {
  if (!device || !device.label) return 0;
  const label = device.label.toLowerCase();

  // Rank 100: RØDE Wireless PRO RX / Receiver (Glasses Microphone Rig)
  if (/wireless\s*pro|wireless.*rx|rode|røde/i.test(label)) return 100;

  // Rank 85: Deity W.Lav / External Lavalier
  if (/deity|w\.?lav|lavalier/i.test(label)) return 85;

  // Rank 70: Other USB or External audio interfaces (non-MacBook)
  if (!/built-in|macbook|internal|apple\s*inc/i.test(label) && /usb|external|interface|codec|headset|audio/i.test(label)) return 70;

  // Rank 50: Any other device that is NOT MacBook internal mic
  if (!/built-in|macbook|internal|apple\s*inc/i.test(label)) return 50;

  // Rank 10: MacBook Built-in / Internal Mic
  return 10;
}

function getBestAudioDevice(devices) {
  if (!devices || devices.length === 0) return null;
  const audioInputs = devices.filter(d => d.kind === 'audioinput' && d.deviceId);
  if (audioInputs.length === 0) return null;

  let best = null;
  let maxScore = -1;
  for (const dev of audioInputs) {
    const score = getAudioDeviceScore(dev);
    if (score > maxScore) {
      maxScore = score;
      best = dev;
    }
  }
  return best;
}

async function refreshAudioDeviceList() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audioInputs = devices.filter(d => d.kind === 'audioinput');
    state.audioDevices = audioInputs;

    const selectHeader = document.getElementById('select-audio-input');
    const selectSetup = document.getElementById('select-audio-device-setup');
    const badgeStatus = document.getElementById('setup-audio-status-badge');
    const badgeHeader = document.getElementById('audio-input-badge');

    const bestDev = getBestAudioDevice(audioInputs);
    const bestScore = bestDev ? getAudioDeviceScore(bestDev) : 0;

    // Check currently active device
    let activeDeviceId = state.selectedAudioDeviceId;
    let currentTrackDev = null;
    if (state.micStream) {
      const activeTrack = state.micStream.getAudioTracks()[0];
      if (activeTrack) {
        const trackId = (activeTrack.getSettings && activeTrack.getSettings().deviceId) || '';
        currentTrackDev = audioInputs.find(d => d.deviceId === trackId || (d.label && d.label === activeTrack.label));
      }
    }

    const currentScore = currentTrackDev ? getAudioDeviceScore(currentTrackDev) : 0;
    const isUsingInternalMic = currentTrackDev && /built-in|macbook|internal/i.test(currentTrackDev.label);

    // AUTO-LOCK onto Wireless PRO RX / External Mic:
    // If user has not explicitly picked an external mic, or is currently on MacBook mic while an external mic exists:
    if (bestDev && bestScore >= 50 && (isUsingInternalMic || !activeDeviceId || currentScore < 50)) {
      console.log(`[AUDIO REC] Auto-locking onto external mic "${bestDev.label}" (score: ${bestScore}) over internal mic.`);
      activeDeviceId = bestDev.deviceId;
      state.selectedAudioDeviceId = activeDeviceId;
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('preferred_audio_device', activeDeviceId);
      }
      if (state.micStream && isUsingInternalMic) {
        // Automatically switch the active stream to the external mic!
        initAudioVAD(activeDeviceId);
      }
    }

    const selectors = [selectHeader, selectSetup].filter(Boolean);
    selectors.forEach(sel => {
      sel.innerHTML = '';

      audioInputs.forEach((dev, idx) => {
        const opt = document.createElement('option');
        opt.value = dev.deviceId;
        const label = dev.label || `Microphone ${idx + 1}`;
        const score = getAudioDeviceScore(dev);
        if (score >= 90) {
          opt.textContent = `🎙️ [LOCKED] ${label} (RØDE RX)`;
        } else if (score >= 50) {
          opt.textContent = `🎙️ ${label} (External)`;
        } else {
          opt.textContent = `💻 ${label} (Mac Internal - Low Vol)`;
        }
        sel.appendChild(opt);
      });

      sel.value = activeDeviceId || (bestDev ? bestDev.deviceId : '');
    });

    // Update status badge & header indicator
    const activeDev = audioInputs.find(d => d.deviceId === activeDeviceId) || currentTrackDev || bestDev;
    if (activeDev) {
      const score = getAudioDeviceScore(activeDev);
      const isExt = score >= 50;

      if (badgeStatus) {
        if (score >= 90) {
          badgeStatus.textContent = `🟢 ${activeDev.label.slice(0, 24)} (LOCKED)`;
          badgeStatus.style.background = 'var(--color-success-bg)';
          badgeStatus.style.color = 'var(--color-success)';
        } else if (isExt) {
          badgeStatus.textContent = `🟢 ${activeDev.label.slice(0, 24)}`;
          badgeStatus.style.background = 'var(--color-success-bg)';
          badgeStatus.style.color = 'var(--color-success)';
        } else {
          badgeStatus.textContent = `⚠️ Mac Internal Mic (INCORRECT MIC)`;
          badgeStatus.style.background = 'rgba(239, 68, 68, 0.15)';
          badgeStatus.style.color = '#ef4444';
        }
      }

      if (badgeHeader) {
        if (isExt) {
          badgeHeader.style.background = 'var(--bg-subtle)';
          badgeHeader.style.borderColor = 'var(--color-success)';
          badgeHeader.title = `Microphone: ${activeDev.label}`;
          if (selectHeader) selectHeader.style.color = 'var(--color-success)';
        } else {
          badgeHeader.style.background = 'rgba(239, 68, 68, 0.2)';
          badgeHeader.style.borderColor = '#ef4444';
          badgeHeader.title = 'WARNING: Mac Internal Mic active! Glasses speaker responses will NOT be recorded.';
          if (selectHeader) selectHeader.style.color = '#ef4444';
        }
      }
    }
  } catch (err) {
    console.warn('[AUDIO REC] Error enumerating devices:', err);
  }
}

// -------------------------------------------------------------
// Wireless Transmitter (TX1 / TX2) Routing & Isolation Engine
// -------------------------------------------------------------
function setupChannelRouting() {
  if (!state.audioContext || !state.channelSplitter) return;

  if (state.channelGainTX1) {
    try { state.channelGainTX1.disconnect(); } catch (e) {}
  }
  if (state.channelGainTX2) {
    try { state.channelGainTX2.disconnect(); } catch (e) {}
  }

  state.activeMicChannel = state.activeMicChannel || (typeof localStorage !== 'undefined' ? localStorage.getItem('active_wireless_tx') : null) || 'TX1';

  // Reuse isolatedAudioDest if it belongs to the current audioContext so switching TX1/TX2 never interrupts continuous Batch Recording!
  if (!state.isolatedAudioDest || state.isolatedAudioDest.context !== state.audioContext) {
    state.isolatedAudioDest = state.audioContext.createMediaStreamDestination();
  }
  state.channelGainTX1 = state.audioContext.createGain();
  state.channelGainTX2 = state.audioContext.createGain();

  state.channelSplitter.connect(state.channelGainTX1, 0); // TX1 (Left Channel)
  state.channelSplitter.connect(state.channelGainTX2, 1); // TX2 (Right Channel)

  if (state.activeMicChannel === 'TX1') {
    state.channelGainTX1.gain.value = 1.0;
    state.channelGainTX2.gain.value = 0.0;
    state.channelGainTX1.connect(state.isolatedAudioDest);
  } else if (state.activeMicChannel === 'TX2') {
    state.channelGainTX1.gain.value = 0.0;
    state.channelGainTX2.gain.value = 1.0;
    state.channelGainTX2.connect(state.isolatedAudioDest);
  } else { // BOTH
    state.channelGainTX1.gain.value = 1.0;
    state.channelGainTX2.gain.value = 1.0;
    state.channelGainTX1.connect(state.isolatedAudioDest);
    state.channelGainTX2.connect(state.isolatedAudioDest);
  }

  state.activeRecordingStream = state.isolatedAudioDest.stream;
  updateWirelessChannelUI();
}

function setActiveWirelessChannel(ch) {
  state.activeMicChannel = ch;
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('active_wireless_tx', ch);
  }
  setupChannelRouting();
  const roomName = (ch === 'TX1') ? 'Room 1 (Left Ch)' : ((ch === 'TX2') ? 'Room 2 (Right Ch)' : 'Both Rooms (Mixed)');
  logEntry(`[MIC ROUTING] Active recording transmitter switched to ${ch} (${roomName})`, 'speech');
}
window.setActiveWirelessChannel = setActiveWirelessChannel;

function updateWirelessChannelUI() {
  const ch = state.activeMicChannel || 'TX1';

  // Runner view toggle buttons
  const btnTx1 = document.getElementById('runner-btn-tx1');
  const btnTx2 = document.getElementById('runner-btn-tx2');
  if (btnTx1 && btnTx2) {
    btnTx1.className = (ch === 'TX1') ? 'tx-badge active-tx1' : 'tx-badge';
    btnTx2.className = (ch === 'TX2') ? 'tx-badge active-tx2' : 'tx-badge';
  }

  // Setup modal radio buttons
  const radioTx1 = document.getElementById('radio-tx-1');
  const radioTx2 = document.getElementById('radio-tx-2');
  const radioTxBoth = document.getElementById('radio-tx-both');
  if (radioTx1) radioTx1.checked = (ch === 'TX1');
  if (radioTx2) radioTx2.checked = (ch === 'TX2');
  if (radioTxBoth) radioTxBoth.checked = (ch === 'BOTH');
}

async function initAudioVAD(requestedDeviceId) {
  if (!state.enableAudioRecording) {
    updateAudioRecIndicator('disabled');
    return;
  }
  let targetId = (requestedDeviceId !== undefined) ? requestedDeviceId : (state.selectedAudioDeviceId || '');

  // If no device specified, check saved preference
  if (!targetId && typeof localStorage !== 'undefined') {
    targetId = localStorage.getItem('preferred_audio_device') || '';
  }

  // Pre-scan: if devices are already enumerated, pick best external mic
  if (!targetId && state.audioDevices && state.audioDevices.length > 0) {
    const best = getBestAudioDevice(state.audioDevices);
    if (best && getAudioDeviceScore(best) >= 50) {
      targetId = best.deviceId;
      state.selectedAudioDeviceId = targetId;
    }
  }

  // 1. Initialize Browser Speech Recognition (Automatic Hotword Trigger)
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRec && !speechRecognizer) {
    try {
      speechRecognizer = new SpeechRec();
      speechRecognizer.continuous = true;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = 'en-US';

      speechRecognizer.onresult = (event) => {
        if (state.trialState !== 'listening') return;

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcript = event.results[i][0].transcript.trim().toLowerCase();
          state.currentTrialSpokenTranscript = transcript;
          logEntry(`[VOICE TRANSCRIPT] "${transcript}" (waiting for Glasses Earcon & evaluator confirmation)`, 'speech');

          const speechPill = document.getElementById('live-speech-pill');
          const speechText = document.getElementById('live-speech-text');
          if (speechPill && speechText) {
            speechText.textContent = `"${transcript}"`;
            speechPill.classList.remove('hidden');
          }
          // NOTE: Do NOT call onDeviceHotwordTrigger() here!
          // Browser speech recognition recognizes the wearer's voice, NOT the smart glasses' Earcon chime.
          // Ending the trial here would cut off the audio recording before the glasses play the Earcon sound!
        }
      };

      speechRecognizer.onerror = () => {};
      speechRecognizer.onend = () => {
        if (state.trialState === 'listening') {
          try { speechRecognizer.start(); } catch (e) {}
        }
      };

      speechRecognizer.start();
    } catch (e) {
      console.warn('SpeechRecognition init error:', e);
    }
  }

  // 2. Initialize Microphone Level Analyser & Synchronized Recording
  try {
    if (state.micStream) {
      try {
        state.micStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      state.micStream = null;
    }
    if (state.audioContext && state.audioContext.state !== 'closed') {
      try { state.audioContext.close(); } catch (e) {}
      state.audioContext = null;
    }

    const baseAudioConstraints = {
      channelCount: { ideal: 2, min: 1 },
      echoCancellation: false,
      noiseSuppression: false,
      autoGainControl: false
    };
    const audioConstraints = targetId
      ? { ...baseAudioConstraints, deviceId: { exact: targetId } }
      : baseAudioConstraints;

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints, video: false });
    } catch (constraintErr) {
      console.warn('[AUDIO REC] Target mic failed, falling back to default:', constraintErr);
      stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    }

    // Now that getUserMedia succeeded, full device labels are guaranteed to be available
    try {
      const freshDevs = await navigator.mediaDevices.enumerateDevices();
      state.audioDevices = freshDevs.filter(d => d.kind === 'audioinput');
      const bestAudioDev = getBestAudioDevice(state.audioDevices);
      const currentTrack = stream.getAudioTracks()[0];
      const currentTrackLabel = currentTrack ? (currentTrack.label || '') : '';

      // If we got an internal mic while Wireless PRO RX / external mic is available, switch immediately!
      if (bestAudioDev && getAudioDeviceScore(bestAudioDev) >= 50) {
        const isInternal = /built-in|macbook|internal/i.test(currentTrackLabel);
        if (isInternal || (!targetId && bestAudioDev.deviceId !== currentTrack.getSettings()?.deviceId)) {
          console.log(`[AUDIO REC] Auto-switching from "${currentTrackLabel}" to preferred "${bestAudioDev.label}"`);
          try { stream.getTracks().forEach(t => t.stop()); } catch (e) {}
          targetId = bestAudioDev.deviceId;
          state.selectedAudioDeviceId = targetId;
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('preferred_audio_device', targetId);
          }
          stream = await navigator.mediaDevices.getUserMedia({ audio: { ...baseAudioConstraints, deviceId: { exact: targetId } }, video: false });
        }
      }
    } catch (recheckErr) {
      console.warn('[AUDIO REC] Post-getUserMedia check warning:', recheckErr);
    }

    state.micStream = stream;
    updateAudioRecIndicator('ready');

    state.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = state.audioContext.createMediaStreamSource(stream);

    // Channel Splitter: Split Stereo into Left (Channel 0 = TX1) and Right (Channel 1 = TX2)
    state.channelSplitter = state.audioContext.createChannelSplitter(2);
    source.connect(state.channelSplitter);

    // TX1 (Ch 0) Analyser
    state.analyserTX1 = state.audioContext.createAnalyser();
    state.analyserTX1.fftSize = 256;
    state.channelSplitter.connect(state.analyserTX1, 0);

    // TX2 (Ch 1) Analyser
    state.analyserTX2 = state.audioContext.createAnalyser();
    state.analyserTX2.fftSize = 256;
    state.channelSplitter.connect(state.analyserTX2, 1);

    // Combined/Master Analyser
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 256;
    source.connect(state.analyser);

    // Setup channel routing (isolatedAudioDest, gain nodes)
    setupChannelRouting();

    // If a session is active, ensure continuous Full-Session Batch Audio Recording is running on the active stream
    if (state.sessionStarted || state.activeSession) {
      startBatchSessionRecording(state.trialRecords.length === 0);
    }

    const dataArray1 = new Uint8Array(state.analyserTX1.frequencyBinCount);
    const dataArray2 = new Uint8Array(state.analyserTX2.frequencyBinCount);
    const vadBarFill = document.getElementById('vad-bar-fill');
    const setupVadFill = document.getElementById('setup-vad-bar-fill');
    const setupVadText = document.getElementById('setup-vad-level-text');

    function checkLevel() {
      if (!state.audioContext) return;

      let sum1 = 0;
      if (state.analyserTX1) {
        state.analyserTX1.getByteFrequencyData(dataArray1);
        for (let i = 0; i < dataArray1.length; i++) sum1 += dataArray1[i];
      }
      const avg1 = sum1 / dataArray1.length;
      const pct1 = Math.min(100, (avg1 / 60) * 100);

      let sum2 = 0;
      if (state.analyserTX2) {
        state.analyserTX2.getByteFrequencyData(dataArray2);
        for (let i = 0; i < dataArray2.length; i++) sum2 += dataArray2[i];
      }
      const avg2 = sum2 / dataArray2.length;
      const pct2 = Math.min(100, (avg2 / 60) * 100);

      // Active channel percentage for master VAD bar
      const ch = state.activeMicChannel || 'TX1';
      const activePct = (ch === 'TX1') ? pct1 : ((ch === 'TX2') ? pct2 : Math.max(pct1, pct2));
      const activeAvg = (ch === 'TX1') ? avg1 : ((ch === 'TX2') ? avg2 : Math.max(avg1, avg2));

      // Master VAD bars
      if (vadBarFill) vadBarFill.style.width = `${activePct}%`;
      if (setupVadFill) setupVadFill.style.width = `${activePct}%`;
      if (setupVadText) setupVadText.textContent = `${Math.round(activePct)}%`;

      // Dual VU meters in Runner & Setup
      const runnerFill1 = document.getElementById('vad-bar-fill-tx1');
      const runnerFill2 = document.getElementById('vad-bar-fill-tx2');
      if (runnerFill1) runnerFill1.style.width = `${pct1}%`;
      if (runnerFill2) runnerFill2.style.width = `${pct2}%`;

      const setupFill1 = document.getElementById('setup-vad-fill-tx1');
      const setupFill2 = document.getElementById('setup-vad-fill-tx2');
      const setupText1 = document.getElementById('setup-vad-text-tx1');
      const setupText2 = document.getElementById('setup-vad-text-tx2');
      if (setupFill1) setupFill1.style.width = `${pct1}%`;
      if (setupFill2) setupFill2.style.width = `${pct2}%`;
      if (setupText1) setupText1.textContent = `${Math.round(pct1)}%`;
      if (setupText2) setupText2.textContent = `${Math.round(pct2)}%`;

      // Two-Stage Real-Time Acoustic Detector (Stage 1: Hotword Speech Onset & End -> Stage 2: Glasses Earcon Onset)
      if (state.trialState === 'listening') {
        const now = Date.now();
        // Slowly track baseline room noise floor when not speaking
        if (!state.isAudioOnsetDetected) {
          state.trialNoiseFloor = (state.trialNoiseFloor || 5) * 0.92 + Math.min(activeAvg, 25) * 0.08;
        }
        const speechThresh = Math.max(state.vadThreshold || 14, (state.trialNoiseFloor || 5) * 1.8 + 7);
        const earconThresh = Math.max(11, (state.trialNoiseFloor || 5) * 1.6 + 6);

        if (!state.isAudioOnsetDetected) {
          if (activeAvg > speechThresh) {
            state.isAudioOnsetDetected = true;
            state.tAudioOnset = now;
            state.tLastSpeechActive = now;
            const speechOffset = Math.max(0, state.tAudioOnset - state.tPromptStart);
            if (el.valPromptToAudio) el.valPromptToAudio.textContent = `${speechOffset} ms`;
            updateRunnerVisualTimeline(speechOffset, null, null, null);
            logEntry(`[MIC VAD] 🗣️ Hotword Speech Onset on ${ch} at +${speechOffset}ms`, 'speech');
          }
        } else if (!state.isSpeechEnded) {
          if (activeAvg >= speechThresh * 0.85) {
            state.tLastSpeechActive = now;
          } else if ((now - state.tLastSpeechActive) >= 210 && (state.tLastSpeechActive - state.tAudioOnset) >= 160) {
            state.isSpeechEnded = true;
            state.tSpeechEnd = state.tLastSpeechActive;
            state.earconConsecutiveFrames = 0;
            const onsetOff = Math.max(0, state.tAudioOnset - state.tPromptStart);
            const endOff = Math.max(onsetOff + 160, state.tSpeechEnd - state.tPromptStart);
            updateRunnerVisualTimeline(onsetOff, endOff, null, null);
            logEntry(`[MIC VAD] 🗣️ Hotword Speech Ended at +${endOff}ms — Listening for Smart Glasses Earcon...`, 'speech');
          }
        } else if (!state.isEarconDetected) {
          const sinceSpeechEnd = now - state.tSpeechEnd;
          if (sinceSpeechEnd >= 150 && sinceSpeechEnd <= 4200) {
            if (activeAvg >= earconThresh) {
              state.earconConsecutiveFrames = (state.earconConsecutiveFrames || 0) + 1;
              if (state.earconConsecutiveFrames >= 2) {
                state.isEarconDetected = true;
                state.tEarconOnset = now - 16; // compensate 1 frame
                state.tDeviceTrigger = state.tEarconOnset;
                const onsetOff = Math.max(0, state.tAudioOnset - state.tPromptStart);
                const endOff = Math.max(onsetOff + 160, state.tSpeechEnd - state.tPromptStart);
                const earconLatency = Math.max(0, state.tEarconOnset - state.tSpeechEnd);
                const totalToEarcon = Math.max(0, state.tEarconOnset - state.tPromptStart);
                if (el.valAudioToTrigger) el.valAudioToTrigger.textContent = `${earconLatency} ms`;
                if (el.valTotalLatency) el.valTotalLatency.textContent = `${totalToEarcon} ms`;
                updateRunnerVisualTimeline(onsetOff, endOff, totalToEarcon, earconLatency);
                logEntry(`[EARCON DETECTED] 🔔 Smart Glasses Earcon Chime on ${ch} at +${totalToEarcon}ms (Hotword → Earcon Latency: ${earconLatency}ms)`, 'trigger');
              }
            } else {
              state.earconConsecutiveFrames = 0;
            }
          }
        }
      }

      requestAnimationFrame(checkLevel);
    }
    checkLevel();

    // Populate and refresh device dropdowns
    await refreshAudioDeviceList();

  } catch (err) {
    console.warn('Microphone VAD not available:', err);
    updateAudioRecIndicator('standby', 'No Mic');
  }
}

// -------------------------------------------------------------
// Real-Time SSE & Logcat Stream
// -------------------------------------------------------------
function initSSE() {
  if (state.sseSource) state.sseSource.close();
  state.sseSource = new EventSource('/api/stream');

  state.sseSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      handleServerSSE(data);
    } catch (e) {}
  };

  state.sseSource.onerror = () => {
    logEntry('[SYSTEM] Reconnecting to Telemetry Server...', 'system');
  };
}

function handleServerSSE(ev) {
  if (ev.event_type && ev.event_type.startsWith('REMOTE_')) {
    handleServerEvent(ev);
    return;
  }

  state.telemetryEvents.push(ev);
  el.eventCountBadge.textContent = `${state.telemetryEvents.length} events`;

  if (ev.event_type === 'HOTWORD_TRIGGER') {
    logEntry(`[HOTWORD TRIGGER] ${ev.detected_hotword} (conf: ${ev.confidence || 1.0})`, 'trigger');
    onDeviceHotwordTrigger(ev.detected_hotword, ev.confidence || 1.0, ev.timestamp_ms);
  } else if (ev.event_type === 'AUDIO_INPUT_ONSET') {
    if (state.trialState === 'listening' && !state.isAudioOnsetDetected) {
      state.isAudioOnsetDetected = true;
      state.tAudioOnset = ev.timestamp_ms || Date.now();
      logEntry(`[LOGCAT VAD] Audio Input Event at +${state.tAudioOnset - state.tPromptStart}ms`, 'speech');
    }
  } else if (ev.event_type === 'REMOTE_START_TRIAL') {
    if (state.trialState === 'idle') {
      startTrial();
    } else if (state.trialState === 'listening') {
      finishTrial('MANUAL_STOP');
    } else if (state.trialState === 'detected' || state.trialState === 'timeout') {
      nextTrial();
    }
  } else if (ev.event_type === 'REMOTE_NEXT_TRIAL') {
    nextTrial();
  } else if (ev.event_type === 'REMOTE_PREV_TRIAL') {
    prevTrial();
  } else if (ev.event_type === 'REMOTE_RETRY_TRIAL') {
    retryTrial();
  } else if (ev.raw_log) {
    logEntry(ev.raw_log, 'system');
  }
}

function logEntry(text, type = 'system') {
  const div = document.createElement('div');
  div.className = `log-entry ${type}`;
  div.textContent = text;
  el.logTerminal.appendChild(div);
  el.logTerminal.scrollTop = el.logTerminal.scrollHeight;
}

// PeerJS WebRTC Realtime Sync Host
let peerHost = null;
const peerClients = new Set();
let currentSessionCode = '';

function initPeerHost() {
  try {
    if (!window.Peer) {
      console.log('[WEBRTC] Waiting for PeerJS library to load...');
      setTimeout(initPeerHost, 300);
      return;
    }
    if (window.Peer) {
      if (peerHost) {
        try { peerHost.destroy(); } catch (e) {}
      }

      // 1. Get session code from URL ?session=XXXX or use Participant ID (default: P01)
      const urlParams = new URLSearchParams(window.location.search);
      const pid = (state && state.participantId) ? state.participantId : 'P01';
      
      currentSessionCode = urlParams.get('session') || pid;

      
      const peerId = `gemini-hotwords-qa-${currentSessionCode}`;
      peerHost = new Peer(peerId, { host: '0.peerjs.com', port: 443, secure: true });
      
      peerHost.on('open', (id) => {
        console.log('[WEBRTC] PeerJS Host active with ID:', id);
        updateSessionCodeUI(currentSessionCode);
      });

      peerHost.on('error', (err) => {
        console.warn('[WEBRTC] PeerJS Host error:', err);
      });

      peerHost.on('connection', (conn) => {
        console.log('[WEBRTC] Phone 1 (Soundbar) connecting via WebRTC...');

        const onConnOpen = () => {
          peerClients.add(conn);
          console.log('[WEBRTC] DataConnection is OPEN & SYNCED! Sending current trial state...');

          // Send current trial state immediately to newly connected Phone 1!
          const trial = state.activeSuite?.trials?.[state.trialIndex];
          if (trial) {
            conn.send({
              event_type: state.trialState === 'listening' ? 'TRIAL_STARTED' : 'TRIAL_PREPARED',
              condition: trial.condition,
              phrase: trial.phrase,
              target_hotword: trial.target_hotword || trial.phrase || 'HEY_GOOGLE',
              category: trial.category || 'positive',
              trial_index: state.trialIndex + 1,
              total_trials: state.activeSuite.trials.length
            });
          }
        };

        if (conn.open) {
          onConnOpen();
        } else {
          conn.on('open', onConnOpen);
        }

        conn.on('close', () => peerClients.delete(conn));
        conn.on('error', () => peerClients.delete(conn));

        // Listen for remote control commands from Phone 1 over WebRTC!
        conn.on('data', (data) => {
          console.log('[WEBRTC] Received remote command from Phone 1:', data);
          if (data && data.event_type) {
            handleServerEvent(data);
          }
        });
      });

      peerHost.on('error', (err) => {
        if (err.type === 'unavailable-id') {
          // If another tab is already the host, that is fine!
          console.log('[WEBRTC] Host ID already active in another tab.');
        }
      });
    }
  } catch (e) {
    console.warn('[WEBRTC] Could not initialize PeerJS Host:', e);
  }
}
initPeerHost();

// Persistent BroadcastChannel on Host side to listen for commands from Soundbar App!
window.telemetryCmdsBC = (window.BroadcastChannel) ? new BroadcastChannel('hotword_telemetry_cmds') : null;
if (window.telemetryCmdsBC) {
  window.telemetryCmdsBC.onmessage = (event) => {
    if (event.data && event.data.event_type && event.data.sender !== 'tester_app') {
      console.log('[BROADCAST_CHANNEL] Host received remote command:', event.data.event_type);
      handleServerEvent(event.data);
    }
  };
}

// Fail-safe localStorage polling for remote commands (100ms)
let lastSeenRemoteCmdTime = Date.now() - 10000;
setInterval(() => {
  try {
    const raw = localStorage.getItem('hotword_remote_cmd');
    if (raw) {
      const ev = JSON.parse(raw);
      if (ev._t && ev._t > lastSeenRemoteCmdTime) {
        lastSeenRemoteCmdTime = ev._t;
        console.log('[LOCAL_STORAGE] Host received remote command via polling:', ev.event_type);
        handleServerEvent(ev);
      }
    }
  } catch (e) {}
}, 100);

// Also listen to storage events
window.addEventListener('storage', (e) => {
  if (e.key === 'hotword_remote_cmd' && e.newValue) {
    try {
      const data = JSON.parse(e.newValue);
      if (data._t && data._t > lastSeenRemoteCmdTime) {
        lastSeenRemoteCmdTime = data._t;
        handleServerEvent(data);
      }
    } catch (err) {}
  }
});

function handleServerEvent(data) {
  if (!data || !data.event_type) return;
  console.log('[REMOTE_CMD] Handling remote command on Phone 2:', data.event_type);

  if (data.event_type === 'REMOTE_AUDIO_TRACK') {
    state.currentAudioTrack = data.trial_data && data.trial_data.track;
    return;
  }

  if (data.event_type === 'REMOTE_START_TRIAL') {
    // If the session modal is still open, click 'Begin Evaluation Session'!
    const modal = document.getElementById('session-start-modal');
    const isModalVisible = modal && getComputedStyle(modal).display !== 'none';
    if (isModalVisible) {
      const btnStart = document.getElementById('btn-modal-start-session');
      if (btnStart) btnStart.click();
      return;
    }

    // If a trial is currently listening, stop/complete it & move to next!
    if (state.trialState === 'listening') {
      finishTrial('MANUAL_STOP');
    } else {
      // Start the trial!
      startTrial();
    }
  } else if (data.event_type === 'REMOTE_STOP_TRIAL') {
    if (state.trialState === 'listening' || state.trialState === 'countdown') {
      finishTrial('MANUAL_STOP');
    }
  } else if (data.event_type === 'REMOTE_PREV_TRIAL') {
    prevTrial();
  } else if (data.event_type === 'REMOTE_RETRY_TRIAL') {
    retryTrial();
  } else if (data.event_type === 'REQUEST_CURRENT_TRIAL') {
    const trial = state.activeSuite?.trials?.[state.trialIndex];
    if (trial) {
      broadcastTrialEvent(state.trialState === 'listening' ? 'TRIAL_STARTED' : 'TRIAL_PREPARED', {
        trial_id: trial.trial_id,
        condition: trial.condition,
        target_hotword: trial.target_hotword || trial.phrase || 'HEY_GOOGLE',
        phrase: trial.phrase || trial.target_hotword,
        prompt_text: trial.prompt_text || trial.phrase,
        category: trial.category || 'positive',
        trial_index: state.trialIndex + 1,
        total_trials: state.activeSuite.trials.length
      });
    }
  }
}

async function openSoundbarApp() {
  const code = state.participantId || 'P01';
  
  try {
    if (!window.WebADB) throw new Error('WebADB not loaded');
    const adb = new window.WebADB();
    await adb.connect();
    
    // Reverse port 9999 to allow phone to reach laptop's local server
    await adb.reversePort(9999);
    
    // Build the URL to launch on the phone
    let targetUrl;
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      targetUrl = `http://127.0.0.1:${window.location.port}/soundbar.html?session=${code}`;
    } else {
      targetUrl = `http://127.0.0.1:9999/soundbar.html?session=${code}`;
    }
    
    await adb.launchUrl(targetUrl);
    alert('✅ Soundbar launched on connected USB Phone!');
  } catch (err) {
    console.warn('WebADB failed or cancelled, falling back to laptop window:', err);
    const soundbarUrl = `soundbar.html?session=${code}`;
    window.soundbarWindow = window.open(soundbarUrl, 'soundbar_app_window');
  }
  
  // Send current trial state immediately!
  setTimeout(() => {
    const trial = state.activeSuite?.trials?.[state.trialIndex];
    if (trial && window.soundbarWindow && !window.soundbarWindow.closed) {
      window.soundbarWindow.postMessage({
        event_type: state.trialState === 'listening' ? 'TRIAL_STARTED' : 'TRIAL_PREPARED',
        sender: 'tester_app',
        participant_id: state.participantId || 'P01',
        trial_id: trial.trial_id,
        condition: trial.condition,
        target_hotword: trial.target_hotword || trial.phrase || 'HEY_GOOGLE',
        phrase: trial.phrase || trial.target_hotword,
        prompt_text: trial.prompt_text || trial.phrase,
        category: trial.category || 'positive',
        trial_index: state.trialIndex + 1,
        total_trials: state.activeSuite.trials.length
      }, '*');
    }
  }, 500);
}

// Listen for direct postMessage from Soundbar App (window.opener / window.open)!
window.addEventListener('message', (event) => {
  if (event.data && event.data.event_type && event.data.sender === 'soundbar_app') {
    console.log('[POST_MESSAGE] Host received remote command:', event.data.event_type);
    handleServerEvent(event.data);
  }
});

function updateSessionCodeUI(code) {
  const container = document.getElementById('session-code-container');
  if (container) {
    container.style.display = 'block';
    container.innerHTML = `
      <div style="background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 12px; padding: 0.75rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1rem;">
        <div>
          <div style="font-size: 0.75rem; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Soundbar Session Code</div>
          <div style="font-size: 1.5rem; font-weight: 900; color: #38bdf8; letter-spacing: 0.1em;">${code}</div>
        </div>
        <button onclick="openSoundbarApp()" style="background: #0284c7; color: white; border: none; padding: 0.6rem 1rem; border-radius: 8px; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; gap: 0.4rem; box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);">
          🔗 Open & Connect Soundbar App &rarr;
        </button>
      </div>
    `;
  }
}

function broadcastTrialEvent(eventType, trialData) {
  const payload = {
    event_type: eventType,
    sender: 'tester_app',
    participant_id: state.participantId || 'P01',
    ...trialData
  };

  // 1. Send via PeerJS WebRTC to all connected phones
  peerClients.forEach(conn => {
    try { conn.send(payload); } catch (e) {}
  });

  // 2. Send via BroadcastChannel on hotword_telemetry_events
  try {
    if (window.BroadcastChannel) {
      if (!window.telemetryEventsBC) {
        window.telemetryEventsBC = new BroadcastChannel('hotword_telemetry_events');
      }
      window.telemetryEventsBC.postMessage(payload);
    }
    localStorage.setItem('hotword_last_event', JSON.stringify({ ...payload, _t: Date.now() }));
  } catch (e) {}

  // 3. Send via direct postMessage to soundbarWindow if open!
  if (window.soundbarWindow && !window.soundbarWindow.closed) {
    try { window.soundbarWindow.postMessage(payload, '*'); } catch (e) {}
  }

  // 4. If connected directly via Chrome WebSerial (Chromebook / no-Python mode), auto-rotate stage
  if ((eventType === 'TRIAL_PREPARED' || eventType === 'TRIAL_STARTED') && stageState.webSerialConnected && stageState.autoRotate) {
    const degRaw = trialData?.degree || '';
    const cleaned = String(degRaw).replace('°', '').replace('deg', '').trim();
    const targetDeg = parseFloat(cleaned);
    if (!Number.isNaN(targetDeg)) {
      window.stageMove(targetDeg);
    }
  }

  // 5. Send to server if available
  fetch('/api/trials/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(() => {
      if (eventType === 'TRIAL_PREPARED' || eventType === 'TRIAL_STARTED') {
        setTimeout(fetchStageStatus, 250);
        setTimeout(fetchStageStatus, 1800);
      }
    })
    .catch(() => {});
}

function injectMockTrigger() {
  const kw = el.simHotwordSelect?.value || 'HEY_GOOGLE';
  if (kw === 'NONE') {
    finishTrial('TIMEOUT');
  } else {
    logEntry(`[MOCK] MOCK EVENT injected: ${kw}`, 'mock');
    onDeviceHotwordTrigger(kw, 0.98);
    fetch('/api/simulated/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ hotword: kw, confidence: 0.98 })
    }).catch(() => {});
  }
}

// -------------------------------------------------------------
// Device & Setup Operations
// -------------------------------------------------------------
async function refreshDevices() {
  try {
    const res = await fetch('/api/status');
    const data = await res.json();
    state.adbDevices = data.adb_devices || [];

    if (el.selectPhone1) {
      el.selectPhone1.innerHTML = '<option value="WEB_CLIENT">🌐 Web Client Mode (Open /phone_speaker in Chrome)</option>';
      state.adbDevices.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `🔌 USB Device: ${d.id} (${d.state})`;
        el.selectPhone1.appendChild(opt);
      });
    }

    if (el.selectPhone2) {
      el.selectPhone2.innerHTML = '<option value="SIMULATED">🌐 Web / Evaluator Screen Mode (No USB Required)</option>';
      state.adbDevices.forEach(d => {
        const opt = document.createElement('option');
        opt.value = d.id;
        opt.textContent = `🔌 USB Device: ${d.id} (${d.state})`;
        el.selectPhone2.appendChild(opt);
      });
    }

    if (state.adbDevices.length >= 2) {
      if (el.selectPhone1) el.selectPhone1.value = state.adbDevices[0].id;
      if (el.selectPhone2) el.selectPhone2.value = state.adbDevices[1].id;
      updateDeviceBadges(state.adbDevices[0].id, state.adbDevices[1].id);
    } else if (state.adbDevices.length === 1) {
      if (el.selectPhone2) el.selectPhone2.value = state.adbDevices[0].id;
      updateDeviceBadges(null, state.adbDevices[0].id);
    } else {
      updateDeviceBadges(null, null);
    }
  } catch (err) {
    console.error('Failed to refresh devices:', err);
  }
}

function updateDeviceBadges(p1, p2) {
  const p1Badge = document.getElementById('setup-p1-badge');
  const p2Badge = document.getElementById('setup-p2-badge');
  const telemetryPhoneLabel = document.getElementById('telemetry-phone-label');

  if (p1) {
    if (el.phone1Indicator) el.phone1Indicator.className = 'status-indicator connected';
    if (el.phone1Val) el.phone1Val.textContent = p1;
    if (p1Badge) { p1Badge.textContent = 'USB Connected'; p1Badge.style.color = 'var(--color-success)'; }
  } else {
    if (el.phone1Indicator) el.phone1Indicator.className = 'status-indicator';
    if (el.phone1Val) el.phone1Val.textContent = 'Web Bridge (/phone_speaker)';
    if (p1Badge) { p1Badge.textContent = 'Web Standby'; p1Badge.style.color = 'var(--text-muted)'; }
  }

  if (p2) {
    if (el.phone2Indicator) el.phone2Indicator.className = 'status-indicator connected';
    if (el.phone2Val) el.phone2Val.textContent = p2;
    if (p2Badge) { p2Badge.textContent = 'USB Attached'; p2Badge.style.color = 'var(--color-success)'; }
    if (telemetryPhoneLabel) telemetryPhoneLabel.textContent = `(Phone 2: ${p2})`;
  } else {
    if (el.phone2Indicator) el.phone2Indicator.className = 'status-indicator';
    if (el.phone2Val) el.phone2Val.textContent = 'Web / Voice Mode';
    if (p2Badge) { p2Badge.textContent = 'Web Standby'; p2Badge.style.color = 'var(--text-muted)'; }
    if (telemetryPhoneLabel) telemetryPhoneLabel.textContent = '(Phone 2: Web / Voice Mode)';
  }
}

async function reversePhone2Bridge() {
  // Use WebUSB (WebADB) directly in Chrome to launch Phone 2 (Pixel DUT)
  try {
    const adb = new WebADB();
    await adb.connect();
    await adb.reversePort(9999);
    await adb.launchUrl('http://127.0.0.1:9999/index.html?session=' + (state.participantId || 'P01'));
    alert('✅ Phone 2 (Pixel) connected & launched via WebUSB!');
  } catch (e) {
    alert('WebUSB Connection Failed: ' + e.message);
  }
}

async function reversePhone1Bridge() {
  // If we are on x20web or a static server, use WebUSB (WebADB) directly in Chrome to launch the Pixel!
  if (window.location.hostname.includes('x20web') || window.location.protocol === 'https:') {
    try {
      const adb = new WebADB();
      await adb.connect();
      await adb.reversePort(9999);
      await adb.launchUrl('http://127.0.0.1:9999/index.html?session=' + (state.participantId || 'P01'));
      alert('✅ Pixel Phone connected & launched via WebUSB!');
      return;
    } catch (e) {
      alert('WebUSB Connection Failed: ' + e.message);
      return;
    }
  }

  // Fallback for local python/ruby server
  const p1 = el.selectPhone1.value;
  if (!p1) {
    alert('Please select Phone 1 from the dropdown first.');
    return;
  }
  try {
    await fetch('/api/collector/reverse_phone1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ device_id: p1 })
    });
    alert(`Port 8080 reversed to Phone 1 (${p1}). Open http://localhost:8080/phone_speaker on Phone 1!`);
  } catch (e) {
    alert('Failed to reverse port: ' + e);
  }
}

async function attachPhone2Logcat() {
  const p2 = el.selectPhone2.value;
  if (!p2) {
    alert('Please select Phone 2 from the dropdown first.');
    return;
  }
  try {
    await fetch('/api/collector/source', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'adb', device_id: p2 })
    });
    el.phone2Indicator.className = 'status-indicator connected';
    el.phone2Val.textContent = p2;
    logEntry(`[SYSTEM] Scoped ADB logcat attached to Phone 2 (${p2})`, 'system');
  } catch (e) {
    alert('Failed to attach logcat: ' + e);
  }
}

async function updateSourceMode() {
  const mode = el.selectSourceMode.value;
  const p2 = el.selectPhone2.value;
  await fetch('/api/collector/source', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: mode, device_id: p2 })
  });
}

// -------------------------------------------------------------
// Session Export Operations
// -------------------------------------------------------------

// -------------------------------------------------------------
// Export Operations
// -------------------------------------------------------------
function exportCSV() {
  try {
    if (state.trialRecords.length === 0) {
      alert('No data to download, start trials to begin collecting data');
      return;
    }
    const headers = [
      'trial_id', 'ai_assistant', 'conversation_mode', 'condition', 'distance', 'degree', 'vocal_level', 'noise_level', 'audio_track_played', 'phrase', 'prompt_text', 'spoken_transcript', 'target_hotword', 'detected_hotword',
      'response_outcome', 'classification', 'audio_to_trigger_delta_ms', 'total_latency_delta_ms',
      'prompt_start_time', 'device_trigger_time', 'audio_file', 'batch_offset_sec', 'batch_audio_file'
    ];

    function escapeCsvCell(val) {
      if (val === undefined || val === null) return '';
      const str = String(val);
      if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }

    let csvContent = headers.join(',') + '\n';
    state.trialRecords.forEach(r => {
      const row = headers.map(h => {
        let val = r[h];
        
        // Format timestamps as readable dates
        if (h === 'prompt_start_time') {
          val = r.prompt_start_ms || r.prompt_start_time;
          if (typeof val === 'number') val = new Date(val).toISOString().replace('T', ' ').replace('Z', '');
        } else if (h === 'device_trigger_time') {
          val = r.device_trigger_ms || r.device_trigger_time;
          if (typeof val === 'number') val = new Date(val).toISOString().replace('T', ' ').replace('Z', '');
        } else if (h === 'batch_audio_file' && !val && state.batchAudioFile) {
          val = state.batchAudioFile;
        }
        
        return escapeCsvCell(val);
      });
      csvContent += row.join(',') + '\n';
    });

    const assistantTag = (state.aiAssistant || 'Gemini_Live_Android').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    downloadFile(csvContent, `${assistantTag}_hotwords_${state.participantId}_${Date.now()}.csv`, 'text/csv');
  } catch (e) {
    alert("Error generating CSV: " + e.message);
    console.error(e);
  }
}

function exportJSON() {
  if (state.trialRecords.length === 0) {
    alert('No data to download, start trials to begin collecting data');
    return;
  }
  const data = {
    participant_id: state.participantId,
    ai_assistant: state.aiAssistant || 'Gemini Live - Android',
    suite_name: state.activeSuite?.suite_name || 'Gemini Hotwords Suite',
    export_time_iso: new Date().toISOString(),
    total_trials: state.trialRecords.length,
    batch_audio_file: state.batchAudioFile || null,
    batch_start_ms: state.batchRecordingStartMs || null,
    trials: state.trialRecords
  };
  downloadFile(JSON.stringify(data, null, 2), `gemini_hotwords_${state.participantId}_${Date.now()}.json`, 'application/json');
}

function exportDetailedBenchmarkCSV() {
  try {
    if (state.trialRecords.length === 0) {
      alert('No data to download, start trials to begin collecting data');
      return;
    }
    const headers = [
      'trial_id', 'ai_assistant', 'conversation_mode', 'condition', 'distance', 'degree', 'vocal_level', 'noise_level', 'audio_track_played', 'phrase', 'target_hotword', 'detected_hotword',
      'response_outcome', 'classification', 'audio_to_trigger_delta_ms', 'total_latency_delta_ms',
      'prompt_start_time', 'device_trigger_time', 'prompt_text', 'audio_file', 'batch_offset_sec', 'batch_audio_file'
    ];

    function escapeCsvCell(val) {
      if (val === undefined || val === null) return '';
      const str = String(val);
      if (str.includes('"') || str.includes(',') || str.includes('\n') || str.includes('\r')) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    }

    let csvContent = headers.join(',') + '\n';
    state.trialRecords.forEach(r => {
      const row = headers.map(h => {
        let val = r[h];
        if (h === 'prompt_start_time') {
          val = r.prompt_start_ms || r.prompt_start_time;
          if (typeof val === 'number') val = new Date(val).toISOString().replace('T', ' ').replace('Z', '');
        } else if (h === 'device_trigger_time') {
          val = r.device_trigger_ms || r.device_trigger_time;
          if (typeof val === 'number') val = new Date(val).toISOString().replace('T', ' ').replace('Z', '');
        } else if (h === 'batch_audio_file' && !val && state.batchAudioFile) {
          val = state.batchAudioFile;
        }
        return escapeCsvCell(val);
      });
      csvContent += row.join(',') + '\n';
    });

    const assistantTag = (state.aiAssistant || 'Gemini_Live_Android').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
    downloadFile(csvContent, `${assistantTag}_hotwords_${state.participantId}_${Date.now()}_benchmark.csv`, 'text/csv');
  } catch (e) {
    alert("Error generating Detailed Benchmark CSV: " + e.message);
    console.error(e);
  }
}

function exportMarkdownSummary() {
  try {
    if (state.trialRecords.length === 0) {
      alert('No data to download, start trials to begin collecting data');
      return;
    }
    const participant = state.participantId || 'P01';
    const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const totalTrials = state.trialRecords.length;
    const alignedCount = state.trialRecords.filter(r => ['TRUE_POSITIVE', 'FALSE_POSITIVE', 'TRUE_NEGATIVE'].includes(r.classification)).length;

    let md = `# Gemini Hotwords Evaluation Report\n\n`;
    md += `- **Participant**: ${participant}\n`;
    md += `- **Date**: ${dateStr}\n`;
    md += `- **Total Trials**: ${totalTrials}\n`;
    md += `- **Aligned Trials**: ${alignedCount}\n`;
    if (state.batchAudioFile) {
      md += `- **Batch Session Recording**: \`${state.batchAudioFile}\`\n`;
    }
    md += `\n## Trial Breakdown\n\n`;
    md += `| # | Condition | Phrase | Result | Attempts | Glasses Hotword | DSP Status | Batch Offset (s) |\n`;
    md += `|---|---|---|---|---|---|---|---|\n`;

    state.trialRecords.forEach((r, idx) => {
      const cond = r.condition || '—';
      const phrase = r.phrase || r.target_hotword || '—';
      const cls = r.classification || '';
      const res = (cls === 'TRUE_POSITIVE') ? 'PASS' : ((cls === 'FALSE_NEGATIVE') ? 'FAIL' : cls);
      const hw = r.detected_hotword || '—';
      const status = (cls === 'TRUE_POSITIVE') ? 'SUCCESS' : ((cls === 'FALSE_NEGATIVE') ? 'MISSED' : 'IDLE');
      const boff = (r.batch_offset_sec !== null && r.batch_offset_sec !== undefined) ? `${r.batch_offset_sec}s` : '—';
      md += `| ${idx + 1} | ${cond} | ${phrase} | ${res} | 1 | ${hw} | ${status} | ${boff} |\n`;
    });

    downloadFile(md, `gemini_hotwords_${participant}_${Date.now()}_report.md`, 'text/markdown');
  } catch (e) {
    alert("Error generating Markdown Summary report: " + e.message);
    console.error(e);
  }
}

async function finalizeSession() {
  if (state.trialRecords.length === 0) {
    alert('No data to download, start trials to begin collecting data');
    return;
  }

  // Ensure any in-flight per-trial audio upload completes before generating report
  if (state.pendingAudioUpload) {
    try {
      await state.pendingAudioUpload;
    } catch (e) {}
  }

  // Stop & flush both the First-30-Trials and Full-Session ("batch") audio recordings before finalizing
  try {
    await stopAndFinalizeFirst30Recording();
    await stopAndFinalizeBatchRecording();
  } catch (e) {
    console.warn('Batch/First30 audio finalize warning:', e);
  }

  // 1. Auto-download both Standard CSV and Detailed Benchmark CSV
  exportCSV();
  exportDetailedBenchmarkCSV();

  // 2. Notify backend to generate session JSON, CSV, and standalone executive HTML report
  fetch('/api/session/finalize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      trials: state.trialRecords,
      participant_id: state.participantId,
      ai_assistant: state.aiAssistant,
      conversation_mode: state.conversationMode,
      suite_name: state.activeSuite?.suite_name,
      batch_start_ms: state.batchRecordingStartMs,
      batch_audio_file: state.batchAudioFile,
      first30_audio_file: state.first30AudioFile
    })
  })
    .then(r => r.json())
    .then(data => {
      if (data && data.report_url) {
        logEntry(`[SESSION] Executive HTML report generated: ${data.report_url}`, 'system');
        const reportUrl = data.report_url;
        const sid = data.session_metadata?.session_id || '';
        const zipBtn = document.getElementById('btn-export-recordings-zip');
        if (zipBtn && sid) {
          zipBtn.href = `/api/export/package_zip?session_id=${encodeURIComponent(sid)}`;
        }
        const first30Btn = document.getElementById('btn-export-first30-audio');
        if (first30Btn && sid) {
          first30Btn.href = `/api/export/first30_audio?session_id=${encodeURIComponent(sid)}`;
        }
        const first30RunnerBtn = document.getElementById('btn-export-first30-audio-runner');
        if (first30RunnerBtn && sid) {
          first30RunnerBtn.href = `/api/export/first30_audio?session_id=${encodeURIComponent(sid)}`;
        }
        const batchBtn = document.getElementById('btn-export-batch-audio');
        if (batchBtn && sid) {
          batchBtn.href = `/api/export/batch_audio?session_id=${encodeURIComponent(sid)}`;
        }
        const batchRunnerBtn = document.getElementById('btn-export-batch-audio-runner');
        if (batchRunnerBtn && sid) {
          batchRunnerBtn.href = `/api/export/batch_audio?session_id=${encodeURIComponent(sid)}`;
        }
        setTimeout(() => {
          const msg = state.enableAudioRecording
            ? 'Session finalized! (Individual trial recordings, the First 30 Trials Recording, and the Full-Session Batch Recording have all been saved.) Would you like to view the Interactive Graphical Report now?'
            : 'Session finalized! (CSV, JSON & HTML Report saved — Audio Recording was disabled for this session.) Would you like to view the Interactive Graphical Report now?';
          if (confirm(msg)) {
            window.open(reportUrl, '_blank');
          }
        }, 500);
      }
    })
    .catch((err) => {
      console.warn('Backend finalize sync error:', err);
      alert('⚠️ Note: Session CSV was saved on this phone, but could not reach your computer over Wi-Fi.\n\nTo transfer all 3 standard report files to your computer, connect the phone via USB and run:\n./pull_results.sh');
    });

  logEntry(
    state.enableAudioRecording
      ? `[SESSION] Session finalized! Auto-downloaded ${state.trialRecords.length} trial records as CSV + First 30 Trials Audio + Batch Session Audio.`
      : `[SESSION] Session finalized! Auto-downloaded ${state.trialRecords.length} trial records as CSV (Audio Recording OFF).`,
    'system'
  );
}

function downloadFile(content, fileName, contentType) {
  const a = document.createElement('a');
  const file = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(file);
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 1000);
}

// -------------------------------------------------------------
// Zaber Rotary Stage Integration Client (Python Backend + Direct Chrome Web Serial API)
// -------------------------------------------------------------
const stageState = {
  connected: false,
  webSerialConnected: false,
  webSerialPort: null,
  webSerialWriter: null,
  webSerialReader: null,
  cycleSteps: 2400000, // X-RSW60A default: 2,400,000 microsteps per 360° (0.00015°/step)
  currentAngle: 0.0,
  targetAngle: 0.0,
  isMoving: false,
  autoRotate: true,
  deviceName: 'Unknown',
  port: ''
};

async function webSerialSendCmd(cmd) {
  if (!stageState.webSerialPort || !stageState.webSerialPort.writable) return '';
  try {
    const encoder = new TextEncoder();
    const writer = stageState.webSerialPort.writable.getWriter();
    await writer.write(encoder.encode(cmd.trim() + '\n'));
    writer.releaseLock();
  } catch (e) {
    console.warn('WebSerial write error:', e);
  }
}

async function connectWebSerialStage() {
  if (!('serial' in navigator)) {
    alert('Web Serial API is not supported in this browser. Please use Google Chrome or Microsoft Edge.');
    return false;
  }
  try {
    const port = await navigator.serial.requestPort({});
    await port.open({ baudRate: 115200, dataBits: 8, stopBits: 1, parity: 'none' });
    stageState.webSerialPort = port;
    stageState.webSerialConnected = true;
    stageState.connected = true;
    stageState.deviceName = 'X-RSW60A';
    stageState.port = 'Chrome WebSerial USB';

    // Start background reader to parse position & cycle distance replies
    (async () => {
      const decoder = new TextDecoder();
      let buf = '';
      try {
        while (port.readable && stageState.webSerialConnected) {
          const reader = port.readable.getReader();
          try {
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              if (value) {
                buf += decoder.decode(value, { stream: true });
                const lines = buf.split(/\r?\n/);
                buf = lines.pop() || '';
                for (const line of lines) {
                  // Example reply: @01 1 OK IDLE -- 2400000
                  const m = line.match(/^@01\s+\d+\s+OK\s+(IDLE|BUSY)\s+(\S+)\s+(.+)$/);
                  if (m) {
                    const statusStr = m[1];
                    const warnStr = m[2];
                    const dataStr = m[3].trim();
                    stageState.isMoving = (statusStr === 'BUSY');
                    const numVal = parseFloat(dataStr);
                    if (!Number.isNaN(numVal)) {
                      if (stageState._awaitingCycleDist && numVal >= 36000) {
                        stageState.cycleSteps = numVal;
                        stageState._awaitingCycleDist = false;
                      } else {
                        stageState.currentAngle = ((numVal / stageState.cycleSteps) * 360.0 % 360.0 + 360.0) % 360.0;
                      }
                    }
                    if (warnStr === 'WR' && !stageState._autoHomedOnce) {
                      stageState._autoHomedOnce = true;
                      webSerialSendCmd('/1 1 home');
                    }
                    updateStageUI({ ...stageState, _serverOnline: true });
                  }
                }
              }
            }
          } finally {
            reader.releaseLock();
          }
        }
      } catch (readErr) {
        console.warn('WebSerial reader ended:', readErr);
      }
    })();

    // Query cycle distance (steps per 360°) and current position
    stageState._awaitingCycleDist = true;
    await webSerialSendCmd('/1 1 get limit.cycle.dist');
    setTimeout(() => {
      stageState._awaitingCycleDist = false;
      webSerialSendCmd('/1 1 get pos');
    }, 350);

    updateStageUI({ ...stageState, _serverOnline: true });
    return true;
  } catch (err) {
    console.warn('WebSerial connection cancelled or failed:', err);
    if (window.location.protocol === 'file:' && String(err).includes('SecurityError')) {
      alert('⚠️ Chrome Security Restriction:\n\nChrome blocks USB Serial access when tester.html is opened directly as a local file (file://).\n\nTo rotate the Zaber Stage, the page must be opened via http://localhost:8080 (Mac Terminal) or an https:// URL.');
    }
    return false;
  }
}

async function fetchStageStatus() {
  if (stageState.webSerialConnected) {
    await webSerialSendCmd('/1 1 get pos');
    updateStageUI({ ...stageState, _serverOnline: true });
    return;
  }
  try {
    const res = await fetch('/api/stage/status');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const data = await res.json();
    data._serverOnline = true;
    stageState._serverOnline = true;
    updateStageUI(data);
  } catch (e) {
    stageState._serverOnline = false;
    updateStageUI({
      connected: false,
      _serverOnline: false,
      deviceName: 'Server Offline',
      port: ''
    });
  }
}

window.stageConnect = async function() {
  const devInfo = document.getElementById('stage-device-info');
  if (devInfo) {
    devInfo.textContent = '🔄 Connecting to Zaber Stage...';
    devInfo.style.color = '#fbbf24';
  }

  // If server is known to be offline (e.g., Chromebook or no Python server), call Web Serial IMMEDIATELY
  // inside the synchronous click gesture so Chrome does not block requestPort()!
  if ((stageState._serverOnline === false || window.location.protocol === 'file:') && 'serial' in navigator) {
    const ok = await connectWebSerialStage();
    if (ok) return;
  }

  try {
    const res = await fetch('/api/stage/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (res.ok) {
      const data = await res.json();
      if (data.connected) {
        data._serverOnline = true;
        stageState._serverOnline = true;
        updateStageUI(data);
        return;
      }
    }
  } catch (e) {}

  // Fallback to Chrome Web Serial API
  if ('serial' in navigator) {
    const ok = await connectWebSerialStage();
    if (ok) return;
  }
  fetchStageStatus();
};

function updateStageUI(data) {
  if (!data) return;
  Object.assign(stageState, data);
  const badgeVal = document.getElementById('stage-status-val');
  const angleLabel = document.getElementById('stage-current-angle-label');
  const movingInd = document.getElementById('stage-moving-indicator');
  const devInfo = document.getElementById('stage-device-info');
  const autoCheck = document.getElementById('stage-auto-rotate-check');

  if (badgeVal) {
    if (state.conversationMode === 'Wearer') {
      badgeVal.textContent = 'Wearer (0° Fixed)';
      badgeVal.style.color = '#34d399';
    } else if (stageState.connected) {
      const dev = stageState.deviceName || 'Stage';
      badgeVal.textContent = `${dev} (${(stageState.currentAngle || 0).toFixed(0)}°)`;
      badgeVal.style.color = '#38bdf8';
    } else if (data._serverOnline === false) {
      badgeVal.textContent = 'Click 🔌 Connect (USB)';
      badgeVal.style.color = '#fbbf24';
    } else {
      badgeVal.textContent = 'Disconnected (Click to Connect)';
      badgeVal.style.color = '#fbbf24';
    }
  }

  if (angleLabel) {
    angleLabel.textContent = `${(stageState.currentAngle || 0).toFixed(1)}°`;
  }
  if (movingInd) {
    movingInd.classList.toggle('hidden', !stageState.isMoving);
  }
  if (devInfo) {
    if (stageState.connected && stageState.port) {
      devInfo.textContent = `✅ ${stageState.deviceName || 'Zaber Stage'} connected on ${stageState.port}`;
      devInfo.style.color = '#34d399';
    } else if (data._serverOnline === false) {
      devInfo.textContent = '🔌 Click "🔌 Connect" to connect Zaber Stage via Chrome USB (or run ./START_HERE.command)';
      devInfo.style.color = '#fbbf24';
    } else {
      devInfo.textContent = '⚠️ Zaber Stage not detected — check USB + Power cables, then click "🔌 Connect"';
      devInfo.style.color = '#fbbf24';
    }
  }
  if (autoCheck && autoCheck !== document.activeElement) {
    autoCheck.checked = Boolean(stageState.autoRotate);
  }
}

window.stageMove = async function(angle) {
  const normAngle = ((Number(angle) || 0) % 360 + 360) % 360;
  if (stageState.webSerialConnected) {
    const steps = Math.round((normAngle / 360.0) * stageState.cycleSteps);
    stageState.targetAngle = normAngle;
    stageState.isMoving = true;
    updateStageUI({ ...stageState, _serverOnline: true });
    await webSerialSendCmd(`/1 1 move abs ${steps}`);
    setTimeout(() => webSerialSendCmd('/1 1 get pos'), 600);
    setTimeout(() => webSerialSendCmd('/1 1 get pos'), 1800);
    setTimeout(() => webSerialSendCmd('/1 1 get pos'), 3200);
    return;
  }
  try {
    const res = await fetch('/api/stage/move', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ angle: normAngle })
    });
    if (res.ok) {
      const data = await res.json();
      if (data.status) {
        data.status._serverOnline = true;
        updateStageUI(data.status);
        return;
      }
    }
    fetchStageStatus();
  } catch (e) {
    console.error('Error moving stage:', e);
    fetchStageStatus();
  }
};

window.stageHome = async function() {
  if (stageState.webSerialConnected) {
    stageState.targetAngle = 0.0;
    stageState.isMoving = true;
    updateStageUI({ ...stageState, _serverOnline: true });
    await webSerialSendCmd('/1 1 home');
    setTimeout(() => webSerialSendCmd('/1 1 get pos'), 1500);
    setTimeout(() => webSerialSendCmd('/1 1 get pos'), 3500);
    return;
  }
  try {
    const res = await fetch('/api/stage/home', { method: 'POST', headers: { 'Content-Type': 'application/json' } });
    if (res.ok) {
      const data = await res.json();
      if (data.status) {
        data.status._serverOnline = true;
        updateStageUI(data.status);
        return;
      }
    }
    fetchStageStatus();
  } catch (e) {
    console.error('Error homing stage:', e);
    fetchStageStatus();
  }
};

window.stageJog = function(delta) {
  const current = stageState.currentAngle || 0.0;
  const target = ((current + delta) % 360 + 360) % 360;
  window.stageMove(target);
};

window.toggleStageAutoRotate = async function(enabled) {
  stageState.autoRotate = enabled;
  try {
    await fetch('/api/stage/auto_rotate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled })
    });
  } catch (e) {}
};

function initStageController() {
  const autoCheck = document.getElementById('stage-auto-rotate-check');
  if (autoCheck) {
    autoCheck.addEventListener('change', (e) => {
      window.toggleStageAutoRotate(e.target.checked);
    });
  }
  const badge = document.getElementById('stage-status-badge');
  if (badge) {
    badge.style.cursor = 'pointer';
    badge.title = 'Click to connect / refresh Zaber Stage status';
    badge.addEventListener('click', () => {
      if (!stageState.connected) {
        window.stageConnect();
      } else {
        fetchStageStatus();
      }
    });
  }
  fetchStageStatus();
  setInterval(fetchStageStatus, 2500);
}

