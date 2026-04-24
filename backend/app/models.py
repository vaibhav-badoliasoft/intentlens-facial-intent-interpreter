from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func

from app.database import Base


class Stimulus(Base):
    __tablename__ = "stimuli"

    id = Column(Integer, primary_key=True, index=True)
    sentence = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    correct_intent = Column(String, nullable=False)
    face_emoji = Column(String, nullable=True)
    audio_hint = Column(String, nullable=True)


class Response(Base):
    __tablename__ = "responses"

    id = Column(Integer, primary_key=True, index=True)
    participant_id = Column(String, nullable=False)
    stimulus_id = Column(Integer, nullable=False)
    sentence = Column(String, nullable=False)
    condition = Column(String, nullable=False)
    correct_intent = Column(String, nullable=False)
    guess = Column(String, nullable=False)
    confidence = Column(Integer, nullable=False)
    is_correct = Column(Boolean, nullable=False)
    feedback = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())