from app.database import SessionLocal, Base, engine
from app.models import Stimulus

Base.metadata.create_all(bind=engine)

stimuli_data = [
    {
        "sentence": "Nice timing.",
        "condition": "face_audio",
        "correct_intent": "Sarcastic",
        "face_emoji": "🙄",
        "audio_hint": "slow sarcastic tone",
    },
    {
        "sentence": "That was exactly what I needed.",
        "condition": "face_only",
        "correct_intent": "Genuine",
        "face_emoji": "😊",
        "audio_hint": None,
    },
    {
        "sentence": "Great, another delay.",
        "condition": "audio_only",
        "correct_intent": "Frustrated",
        "face_emoji": None,
        "audio_hint": "sharp irritated tone",
    },
    {
        "sentence": "Okay.",
        "condition": "text_only",
        "correct_intent": "Neutral",
        "face_emoji": None,
        "audio_hint": None,
    },
    {
        "sentence": "I’m glad you showed up.",
        "condition": "face_audio",
        "correct_intent": "Genuine",
        "face_emoji": "😊",
        "audio_hint": "warm positive tone",
    },
    {
        "sentence": "Sure, that makes sense.",
        "condition": "face_only",
        "correct_intent": "Sarcastic",
        "face_emoji": "😏",
        "audio_hint": None,
    },
    {
        "sentence": "Can we move on now?",
        "condition": "audio_only",
        "correct_intent": "Frustrated",
        "face_emoji": None,
        "audio_hint": "tense impatient tone",
    },
    {
        "sentence": "I understand.",
        "condition": "text_only",
        "correct_intent": "Neutral",
        "face_emoji": None,
        "audio_hint": None,
    },
    {
        "sentence": "Thanks for helping me with that.",
        "condition": "face_audio",
        "correct_intent": "Genuine",
        "face_emoji": "😊",
        "audio_hint": "warm appreciative tone",
    },
    {
        "sentence": "Wow, amazing work.",
        "condition": "face_audio",
        "correct_intent": "Sarcastic",
        "face_emoji": "😏",
        "audio_hint": "dry sarcastic tone",
    },
    {
        "sentence": "This is taking longer than expected.",
        "condition": "audio_only",
        "correct_intent": "Frustrated",
        "face_emoji": None,
        "audio_hint": "strained annoyed tone",
    },
    {
        "sentence": "The meeting starts at three.",
        "condition": "text_only",
        "correct_intent": "Neutral",
        "face_emoji": None,
        "audio_hint": None,
    },
    {
        "sentence": "I really appreciate your effort.",
        "condition": "face_only",
        "correct_intent": "Genuine",
        "face_emoji": "😊",
        "audio_hint": None,
    },
    {
        "sentence": "Perfect, just what we needed.",
        "condition": "face_only",
        "correct_intent": "Sarcastic",
        "face_emoji": "🙄",
        "audio_hint": None,
    },
    {
        "sentence": "Please stop interrupting me.",
        "condition": "face_audio",
        "correct_intent": "Frustrated",
        "face_emoji": "😤",
        "audio_hint": "firm irritated tone",
    },
    {
        "sentence": "The file is on the desk.",
        "condition": "text_only",
        "correct_intent": "Neutral",
        "face_emoji": None,
        "audio_hint": None,
    },
    {
        "sentence": "You handled that very well.",
        "condition": "audio_only",
        "correct_intent": "Genuine",
        "face_emoji": None,
        "audio_hint": "kind approving tone",
    },
    {
        "sentence": "Fantastic, another problem.",
        "condition": "audio_only",
        "correct_intent": "Sarcastic",
        "face_emoji": None,
        "audio_hint": "flat sarcastic tone",
    },
    {
        "sentence": "I already explained this twice.",
        "condition": "face_audio",
        "correct_intent": "Frustrated",
        "face_emoji": "😤",
        "audio_hint": "impatient tense tone",
    },
    {
        "sentence": "The door is open.",
        "condition": "text_only",
        "correct_intent": "Neutral",
        "face_emoji": None,
        "audio_hint": None,
    },
]


def seed_database():
    db = SessionLocal()

    existing_count = db.query(Stimulus).count()
    if existing_count > 0:
        print("Stimuli already seeded.")
        db.close()
        return

    for item in stimuli_data:
        stimulus = Stimulus(**item)
        db.add(stimulus)

    db.commit()
    db.close()
    print("Stimuli seeded successfully.")


if __name__ == "__main__":
    seed_database()