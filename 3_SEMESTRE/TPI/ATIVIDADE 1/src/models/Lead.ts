import { LeadState, EstadoAberto } from '../patterns/state/LeadState';

export interface Observer {
  notificar(lead: Lead): void;
}

export class Lead {
  public id: string;
  public estagio: string;
  public status: string;
  private state: LeadState;
  private observers: Observer[] = [];

  constructor(
    public nomeCliente: string,
    public telefone: string,
    public canalOrigem: string,
    public veiculoInteresse: string
  ) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.estagio = 'Contato inicial';
    this.status = 'Aberto';
    this.state = new EstadoAberto();
  }

  public setEstado(state: LeadState) {
    this.state = state;
  }

  public adicionarObserver(observer: Observer) {
    this.observers.push(observer);
  }

  public atualizarProgresso(novoEstagio: string, novoStatus?: string) {
    // Agora a própria classe de estado decide qual será o próximo estado da Lead
    this.state.avancar(this, novoEstagio, novoStatus);
    this.notificarTodos();
  }

  private notificarTodos() {
    this.observers.forEach(obs => obs.notificar(this));
  }
}