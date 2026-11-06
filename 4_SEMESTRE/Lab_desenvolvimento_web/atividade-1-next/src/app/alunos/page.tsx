'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function ListaAlunosPage() {
  const { alunos } = useApp();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Consulta de Alunos</h1>
          <p className="text-sm text-slate-500">Lista completa dos estudantes registados</p>
        </div>
        <span className="bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full text-sm border border-blue-200">
          Total: {alunos.length}
        </span>
      </div>

      <div className="divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
        {alunos.map((aluno) => (
          <div key={aluno.ra} className="p-4 flex items-center justify-between hover:bg-slate-50/80 transition">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                {aluno.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{aluno.name}</h3>
                <p className="text-xs text-slate-500 font-mono">RA: {aluno.ra}</p>
              </div>
            </div>
            <Link
              href={`/alunos/${aluno.ra}`}
              className="text-xs font-semibold text-blue-700 hover:text-blue-900 bg-blue-50 hover:bg-blue-100 px-3.5 py-2 rounded-md transition"
            >
              Ver Detalhes →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}