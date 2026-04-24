import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="max-w-3xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-lg">
        <Navbar />

        <p className="text-sm uppercase tracking-widest text-cyan-400 mb-3">
          IntentLens
        </p>

        <h1 className="text-4xl font-bold mb-4">
          A Facial Intent Interpreter
        </h1>

        <p className="text-slate-300 mb-8 leading-7">
          Study how participants interpret hidden intent from text, facial cues,
          and audio tone. Participants guess whether a sentence is genuine,
          sarcastic, frustrated, or neutral, then rate their confidence.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/participant"
            className="rounded-xl bg-cyan-500 text-slate-950 font-semibold p-5 hover:bg-cyan-400 transition"
          >
            Participant Mode
          </Link>

          <Link
            href="/researcher"
            className="rounded-xl bg-slate-800 border border-slate-700 p-5 hover:bg-slate-700 transition"
          >
            Researcher Mode
          </Link>

          <Link
            href="/professor"
            className="rounded-xl bg-slate-800 border border-slate-700 p-5 hover:bg-slate-700 transition"
          >
            Professor Mode
          </Link>
        </div>
      </section>
    </main>
  );
}