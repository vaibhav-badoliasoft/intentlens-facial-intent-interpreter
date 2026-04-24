from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models import Response

router = APIRouter(prefix="/analytics", tags=["Analytics"])


@router.get("/overview")
def get_overview(db: Session = Depends(get_db)):
    total_responses = db.query(Response).count()
    total_participants = db.query(Response.participant_id).distinct().count()
    correct_responses = db.query(Response).filter(Response.is_correct == True).count()

    avg_confidence = db.query(func.avg(Response.confidence)).scalar() or 0

    accuracy = 0
    if total_responses > 0:
        accuracy = round((correct_responses / total_responses) * 100, 2)

    return {
        "total_responses": total_responses,
        "total_participants": total_participants,
        "correct_responses": correct_responses,
        "overall_accuracy": accuracy,
        "average_confidence": round(avg_confidence, 2),
    }


@router.get("/by-condition")
def get_by_condition(db: Session = Depends(get_db)):
    conditions = db.query(Response.condition).distinct().all()
    results = []

    for condition_tuple in conditions:
        condition = condition_tuple[0]

        total = db.query(Response).filter(Response.condition == condition).count()
        correct = (
            db.query(Response)
            .filter(Response.condition == condition, Response.is_correct == True)
            .count()
        )
        avg_confidence = (
            db.query(func.avg(Response.confidence))
            .filter(Response.condition == condition)
            .scalar()
            or 0
        )

        accuracy = round((correct / total) * 100, 2) if total > 0 else 0

        results.append(
            {
                "condition": condition,
                "total": total,
                "correct": correct,
                "accuracy": accuracy,
                "average_confidence": round(avg_confidence, 2),
            }
        )

    return results


@router.get("/by-intent")
def get_by_intent(db: Session = Depends(get_db)):
    intents = db.query(Response.correct_intent).distinct().all()
    results = []

    for intent_tuple in intents:
        intent = intent_tuple[0]

        total = db.query(Response).filter(Response.correct_intent == intent).count()
        correct = (
            db.query(Response)
            .filter(Response.correct_intent == intent, Response.is_correct == True)
            .count()
        )
        avg_confidence = (
            db.query(func.avg(Response.confidence))
            .filter(Response.correct_intent == intent)
            .scalar()
            or 0
        )

        accuracy = round((correct / total) * 100, 2) if total > 0 else 0

        results.append(
            {
                "intent": intent,
                "total": total,
                "correct": correct,
                "accuracy": accuracy,
                "average_confidence": round(avg_confidence, 2),
            }
        )

    return results