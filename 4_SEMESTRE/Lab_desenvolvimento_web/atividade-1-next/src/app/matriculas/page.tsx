'use client';

import { useApp } from '@/context/AppContext';
import Link from 'next/link';

export default function MatriculasPage() {
  const { matriculas, alunos, disciplinas } = useApp();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Gestão de Matrículas</h1>
          <p className="text-sm text-slate-500">Vínculos de estudantes com as disciplinas</p>
        </div>
        <Link
          href="/matriculas/nova"
          className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-4 py-2.5 rounded-lg transition shadow-sm text-sm"
        >
          ➕ Nova Matrícula
        </Link>
      </div>

      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-50/60 text-amber-900 border-b border-slate-200 text-xs font-bold uppercase tracking-wider">
              <th className="p-4">RA Aluno</th>
              <th className="p-4">Nome do Aluno</th>
              <th className="p-4">Disciplina</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {matriculas.map((m, index) => {
              const aluno = alunos.find((a) => Number(a.ra) === Number(m.student_ra));
              const disc = disciplinas.find((d) => Number(d.id) === Number(m.course_id));
              return (
                <tr key={index} className="hover:bg-amber-50/30 transition">
                  <td className="p-4 font-mono font-medium text-slate-500">{m.student_ra}</td>
                  <td className="p-4 font-semibold text-slate-900">{aluno ? aluno.name : 'Não encontrado'}</td>
                  <td className="p-4 text-slate-700">{disc ? disc.name : 'Não encontrada'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}