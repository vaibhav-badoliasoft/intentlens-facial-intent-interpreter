import { IntentLabel, ResponseResult, Stimulus } from "./types";

const API_BASE = "http://127.0.0.1:8000";

export async function getStimuli(): Promise<Stimulus[]> {
  const res = await fetch(`${API_BASE}/stimuli/`);

  if (!res.ok) {
    throw new Error("Failed to fetch stimuli");
  }

  return res.json();
}

export async function submitResponse(payload: {
  participant_id: string;
  stimulus_id: number;
  guess: IntentLabel;
  confidence: number;
}): Promise<ResponseResult> {
  const res = await fetch(`${API_BASE}/responses/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to submit response");
  }

  return res.json();
}

export async function getOverview() {
  const res = await fetch(`${API_BASE}/analytics/overview`);

  if (!res.ok) {
    throw new Error("Failed to fetch overview");
  }

  return res.json();
}

export async function getByCondition() {
  const res = await fetch(`${API_BASE}/analytics/by-condition`);

  if (!res.ok) {
    throw new Error("Failed to fetch condition analytics");
  }

  return res.json();
}

export async function getByIntent() {
  const res = await fetch(`${API_BASE}/analytics/by-intent`);

  if (!res.ok) {
    throw new Error("Failed to fetch intent analytics");
  }

  return res.json();
}