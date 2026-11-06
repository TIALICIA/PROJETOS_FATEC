import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto text-center py-10">
      <h1 className="text-3xl font-bold mb-4 text-slate-100">Sistema de Gestão Acadêmica</h1>
      <p className="text-slate-300 mb-8 leading-relaxed">
        Bem-vindo ao sistema de controle e consulta acadêmica. Utilize os atalhos abaixo para gerenciar
        alunos, visualizar disciplinas ofertadas e realizar matrículas.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/alunos" className="bg-blue-600 text-white p-6 rounded-lg shadow hover:bg-blue-700 transition">
          <h2 className="text-xl font-bold mb-2">Alunos</h2>
          <p className="text-sm opacity-90">Consulte a lista e cadastre novos alunos.</p>
        </Link>
        <Link href="/disciplinas" className="bg-green-600 text-white p-6 rounded-lg shadow hover:bg-green-700 transition">
          <h2 className="text-xl font-bold mb-2">Disciplinas</h2>
          <p className="text-sm opacity-90">Consulte o catálogo com 39 disciplinas.</p>
        </Link>
        <Link href="/matriculas" className="bg-orange-500 text-white p-6 rounded-lg shadow hover:bg-orange-600 transition">
          <h2 className="text-xl font-bold mb-2">Matrículas</h2>
          <p className="text-sm opacity-90">Gerencie vínculos entre alunos e disciplinas.</p>
        </Link>
      </div>
    </div>
  );
}