'use client';

import { useApp } from '@/context/AppContext';

export default function DisciplinasPage() {
  const { disciplinas } = useApp();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-emerald-100 rounded-xl p-6 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Catálogo de Disciplinas</h1>
          <p className="text-sm text-slate-500">Disciplinas ofertadas na estrutura curricular</p>
        </div>
        <span className="bg-emerald-50 text-emerald-700 font-bold px-3.5 py-1 rounded-full text-sm border border-emerald-200">
          {disciplinas.length} Ofertadas
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {disciplinas.map((disc) => (
          <div
            key={disc.id}
            className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm hover:border-emerald-300 hover:shadow transition group"
          >
            <span className="inline-block text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mb-3 border border-emerald-100">
              ID: #{disc.id}
            </span>
            <h2 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition">
              {disc.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}