import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT) || 3000,
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reserva',
  reservationDurationMinutes: Number(process.env.RESERVATION_DURATION_MINUTES) || 90,
};
