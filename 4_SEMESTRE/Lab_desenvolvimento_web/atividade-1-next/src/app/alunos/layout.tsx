'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AlunosLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white border border-blue-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 text-blue-800 font-bold mb-4 pb-3 border-b border-blue-100">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <h2>Área do Aluno</h2>
          </div>
          <nav className="flex flex-col gap-1.5">
            <Link
              href="/alunos"
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === '/alunos'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
               Consultar Alunos
            </Link>
            <Link
              href="/alunos/novo"
              className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === '/alunos/novo'
                  ? 'bg-blue-50 text-blue-700 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
               Cadastrar Aluno
            </Link>
          </nav>
        </div>
      </aside>
      <section className="flex-1">{children}</section>
    </div>
  );
}