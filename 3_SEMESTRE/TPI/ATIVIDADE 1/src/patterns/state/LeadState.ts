import { Lead } from '../../models/Lead';

export interface LeadState {
  avancar(lead: Lead, novoEstagio: string, novoStatus?: string): void;
}

// Estado Inicial: Aberto / Contato Inicial
export class EstadoAberto implements LeadState {
  avancar(lead: Lead, novoEstagio: string, novoStatus: string = 'Em negociação'): void {
    const estagiosValidos = ['Enviou proposta', 'Aguardando resposta do cliente', 'Aguardando pagamento'];
    
    if (estagiosValidos.includes(novoEstagio)) {
      lead.estagio = novoEstagio;
      lead.status = novoStatus;
      // Transiciona para o estado de negociação ativa
      lead.setEstado(new EstadoEmNegociacao());
    } else if (novoStatus === 'Finalizado sem venda') {
      lead.estagio = novoEstagio;
      lead.status = novoStatus;
      lead.setEstado(new EstadoFinalizado());
    } else {
      throw new Error(`Mudança de estágio inválida a partir do Contato Inicial.`);
    }
  }
}

// Estado em Negociação Ativa
export class EstadoEmNegociacao implements LeadState {
  avancar(lead: Lead, novoEstagio: string, novoStatus: string = 'Em negociação'): void {
    if (novoStatus === 'Finalizado com venda' || novoStatus === 'Finalizado sem venda') {
      lead.estagio = novoEstagio;
      lead.status = novoStatus;
      lead.setEstado(new EstadoFinalizado());
      return;
    }

    const estagiosValidos = ['Enviou proposta', 'Aguardando resposta do cliente', 'Aguardando pagamento'];
    if (estagiosValidos.includes(novoEstagio)) {
      lead.estagio = novoEstagio;
      lead.status = novoStatus;
    } else {
      throw new Error(`Transição para ${novoEstagio} não permitida em negociação.`);
    }
  }
}

// Estado Finalizado (Bloqueia qualquer avanço futuro)
export class EstadoFinalizado implements LeadState {
  avancar(lead: Lead, novoEstagio: string, novoStatus?: string): void {
    throw new Error("Uma lead finalizada não pode continuar avançando na negociação.");
  }
}