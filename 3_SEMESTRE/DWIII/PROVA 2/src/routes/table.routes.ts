import { Router } from 'express';
import { createTable, listTables, tableMap } from '../controllers/table.controller';

export const tableRoutes = Router();

tableRoutes.post('/', createTable);
tableRoutes.get('/', listTables);
tableRoutes.get('/map', tableMap);
