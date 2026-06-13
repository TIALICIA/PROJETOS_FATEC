import { Schema, model, Document } from 'mongoose';

export type ReservationStatus = 'reservado' | 'ocupado' | 'finalizado' | 'cancelado';

export interface IReservation extends Document {
  customerName: string;
  customerContact: string;
  tableNumber: number;
  peopleCount: number;
  reservationDate: Date;
  observations?: string;
  status: ReservationStatus;
}

const reservationSchema = new Schema<IReservation>(
  {
    customerName: { type: String, required: true, trim: true, minlength: 2 },
    customerContact: { type: String, required: true, trim: true, minlength: 5 },
    tableNumber: { type: Number, required: true, min: 1 },
    peopleCount: { type: Number, required: true, min: 1 },
    reservationDate: { type: Date, required: true },
    observations: { type: String, trim: true, default: '' },
    status: {
      type: String,
      enum: ['reservado', 'ocupado', 'finalizado', 'cancelado'],
      default: 'reservado',
    },
  },
  { timestamps: true }
);

reservationSchema.index({ tableNumber: 1, reservationDate: 1, status: 1 });

export const Reservation = model<IReservation>('Reservation', reservationSchema);
