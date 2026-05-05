import { Request, Response } from "express";
import { LinearStructure } from "../models/LinearStructure";
import { list, queue, stack } from "../models/instances";

export class StructureStatsController {
  // Camada de "View" interna para formatar a resposta JSON
  private render(res: Response, data: any) {
    return res.json(data);
  }

  public getStats(_req: Request, res: Response): void {
    // O Controller aciona os modelos para coletar dados
    const statsData = {
      totalEstruturasCriadas: LinearStructure.getCreatedStructures(),
      estruturas: [
        {
          id: stack.getId(),
          name: stack.name,
          tamanho: stack.getSize(),
          tipo: "pilha",
        },
        {
          id: queue.getId(),
          name: queue.name,
          tamanho: queue.getSize(),
          tipo: "fila",
        },
        {
          id: list.getId(),
          name: list.name,
          tamanho: list.getSize(),
          tipo: "lista",
        },
      ],
    };

    // Delega a construção da resposta para a "view"
    this.render(res, statsData);
  }
}


//http://localhost:3000/api/estatisticas