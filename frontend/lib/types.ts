export type IntentLabel = "Genuine" | "Sarcastic" | "Frustrated" | "Neutral";

export type Condition = "text_only" | "face_only" | "audio_only" | "face_audio";

export interface Stimulus {
  id: number;
  sentence: string;
  condition: Condition;
  correct_intent: IntentLabel;
  face_emoji?: string | null;
  audio_hint?: string | null;
}

export interface ResponseResult {
    id: number;
    participant_id: string;
    stimulus_id: number;
    sentence: string;
    condition: Condition;
    correct_intent: IntentLabel;
    guess: IntentLabel;
    confidence: number;
    is_correct: boolean;
    feedback: string;
    created_at: string;
}