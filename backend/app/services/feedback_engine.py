def generate_feedback(correct_intent: str, guess: str, sentence: str) -> str:
    was_correct = correct_intent == guess

    base = {
        "Sarcastic": (
            "This is sarcastic because the sentence may sound positive on the surface, "
            "but the emotional cue suggests the speaker means the opposite."
        ),
        "Genuine": (
            "This is genuine because the wording and cue support sincere, positive intent."
        ),
        "Frustrated": (
            "This is frustrated because the cue suggests irritation, impatience, or dissatisfaction."
        ),
        "Neutral": (
            "This is neutral because there is no strong emotional cue showing sarcasm, frustration, or clear praise."
        ),
    }

    result = "Correct." if was_correct else f"Not quite. You chose {guess}, but the intended answer was {correct_intent}."

    return f"{result} {base.get(correct_intent, 'The correct intent is based on the available cue pattern.')}"