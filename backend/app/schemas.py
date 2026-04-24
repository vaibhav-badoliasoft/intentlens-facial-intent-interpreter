from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class StimulusOut(BaseModel):
    id: int
    sentence: str
    condition: str
    correct_intent: str
    face_emoji: Optional[str] = None
    audio_hint: Optional[str] = None

    class Config:
        from_attributes = True


class ResponseCreate(BaseModel):
    participant_id: str
    stimulus_id: int
    guess: str
    confidence: int


class ResponseOut(BaseModel):
    id: int
    participant_id: str
    stimulus_id: int
    sentence: str
    condition: str
    correct_intent: str
    guess: str
    confidence: int
    is_correct: bool
    feedback: str
    created_at: datetime

    class Config:
        from_attributes = True