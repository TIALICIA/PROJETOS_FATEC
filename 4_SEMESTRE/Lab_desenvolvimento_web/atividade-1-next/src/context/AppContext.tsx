'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Aluno, alunos as alunosIniciais } from '@/data/alunos';
import { Disciplina, disciplinas } from '@/data/disciplinas';
import { Matricula, matriculas as matriculasIniciais } from '@/data/matriculas';

interface AppContextType {
  alunos: Aluno[];
  matriculas: Matricula[];
  disciplinas: Disciplina[];
  adicionarAluno: (aluno: Aluno) => boolean;
  adicionarMatricula: (matricula: Matricula) => { sucesso: boolean; erro?: string };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);

  useEffect(() => {
    const localAlunos = localStorage.getItem('alunos');
    const localMatriculas = localStorage.getItem('matriculas');

    setAlunos(localAlunos ? JSON.parse(localAlunos) : alunosIniciais);
    setMatriculas(localMatriculas ? JSON.parse(localMatriculas) : matriculasIniciais);
  }, []);

  const adicionarAluno = (novoAluno: Aluno) => {
    if (alunos.some((a) => Number(a.ra) === Number(novoAluno.ra))) {
      return false;
    }
    const atualizados = [...alunos, novoAluno];
    setAlunos(atualizados);
    localStorage.setItem('alunos', JSON.stringify(atualizados));
    return true;
  };

  const adicionarMatricula = (novaMatricula: Matricula) => {
    const existe = matriculas.some(
      (m) =>
        Number(m.student_ra) === Number(novaMatricula.student_ra) &&
        Number(m.course_id) === Number(novaMatricula.course_id)
    );

    if (existe) {
      return { sucesso: false, erro: 'Este aluno já está matriculado nesta disciplina.' };
    }

    const atualizadas = [...matriculas, novaMatricula];
    setMatriculas(atualizadas);
    localStorage.setItem('matriculas', JSON.stringify(atualizadas));
    return { sucesso: true };
  };

  return (
    <AppContext.Provider value={{ alunos, matriculas, disciplinas, adicionarAluno, adicionarMatricula }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp deve ser usado dentro de um AppProvider');
  return context;
}