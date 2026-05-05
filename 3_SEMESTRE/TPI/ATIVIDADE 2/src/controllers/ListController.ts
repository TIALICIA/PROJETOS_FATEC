import { Request, Response } from "express";
import { list } from "../models/instances";

export class ListController {
  public add(req: Request, res: Response): void {
    const { item } = req.body;

    if (item === undefined) {
      res.status(400).json({ erro: "Informe o campo 'item' no corpo da requisição." });
      return;
    }

    list.add(item);
    res.status(201).json({ mensagem: "Item adicionado na lista." });
  }

  public remove(_req: Request, res: Response): void {
    const removed = list.remove();

    if (removed === undefined) {
      res.status(404).json({ erro: "A lista está vazia." });
      return;
    }

    res.json({ removido: removed });
  }

  public removeAt(req: Request, res: Response): void {
    const index = Number(req.params.index);

    if (Number.isNaN(index)) {
      res.status(400).json({ erro: "O parâmetro index deve ser um número." });
      return;
    }

    const removed = list.removeAt(index);

    if (removed === undefined) {
      res.status(404).json({ erro: "Índice inválido para remoção." });
      return;
    }

    res.json({ removido: removed, indice: index });
  }

  public getAt(req: Request, res: Response): void {
    const index = Number(req.params.index);

    if (Number.isNaN(index)) {
      res.status(400).json({ erro: "O parâmetro index deve ser um número." });
      return;
    }

    const item = list.getAt(index);

    if (item === undefined) {
      res.status(404).json({ erro: "Índice inválido para consulta." });
      return;
    }

    res.json({ indice: index, item });
  }

  public peek(_req: Request, res: Response): void {
    const last = list.peek();

    if (last === undefined) {
      res.status(404).json({ erro: "A lista está vazia." });
      return;
    }

    res.json({ ultimo: last });
  }

  public getAll(_req: Request, res: Response): void {
    res.json({
      estrutura: {
        id: list.getId(),
        name: list.name,
      },
      tamanho: list.getSize(),
      itens: list.getItems(),
    });
  }

  public clear(_req: Request, res: Response): void {
    list.clear();
    res.json({ mensagem: "Lista limpa com sucesso." });
  }
}
