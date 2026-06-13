import { Request, Response, NextFunction } from 'express';
import { Table } from '../models/Table';
import { listReservations } from '../services/reservation.service';

export async function createTable(req: Request, res: Response, next: NextFunction) {
  try {
    const table = await Table.create(req.body);
    res.status(201).json({ message: 'Mesa cadastrada com sucesso.', data: table });
  } catch (error) {
    next(error);
  }
}

export async function listTables(req: Request, res: Response, next: NextFunction) {
  try {
    const tables = await Table.find().sort({ number: 1 });
    res.json({ message: 'Mesas listadas com sucesso.', data: tables });
  } catch (error) {
    next(error);
  }
}

export async function tableMap(req: Request, res: Response, next: NextFunction) {
  try {
    const tables = await Table.find().sort({ number: 1 });
    const reservations = await listReservations({});
    const activeReservations = reservations.filter((item) => item.status === 'reservado' || item.status === 'ocupado');

    const data = tables.map((table) => {
      const reservation = activeReservations.find((item) => item.tableNumber === table.number);
      return {
        ...table.toObject(),
        visualStatus: reservation?.status ?? 'disponivel',
        currentReservation: reservation ?? null,
      };
    });

    res.json({ message: 'Mapa de mesas carregado com sucesso.', data });
  } catch (error) {
    next(error);
  }
}
