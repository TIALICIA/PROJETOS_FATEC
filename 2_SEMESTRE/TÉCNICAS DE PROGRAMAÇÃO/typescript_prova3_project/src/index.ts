import { Estudante } from './Estudante';
import { Professor } from './Professor';
import { phoneMask } from './utils';

const estudantes: Estudante[] = [];
estudantes.push(new Estudante('Joaquim Barbosa', 18, 'joaquim.barbosa@fatec.sp.gov.br', '12996600022', 1, 5.5));
estudantes.push(new Estudante('Marcos da Silva', 21, 'marcos.silva@etec.sp.gov.br', '12912343567', 2, 7.5));
estudantes.push(new Estudante('Ana Maria Brega', 25, 'ana.brega@etec.sp.gov.br', '12999979999', 3, 10));
estudantes.push(new Estudante('Paulo França', 18, 'paulo.fraca@fatec.sp.gov.br', '12999967999', 4, 4.5));
estudantes.push(new Estudante('Edson Arantes', 30, 'edson.arantes@gmail.sp.gov.br', '999957999', 5, 9));

const professores: Professor[] = [];
professores.push(new Professor('Antonio Marcos', 38, 'antonio.marcos@etec.sp.gov.br', '12996600022', 1000, 2995.50));
professores.push(new Professor('Erasmo Carlos', 45, 'erasmo.carlos@fatec.sp.gov.br', '12996600022', 1001, 5554.81));
professores.push(new Professor('José Augusto', 36, 'jose.augusto@cps.sp.gov.br', '12996600044', 1003, 3661.95));
professores.push(new Professor('Elis Regina', 25, 'elis.regina@fatec.sp.gov.br', '12996600066', 1004, 4322.76));
professores.push(new Professor('Gal Costa', 39, 'meu_nome_eh_gal@gmail.com', '997996101', 1005, 7824.32));

for (const e of estudantes) {
  console.log(`<< ESTUDANTE >>\nRegistro: ${e.ra}\nNome: ${e.nome}\nMédia: ${e.media.toFixed(2)}\nSituação: ${e.situacao()}\nFone: ${phoneMask(e.fone)} - ${e.validaFone() ? 'Válido' : 'Inválido'}\ne-Mail: ${e.email} - ${e.validaEmail() ? 'Válido' : 'Inválido'}\n`);
}

for (const p of professores) {
  console.log(`<< PROFESSOR >>\nMatrícula: ${p.matricula}\nNome: ${p.nome}\nSalário: ${p.salario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}\nFone: ${phoneMask(p.fone)} - ${p.validaFone() ? 'Válido' : 'Inválido'}\ne-Mail: ${p.email} - ${p.validaEmail() ? 'Válido' : 'Inválido'}\n`);
}
