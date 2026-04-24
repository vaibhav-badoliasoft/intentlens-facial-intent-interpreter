"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getStimuli, submitResponse } from "@/lib/api";
import { IntentLabel, ResponseResult, Stimulus } from "@/lib/types";

const intents: IntentLabel[] = [
  "Genuine",
  "Sarcastic",
  "Frustrated",
  "Neutral",
];

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function getEmotionFace(intent: IntentLabel) {
  const faces: Record<IntentLabel, string> = {
    Genuine: "😊",
    Sarcastic: "😏",
    Frustrated: "😤",
    Neutral: "😐",
  };

  return faces[intent];
}

function speak(text: string, intent: IntentLabel) {
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  if (intent === "Genuine") {
    utterance.pitch = 1.2;
    utterance.rate = 0.95;
  } else if (intent === "Sarcastic") {
    utterance.pitch = 0.9;
    utterance.rate = 0.8;
  } else if (intent === "Frustrated") {
    utterance.pitch = 0.8;
    utterance.rate = 1.1;
  } else {
    utterance.pitch = 1;
    utterance.rate = 1;
  }

  window.speechSynthesis.speak(utterance);
}

export default function ParticipantPage() {
  const [stimuli, setStimuli] = useState<Stimulus[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [guess, setGuess] = useState<IntentLabel | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [lastResult, setLastResult] = useState<ResponseResult | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const [alias, setAlias] = useState("");
  const [participantId, setParticipantId] = useState("");
  const [experimentStarted, setExperimentStarted] = useState(false);

  useEffect(() => {
    getStimuli().then((data) => {
      setStimuli(shuffleArray(data));
    });
  }, []);

  const startExperiment = () => {
    if (!alias.trim()) return;

    const cleanAlias = alias.trim().toLowerCase().replace(/\s+/g, "_");
    setParticipantId(cleanAlias);
    setExperimentStarted(true);
  };

  if (!experimentStarted) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8">
          <Navbar />

          <p className="text-cyan-400 text-sm uppercase tracking-widest mb-3">
            Participant Setup
          </p>

          <h1 className="text-3xl font-bold mb-4">Enter Your Alias</h1>

          <p className="text-slate-400 mb-6">
            Use the same alias if you are continuing or retaking the experiment.
            A new alias will be counted as a new participant.
          </p>

          <input
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
            placeholder="Example: participant_01"
            className="w-full mb-4 rounded-xl bg-slate-800 border border-slate-700 p-3 text-white outline-none focus:border-cyan-400"
          />

          <button
            onClick={startExperiment}
            disabled={!alias.trim()}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              alias.trim()
                ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Start Experiment
          </button>
        </div>
      </main>
    );
  }

  if (stimuli.length === 0) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading experiment...
      </main>
    );
  }

  const current = stimuli[currentIndex];
  const progress = ((currentIndex + 1) / stimuli.length) * 100;
  const canSubmit = guess !== null && confidence !== null;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    const res = await submitResponse({
      participant_id: participantId,
      stimulus_id: current.id,
      guess,
      confidence,
    });

    setLastResult(res);
    setShowFeedback(true);

    if (res.is_correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    window.speechSynthesis.cancel();

    setGuess(null);
    setConfidence(null);
    setLastResult(null);
    setShowFeedback(false);

    if (currentIndex + 1 < stimuli.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const accuracy = Math.round((score / stimuli.length) * 100);

    return (
      <main className="min-h-screen flex items-center justify-center text-white bg-slate-950 p-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center">
          <Navbar />

          <p className="text-cyan-400 text-sm uppercase tracking-widest mb-3">
            IntentLens
          </p>

          <h1 className="text-3xl font-bold mb-4">Experiment Complete</h1>

          <p className="text-slate-300 mb-2">
            Your responses have been saved successfully.
          </p>

          <p className="text-slate-400 mb-6">
            Participant alias:{" "}
            <span className="text-cyan-400">{participantId}</span>
          </p>

          <div className="bg-slate-800 rounded-xl p-6 mb-6">
            <p className="text-slate-400 mb-2">Final Score</p>
            <p className="text-4xl font-bold">
              {score} / {stimuli.length}
            </p>
            <p className="text-cyan-400 mt-2">Accuracy: {accuracy}%</p>
          </div>

          <a
            href="/"
            className="block w-full bg-cyan-500 text-black font-semibold py-3 rounded-lg hover:bg-cyan-400 transition"
          >
            Back to Home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="max-w-xl w-full bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-lg">
        <Navbar />

        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>
              Question {currentIndex + 1} / {stimuli.length}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <p className="text-xs uppercase tracking-widest text-cyan-400 mb-3">
          Condition: {current.condition.replace("_", " ")}
        </p>

        <h2 className="text-3xl font-semibold mb-6 text-center">
          “{current.sentence}”
        </h2>

        {current.face_emoji && (
          <div className="text-6xl mb-6 text-center bg-slate-800 rounded-2xl p-6">
            {current.face_emoji}
          </div>
        )}

        {current.audio_hint && (
          <div className="mb-6 text-center bg-slate-800 rounded-xl p-4 text-slate-300">
            Audio cue: {current.audio_hint}
          </div>
        )}

        <div className="mb-6">
          <p className="mb-3 text-slate-300 font-medium">
            What is the intended meaning?
          </p>

          <div className="grid grid-cols-2 gap-3">
            {intents.map((i) => (
              <button
                key={i}
                onClick={() => !showFeedback && setGuess(i)}
                disabled={showFeedback}
                className={`p-4 rounded-xl border font-semibold transition ${
                  guess === i
                    ? "bg-cyan-500 text-slate-950 border-cyan-300 scale-[1.02]"
                    : "bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
                } ${showFeedback ? "cursor-not-allowed opacity-80" : ""}`}
              >
                {i}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-3 text-slate-300 font-medium">Confidence rating</p>

          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((c) => (
              <button
                key={c}
                onClick={() => !showFeedback && setConfidence(c)}
                disabled={showFeedback}
                className={`flex-1 py-3 rounded-xl font-semibold transition ${
                  confidence === c
                    ? "bg-cyan-500 text-slate-950 scale-105"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                } ${showFeedback ? "cursor-not-allowed opacity-80" : ""}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && lastResult && (
          <div
            className={`mb-6 rounded-2xl border p-5 ${
              lastResult.is_correct
                ? "bg-emerald-950 border-emerald-700"
                : "bg-rose-950 border-rose-700"
            }`}
          >
            <p className="text-sm uppercase tracking-widest mb-2">
              {lastResult.is_correct ? "Correct" : "Needs Review"}
            </p>

            <p className="text-lg font-semibold mb-4">
              Correct intent: {lastResult.correct_intent}
            </p>

            <div className="text-7xl text-center mb-4 animate-bounce">
              {getEmotionFace(lastResult.correct_intent)}
            </div>

            <button
              onClick={() => speak(current.sentence, lastResult.correct_intent)}
              className="mb-4 w-full bg-slate-800 hover:bg-slate-700 py-2 rounded-lg transition"
            >
              🔊 Hear Sentence
            </button>

            <p className="text-slate-200 leading-7">{lastResult.feedback}</p>
          </div>
        )}

        {showFeedback ? (
          <button
            onClick={handleNext}
            className="w-full bg-cyan-500 text-slate-950 font-semibold py-3 rounded-xl hover:bg-cyan-400 transition"
          >
            {currentIndex + 1 < stimuli.length
              ? "Next Question"
              : "Finish Experiment"}
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className={`w-full font-semibold py-3 rounded-xl transition ${
              canSubmit
                ? "bg-cyan-500 text-slate-950 hover:bg-cyan-400"
                : "bg-slate-700 text-slate-400 cursor-not-allowed"
            }`}
          >
            Submit Response
          </button>
        )}
      </div>
    </main>
  );
}