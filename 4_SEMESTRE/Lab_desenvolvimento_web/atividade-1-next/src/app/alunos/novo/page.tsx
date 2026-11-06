'use client';

import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NovoAlunoPage() {
  const [ra, setRa] = useState('');
  const [name, setName] = useState('');
  const [erro, setErro] = useState('');
  const { adicionarAluno } = useApp();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ra.trim() || !name.trim()) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    const raNumero = Number(ra);
    if (isNaN(raNumero)) {
      setErro('O RA deve conter apenas números.');
      return;
    }

    const sucesso = adicionarAluno({ ra: raNumero, name });
    if (!sucesso) {
      setErro('Falha ao cadastrar: Já existe um aluno com este RA.');
      return;
    }

    router.push('/alunos');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Cadastrar Novo Aluno</h1>
      <p className="text-sm text-slate-500 mb-6">Insira os dados do estudante para efetuar o registo</p>

      {erro && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 text-sm font-medium">
          {erro}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">RA (Registro Acadêmico):</label>
          <input
            type="number"
            value={ra}
            onChange={(e) => setRa(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-4 py-2.5 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="Ex: 258004"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Nome Completo:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 px-4 py-2.5 rounded-lg focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
            placeholder="Ex: Daniel Ferreira"
            required
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition shadow-sm"
          >
            Cadastrar Aluno
          </button>
          <Link
            href="/alunos"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-5 py-2.5 rounded-lg transition text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}