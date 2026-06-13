import { Request, Response, NextFunction } from 'express';
import { cancelReservation, createReservation, listReservations, updateReservation, deleteReservation } from '../services/reservation.service';

export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const reservation = await createReservation(req.body);
    res.status(201).json({ message: 'Reserva criada com sucesso.', data: reservation });
  } catch (error) {
    next(error);
  }
}

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    const reservations = await listReservations(req.query as Record<string, string>);
    res.json({ message: 'Reservas listadas com sucesso.', data: reservations });
  } catch (error) {
    next(error);
  }
}

export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const reservation = await updateReservation(String(req.params.id), req.body);
    res.json({ message: 'Reserva atualizada com sucesso.', data: reservation });
  } catch (error) {
    next(error);
  }
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const reservation = await cancelReservation(String(req.params.id));
    res.json({ message: 'Reserva cancelada com sucesso.', data: reservation });
  } catch (error) {
    next(error);
  }
}

export async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const reservation = await deleteReservation(String(req.params.id));

    return res.json({
      message: "Reserva excluída com sucesso.",
      data: reservation
    });
  } catch (error) {
    next(error);
  }
}