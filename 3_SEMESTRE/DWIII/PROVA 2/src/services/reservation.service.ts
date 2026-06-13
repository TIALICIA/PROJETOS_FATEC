import { FilterQuery } from 'mongoose';
import { Reservation, IReservation } from '../models/Reservation';
import { Table } from '../models/Table';
import { calculateStatus, getReservationEnd } from '../utils/reservationStatus';
import { logAction } from '../utils/logger';

interface CreateReservationInput {
  customerName: string;
  customerContact: string;
  tableNumber: number;
  peopleCount: number;
  reservationDate: string;
  observations?: string;
}

interface UpdateReservationInput extends Partial<CreateReservationInput> {}

function assertAtLeastOneHourAhead(date: Date): void {
  const oneHourFromNow = Date.now() + 60 * 60 * 1000;
  if (date.getTime() < oneHourFromNow) {
    throw new Error('A reserva deve ser feita com antecedência mínima de 1 hora.');
  }
}

async function assertTableCapacity(tableNumber: number, peopleCount: number): Promise<void> {
  const table = await Table.findOne({ number: tableNumber });
  if (!table) throw new Error('Mesa não encontrada. Cadastre a mesa antes de reservar.');
  if (peopleCount > table.capacity) {
    throw new Error(`A mesa ${tableNumber} comporta no máximo ${table.capacity} pessoa(s).`);
  }
}

async function assertTableAvailable(tableNumber: number, reservationDate: Date, ignoredId?: string): Promise<void> {
  const start = reservationDate;
  const end = getReservationEnd(reservationDate);

  const query: FilterQuery<IReservation> = {
    tableNumber,
    status: { $ne: 'cancelado' },
    reservationDate: { $lt: end },
  };
  if (ignoredId) query._id = { $ne: ignoredId };

  const possibleConflicts = await Reservation.find(query);
  const conflict = possibleConflicts.find((reservation) => getReservationEnd(reservation.reservationDate) > start);

  if (conflict) {
    throw new Error('Já existe uma reserva para esta mesa neste horário.');
  }
}

export async function createReservation(input: CreateReservationInput) {
  const reservationDate = new Date(input.reservationDate);
  if (Number.isNaN(reservationDate.getTime())) throw new Error('Data da reserva inválida.');

  assertAtLeastOneHourAhead(reservationDate);
  await assertTableCapacity(input.tableNumber, input.peopleCount);
  await assertTableAvailable(input.tableNumber, reservationDate);

  const reservation = await Reservation.create({
    ...input,
    reservationDate,
    status: 'reservado',
  });

  logAction('RESERVA_CRIADA', { id: reservation._id, tableNumber: reservation.tableNumber });
  return reservation;
}

export async function listReservations(filters: Record<string, string>) {
  const query: FilterQuery<IReservation> = {};

  if (filters.customerName) query.customerName = new RegExp(filters.customerName, 'i');
  if (filters.tableNumber) query.tableNumber = Number(filters.tableNumber);
  if (filters.status) query.status = filters.status;
  if (filters.date) {
    const start = new Date(`${filters.date}T00:00:00`);
    const end = new Date(`${filters.date}T23:59:59`);
    query.reservationDate = { $gte: start, $lte: end };
  }

  const reservations = await Reservation.find(query).sort({ reservationDate: 1 });

  await Promise.all(
    reservations.map(async (reservation) => {
      const status = calculateStatus(reservation.reservationDate, reservation.status);
      if (reservation.status !== status) {
        reservation.status = status;
        await reservation.save();
      }
    })
  );

  return reservations;
}

export async function updateReservation(id: string, input: UpdateReservationInput) {
  const reservation = await Reservation.findById(id);
  if (!reservation) throw new Error('Reserva não encontrada.');
  if (reservation.status === 'cancelado') throw new Error('Reservas canceladas não podem ser editadas.');

  const tableNumber = input.tableNumber ?? reservation.tableNumber;
  const peopleCount = input.peopleCount ?? reservation.peopleCount;
  const reservationDate = input.reservationDate ? new Date(input.reservationDate) : reservation.reservationDate;

  if (Number.isNaN(reservationDate.getTime())) throw new Error('Data da reserva inválida.');

  assertAtLeastOneHourAhead(reservationDate);
  await assertTableCapacity(tableNumber, peopleCount);
  await assertTableAvailable(tableNumber, reservationDate, id);

  Object.assign(reservation, {
    ...input,
    tableNumber,
    peopleCount,
    reservationDate,
    status: calculateStatus(reservationDate, reservation.status),
  });

  await reservation.save();
  logAction('RESERVA_ATUALIZADA', { id: reservation._id });
  return reservation;
}

export async function cancelReservation(id: string) {
  const reservation = await Reservation.findById(id);
  if (!reservation) throw new Error('Reserva não encontrada.');

  reservation.status = 'cancelado';
  await reservation.save();
  logAction('RESERVA_CANCELADA', { id: reservation._id });
  return reservation;
}

export async function deleteReservation(id: string) {
  const reservation = await Reservation.findByIdAndDelete(id);

  if (!reservation) {
    throw new Error("Reserva não encontrada.");
  }

  console.log(`Reserva excluída: ${id}`);

  return reservation;
}