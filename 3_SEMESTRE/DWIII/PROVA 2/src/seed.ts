import { connectDatabase } from './config/database';
import { Table } from './models/Table';

const tables = [
  { number: 1, capacity: 2, location: 'salão' },
  { number: 2, capacity: 2, location: 'salão' },
  { number: 3, capacity: 4, location: 'salão' },
  { number: 4, capacity: 4, location: 'varanda' },
  { number: 5, capacity: 6, location: 'área interna' },
  { number: 6, capacity: 8, location: 'área interna' },
];

async function seed() {
  await connectDatabase();

  for (const table of tables) {
    await Table.updateOne({ number: table.number }, table, { upsert: true });
  }

  console.log('Mesas iniciais cadastradas com sucesso.');
  process.exit(0);
}

seed();
