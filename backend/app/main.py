from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import stimuli
from app.routes import responses
from app.routes import analytics

from app.database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="IntentLens API")

app.include_router(stimuli.router)
app.include_router(responses.router)
app.include_router(analytics.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3001",
    "http://127.0.0.1:3001",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "IntentLens FastAPI backend is running"}