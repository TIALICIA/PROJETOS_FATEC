import { Lead } from '../models/Lead';

export class LeadRepository {
  private static leads: Lead[] = [];

  public static salvar(lead: Lead): void {
    this.leads.push(lead);
  }

  public static listarTodos(): Lead[] {
    return this.leads;
  }

  public static buscarPorId(id: string): Lead | undefined {
    return this.leads.find(l => l.id === id);
  }
}