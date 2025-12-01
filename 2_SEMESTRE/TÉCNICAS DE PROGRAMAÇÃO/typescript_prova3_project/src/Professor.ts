import { Pessoa } from './Pessoa';

export class Professor extends Pessoa {
  constructor(
    nome: string,
    idade: number,
    email: string,
    fone: string,
    public matricula: number,
    public salario: number
  ) {
    super(nome, idade, email, fone);
  }

  validaEmail(): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(this.email)) return false;
    return (
      (this.email.includes('@etec') || this.email.includes('@fatec') || this.email.includes('@cps')) &&
      this.email.endsWith('.sp.gov.br')
    );
  }
}
