'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function DetalhesAlunoPage() {
  const params = useParams();
  const raParam = params.ra as string;
  const { alunos } = useApp();

  const aluno = alunos.find((a) => a.ra === Number(raParam));

  if (!aluno) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 rounded-xl text-center max-w-lg">
        <h2 className="text-lg font-bold text-red-800 mb-2">Aluno não encontrado</h2>
        <p className="text-sm text-red-600 mb-4">Nenhum registo localizado com o RA: <strong>{raParam}</strong>.</p>
        <Link href="/alunos" className="text-blue-700 font-semibold text-sm hover:underline">
          ← Voltar para a listagem
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-lg">
      <h1 className="text-xl font-bold text-slate-900 mb-6 pb-3 border-b border-slate-100">
        Ficha do Estudante
      </h1>

      <div className="space-y-4 mb-6">
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Nome Completo</span>
          <p className="text-lg font-bold text-slate-900">{aluno.name}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Registro Acadêmico</span>
          <p className="text-md font-mono font-medium text-blue-700">{aluno.ra}</p>
        </div>
      </div>

      <Link
        href="/alunos"
        className="inline-block bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition"
      >
        ← Voltar
      </Link>
    </div>
  );
}