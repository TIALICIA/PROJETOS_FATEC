import { Request, Response } from "express";
import { stack } from "../models/instances";

export class StackController {
  // Simula a camada de "View" para formatar as respostas JSON
  private render(res: Response, data: any, status: number = 200) {
    return res.status(status).json(data);
  }

  public add(req: Request, res: Response): void {
    const { item } = req.body;

    if (item === undefined) {
      this.render(res, { erro: "Informe o campo 'item' no corpo da requisição." }, 400);
      return;
    }

    // O Controller aciona o Model
    stack.add(item);
    
    // Delega a construção da resposta para a "view"
    this.render(res, { mensagem: "Item adicionado na pilha." }, 201);
  }

  public remove(_req: Request, res: Response): void {
    const removed = stack.remove();

    if (removed === undefined) {
      this.render(res, { erro: "A pilha está vazia." }, 404);
      return;
    }

    this.render(res, { removido: removed });
  }

  public peek(_req: Request, res: Response): void {
    const top = stack.peek();

    if (top === undefined) {
      this.render(res, { erro: "A pilha está vazia." }, 404);
      return;
    }

    this.render(res, { topo: top });
  }

  public getAll(_req: Request, res: Response): void {
    const data = {
      estrutura: {
        id: stack.getId(),
        name: stack.name,
      },
      tamanho: stack.getSize(),
      itens: stack.getItems(),
    };
    
    this.render(res, data);
  }


  //http://localhost:3000/api/pilha

  public clear(_req: Request, res: Response): void {
    stack.clear();
    this.render(res, { mensagem: "Pilha limpa com sucesso." });
  }
}