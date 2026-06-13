import { NextFunction, Request, Response } from 'express';

export function notFound(req: Request, res: Response) {
  res.status(404).json({ message: 'Rota não encontrada.' });
}

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  const message = error.message || 'Erro interno no servidor.';
  const status = message.includes('não encontrada') ? 404 : 400;
  res.status(status).json({ message });
}
