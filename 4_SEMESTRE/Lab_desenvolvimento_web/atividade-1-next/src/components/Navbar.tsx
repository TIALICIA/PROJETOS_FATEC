'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isAlunoActive = pathname.startsWith('/alunos');
  const isDisciplinaActive = pathname.startsWith('/disciplinas');
  const isMatriculaActive = pathname.startsWith('/matriculas');

  return (
    <header className="bg-slate-900 text-white shadow-sm border-b border-slate-800 sticky top-0 z-50">
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center h-16">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-base tracking-tight">
          <div className="w-8 h-8 rounded-md bg-blue-600/90 flex items-center justify-center text-white font-bold text-sm shadow-inner">
            S
          </div>
          <span className="text-slate-100 font-bold">Academic<span className="text-blue-400 font-normal">Hub</span></span>
        </Link>
        <nav className="flex items-center gap-1.5">
          <Link
            href="/alunos"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isAlunoActive
                ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Alunos
          </Link>
          <Link
            href="/disciplinas"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isDisciplinaActive
                ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Disciplinas
          </Link>
          <Link
            href="/matriculas"
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isMatriculaActive
                ? 'bg-amber-600/15 text-amber-400 border border-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Matrículas
          </Link>
        </nav>
      </div>
    </header>
  );
}