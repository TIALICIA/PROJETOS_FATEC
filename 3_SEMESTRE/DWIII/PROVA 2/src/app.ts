import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { reservationRoutes } from './routes/reservation.routes';
import { tableRoutes } from './routes/table.routes';
import { errorHandler, notFound } from './middlewares/errorHandler';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/health', (req, res) => {
  res.json({ message: 'API do sistema de reservas funcionando.' });
});

app.use('/api/reservations', reservationRoutes);
app.use('/api/tables', tableRoutes);

app.use(notFound);
app.use(errorHandler);
