from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Stimulus
from app.schemas import StimulusOut

router = APIRouter(prefix="/stimuli", tags=["Stimuli"])


@router.get("/", response_model=list[StimulusOut])
def get_stimuli(db: Session = Depends(get_db)):
    return db.query(Stimulus).all()