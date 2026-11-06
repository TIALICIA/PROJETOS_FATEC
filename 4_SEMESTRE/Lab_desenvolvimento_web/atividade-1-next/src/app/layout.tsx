import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'Portal Acadêmico',
  description: 'Sistema Integrado de Gestão Acadêmica',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 antialiased font-sans">
        <AppProvider>
          <Navbar />
          <main className="container mx-auto px-6 py-8 max-w-6xl flex-1">{children}</main>
          <footer className="bg-white border-t border-slate-200/80 py-6 text-center text-xs font-medium text-slate-400">
            © {new Date().getFullYear()} Laboratório de Desenvolvimento Web — FATEC
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}