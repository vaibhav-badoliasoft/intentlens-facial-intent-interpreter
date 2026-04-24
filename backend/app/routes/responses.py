from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Stimulus, Response
from app.schemas import ResponseCreate, ResponseOut
from app.services.feedback_engine import generate_feedback

router = APIRouter(prefix="/responses", tags=["Responses"])


@router.post("/", response_model=ResponseOut)
def create_response(payload: ResponseCreate, db: Session = Depends(get_db)):
    stimulus = db.query(Stimulus).filter(Stimulus.id == payload.stimulus_id).first()

    if not stimulus:
        raise HTTPException(status_code=404, detail="Stimulus not found")

    is_correct = payload.guess == stimulus.correct_intent

    feedback = generate_feedback(
    correct_intent=stimulus.correct_intent,
    guess=payload.guess,
    sentence=stimulus.sentence,
    )

    response = Response(
        participant_id=payload.participant_id,
        stimulus_id=stimulus.id,
        sentence=stimulus.sentence,
        condition=stimulus.condition,
        correct_intent=stimulus.correct_intent,
        guess=payload.guess,
        confidence=payload.confidence,
        is_correct=is_correct,
        feedback=feedback,
    )

    db.add(response)
    db.commit()
    db.refresh(response)

    return response


@router.get("/", response_model=list[ResponseOut])
def get_responses(db: Session = Depends(get_db)):
    return db.query(Response).all()