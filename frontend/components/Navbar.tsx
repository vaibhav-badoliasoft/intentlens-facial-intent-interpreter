import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mb-8 flex flex-wrap gap-4 text-sm text-slate-400">
      <Link href="/" className="hover:text-white transition">
        Home
      </Link>
      <Link href="/participant" className="hover:text-white transition">
        Participant
      </Link>
      <Link href="/researcher" className="hover:text-white transition">
        Researcher
      </Link>
      <Link href="/professor" className="hover:text-white transition">
        Professor
      </Link>
    </nav>
  );
}