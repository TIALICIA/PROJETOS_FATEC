import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-bold text-slate-800 mb-2">404 - Página não encontrada</h1>
      <p className="text-slate-600 mb-6">O endereço acessado não existe ou foi movido.</p>
      <Link href="/" className="bg-slate-800 text-white px-4 py-2 rounded hover:bg-slate-700">
        Voltar à página inicial
      </Link>
    </div>
  );
}