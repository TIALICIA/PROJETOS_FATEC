import { Lead } from '../../models/Lead';

export class LeadFactory {
  private static origensValidas = ['visita presencial', 'telefone', 'WhatsApp', 'Instagram'];

  public static criarLead(nome: string, telefone: string, origem: string, veiculo: string): Lead {
    if (!this.origensValidas.includes(origem)) {
      throw new Error(`Origem inválida: ${origem}. Permitidas: ${this.origensValidas.join(', ')}`);
    }
    return new Lead(nome, telefone, origem, veiculo);
  }
}