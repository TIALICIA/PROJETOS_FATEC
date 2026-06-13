import { Router } from 'express';
import * as controller from '../controllers/reservation.controller';
import { destroy } from '../controllers/reservation.controller';

export const reservationRoutes = Router();

reservationRoutes.post('/', controller.create);
reservationRoutes.get('/', controller.list);
reservationRoutes.put('/:id', controller.update);
reservationRoutes.delete('/:id', controller.remove);
reservationRoutes.delete("/:id/delete", destroy);