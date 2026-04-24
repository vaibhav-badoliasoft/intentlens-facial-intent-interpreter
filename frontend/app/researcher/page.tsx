"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getByCondition, getByIntent, getOverview } from "@/lib/api";

type Overview = {
  total_responses: number;
  total_participants: number;
  correct_responses: number;
  overall_accuracy: number;
  average_confidence: number;
};

export default function ResearcherPage() {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [byCondition, setByCondition] = useState([]);
  const [byIntent, setByIntent] = useState([]);

  useEffect(() => {
    async function loadData() {
      const overviewData = await getOverview();
      const conditionData = await getByCondition();
      const intentData = await getByIntent();

      setOverview(overviewData);
      setByCondition(conditionData);
      setByIntent(intentData);
    }

    loadData();
  }, []);

  if (!overview) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <Navbar />

        <p className="text-cyan-400 text-sm uppercase tracking-widest mb-3">
          IntentLens
        </p>

        <h1 className="text-4xl font-bold mb-2">Researcher Dashboard</h1>

        <p className="text-slate-400 mb-8">
          Live experiment results, accuracy trends, and confidence patterns.
        </p>

        <section className="grid gap-4 md:grid-cols-4 mb-8">
          <MetricCard title="Participants" value={overview.total_participants} />
          <MetricCard title="Responses" value={overview.total_responses} />
          <MetricCard title="Accuracy" value={`${overview.overall_accuracy}%`} />
          <MetricCard
            title="Avg Confidence"
            value={overview.average_confidence}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ChartCard title="Accuracy by Condition">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byCondition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="condition" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="accuracy" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Average Confidence by Condition">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byCondition}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="condition" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="average_confidence" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Accuracy by Intended Intent">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byIntent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="intent" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="accuracy" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Average Confidence by Intent">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={byIntent}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="intent" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="average_confidence" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <p className="text-slate-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-cyan-400">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}