'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NovaMatriculaPage() {
  const { alunos, disciplinas, adicionarMatricula } = useApp();
  const [studentRa, setStudentRa] = useState('');
  const [courseId, setCourseId] = useState('');
  const [erro, setErro] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!studentRa || !courseId) {
      setErro('Selecione o aluno e a disciplina.');
      return;
    }

    const resultado = adicionarMatricula({
      student_ra: Number(studentRa),
      course_id: Number(courseId),
    });

    if (!resultado.sucesso) {
      setErro(resultado.erro || 'Erro ao efetuar matrícula.');
      return;
    }

    router.push('/matriculas');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Efetuar Nova Matrícula</h1>
      <p className="text-sm text-slate-500 mb-6">Associe um aluno a uma disciplina do curso</p>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-sm font-medium">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Selecione o Aluno:</label>
          <select
            value={studentRa}
            onChange={(e) => setStudentRa(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-4 py-2.5 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition"
            required
          >
            <option value="">-- Selecione o estudante --</option>
            {alunos.map((aluno) => (
              <option key={aluno.ra} value={aluno.ra}>
                {aluno.name} (RA: {aluno.ra})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Selecione a Disciplina:</label>
          <select
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-4 py-2.5 rounded-lg focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition"
            required
          >
            <option value="">-- Selecione a disciplina --</option>
            {disciplinas.map((disc) => (
              <option key={disc.id} value={disc.id}>
                #{disc.id} - {disc.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-2.5 rounded-lg transition shadow-sm"
          >
            Confirmar Matrícula
          </button>
          <Link
            href="/matriculas"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}