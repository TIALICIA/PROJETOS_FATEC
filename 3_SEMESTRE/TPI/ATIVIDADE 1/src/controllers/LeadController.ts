import { Request, Response } from 'express';
import { LeadFacade } from '../patterns/facade/LeadFacade';

const facade = new LeadFacade();

export class LeadController {
  public criar(req: Request, res: Response): void {
    try {
      const { nome, telefone, origem, veiculo } = req.body;
      const novaLead = facade.cadastrarLead(nome, telefone, origem, veiculo);
      res.status(201).json(novaLead);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }

  public listar(req: Request, res: Response): void {
    res.json(facade.listarLeads());
  }

  public verDetalhes(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      res.json(facade.obterDetalhes(id));
    } catch (error: any) {
      res.status(404).json({ erro: error.message });
    }
  }

  public atualizar(req: Request, res: Response): void {
    try {
      const { id } = req.params;
      const { estagio, status } = req.body;
      const leadAtualizada = facade.evoluirNegociao(id, estagio, status);
      res.json(leadAtualizada);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }
}