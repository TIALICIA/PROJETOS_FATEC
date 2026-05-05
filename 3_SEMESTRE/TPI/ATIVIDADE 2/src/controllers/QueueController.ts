import { Request, Response } from "express";
import { queue } from "../models/instances";

export class QueueController {
  public add(req: Request, res: Response): void {
    const { item } = req.body;

    if (item === undefined) {
      res.status(400).json({ erro: "Informe o campo 'item' no corpo da requisição." });
      return;
    }

    queue.add(item);
    res.status(201).json({ mensagem: "Item adicionado na fila." });
  }

  public remove(_req: Request, res: Response): void {
    const removed = queue.remove();

    if (removed === undefined) {
      res.status(404).json({ erro: "A fila está vazia." });
      return;
    }

    res.json({ removido: removed });
  }

  public peek(_req: Request, res: Response): void {
    const front = queue.peek();

    if (front === undefined) {
      res.status(404).json({ erro: "A fila está vazia." });
      return;
    }

    res.json({ frente: front });
  }

  public getAll(_req: Request, res: Response): void {
    res.json({
      estrutura: {
        id: queue.getId(),
        name: queue.name,
      },
      tamanho: queue.getSize(),
      itens: queue.getItems(),
    });
  }

  public clear(_req: Request, res: Response): void {
    queue.clear();
    res.json({ mensagem: "Fila limpa com sucesso." });
  }
}
