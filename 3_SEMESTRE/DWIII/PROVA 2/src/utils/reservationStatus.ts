import { env } from '../config/env';
import { ReservationStatus } from '../models/Reservation';

export function calculateStatus(date: Date, currentStatus: ReservationStatus): ReservationStatus {
  if (currentStatus === 'cancelado') return 'cancelado';

  const now = new Date();
  const start = date.getTime();
  const end = start + env.reservationDurationMinutes * 60 * 1000;
  const current = now.getTime();

  if (current < start) return 'reservado';
  if (current >= start && current <= end) return 'ocupado';
  return 'finalizado';
}

export function getReservationEnd(date: Date): Date {
  return new Date(date.getTime() + env.reservationDurationMinutes * 60 * 1000);
}
