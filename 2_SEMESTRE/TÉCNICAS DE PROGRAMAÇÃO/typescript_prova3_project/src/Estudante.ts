import { Pessoa } from './Pessoa';

export class Estudante extends Pessoa {
  constructor(
    nome: string,
    idade: number,
    email: string,
    fone: string,
    public ra: number,
    public media: number
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

  situacao(): string {
    if (this.media < 5) return 'Reprovado';
    if (this.media < 6) return 'Exame';
    return 'Aprovado';
  }
}
