"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { getByCondition, getByIntent, getOverview } from "@/lib/api";

type Overview = {
  total_responses: number;
  total_participants: number;
  correct_responses: number;
  overall_accuracy: number;
  average_confidence: number;
};

export default function ProfessorPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [byCondition, setByCondition] = useState<any[]>([]);
  const [byIntent, setByIntent] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      setOverview(await getOverview());
      setByCondition(await getByCondition());
      setByIntent(await getByIntent());
    }

    loadData();
  }, []);

  if (!overview) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading professor view...
      </main>
    );
  }

  const bestCondition = [...byCondition].sort(
    (a, b) => b.accuracy - a.accuracy
  )[0];

  const hardestIntent = [...byIntent].sort(
    (a, b) => a.accuracy - b.accuracy
  )[0];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto">
        <Navbar />

        <p className="text-cyan-400 text-sm uppercase tracking-widest mb-3">
          IntentLens
        </p>

        <h1 className="text-4xl font-bold mb-3">Professor Review Summary</h1>

        <p className="text-slate-400 mb-8">
          AI-style research summary generated from participant response data.
        </p>

        <section className="grid gap-4 md:grid-cols-4 mb-8">
          <Card title="Participants" value={overview.total_participants} />
          <Card title="Responses" value={overview.total_responses} />
          <Card title="Accuracy" value={`${overview.overall_accuracy}%`} />
          <Card title="Avg Confidence" value={overview.average_confidence} />
        </section>

        <section className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            AI-Generated Research Summary
          </h2>

          <p className="text-slate-300 leading-8">
            The current IntentLens results suggest that participants achieved an
            overall accuracy of{" "}
            <span className="text-cyan-400 font-semibold">
              {overview.overall_accuracy}%
            </span>{" "}
            with an average confidence score of{" "}
            <span className="text-cyan-400 font-semibold">
              {overview.average_confidence}
            </span>
            . The strongest performance was observed in the{" "}
            <span className="text-cyan-400 font-semibold">
              {bestCondition?.condition?.replace("_", " ")}
            </span>{" "}
            condition, suggesting that additional emotional cues may improve
            interpretation of speaker intent. The most difficult intent category
            was{" "}
            <span className="text-cyan-400 font-semibold">
              {hardestIntent?.intent}
            </span>
            , indicating that this intent may be more easily confused with other
            categories during reduced-cue communication.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <TableCard title="Condition Breakdown" rows={byCondition} type="condition" />
          <TableCard title="Intent Breakdown" rows={byIntent} type="intent" />
        </section>
      </div>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

function TableCard({
  title,
  rows,
  type,
}: {
  title: string;
  rows: any[];
  type: "condition" | "intent";
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      <div className="space-y-3">
        {rows.map((row, index) => (
          <div
            key={index}
            className="bg-slate-800 rounded-xl p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">
                {type === "condition"
                  ? row.condition.replace("_", " ")
                  : row.intent}
              </p>
              <p className="text-sm text-slate-400">
                {row.correct} correct / {row.total} total
              </p>
            </div>

            <div className="text-right">
              <p className="text-cyan-400 font-bold">{row.accuracy}%</p>
              <p className="text-sm text-slate-400">
                Conf: {row.average_confidence}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}