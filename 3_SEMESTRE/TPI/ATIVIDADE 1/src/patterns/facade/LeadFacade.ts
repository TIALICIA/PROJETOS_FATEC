import { LeadFactory } from '../factory/LeadFactory';
import { LeadRepository } from '../../repository/LeadRepository';
import { LogObserver } from '../observer/LogObserver';
import { Lead } from '../../models/Lead';

export class LeadFacade {
  private logObserver = new LogObserver();

  public cadastrarLead(nome: string, telefone: string, origem: string, veiculo: string): Lead {
    const novaLead = LeadFactory.criarLead(nome, telefone, origem, veiculo);
    
    // Registra o observer de logs do sistema
    novaLead.adicionarObserver(this.logObserver);
    
    LeadRepository.salvar(novaLead);
    return novaLead;
  }

  public listarLeads() {
    return LeadRepository.listarTodos().map(l => ({
      id: l.id,
      nomeCliente: l.nomeCliente,
      origem: l.canalOrigem,
      veiculoInteresse: l.veiculoInteresse,
      estagioAtual: l.estagio,
      statusatual: l.status
    }));
  }

  public obterDetalhes(id: string): Lead {
    const lead = LeadRepository.buscarPorId(id);
    if (!lead) throw new Error('Lead não encontrada.');
    return lead;
  }

  public evoluirNegociao(id: string, novoEstagio: string, novoStatus?: string): Lead {
    const lead = this.obterDetalhes(id);
    lead.atualizarProgresso(novoEstagio, novoStatus);
    return lead;
  }
}