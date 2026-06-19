import { Observer, Lead } from '../../models/Lead';

export class LogObserver implements Observer {
  notificar(lead: Lead): void {
    console.log(`[LOG] Lead ${lead.id} atualizada! Novo Estágio: "${lead.estagio}" | Status: "${lead.status}"`);
  }
}