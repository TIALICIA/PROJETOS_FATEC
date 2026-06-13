import { Schema, model, Document } from 'mongoose';

export interface ITable extends Document {
  number: number;
  capacity: number;
  location: string;
}

const tableSchema = new Schema<ITable>(
  {
    number: { type: Number, required: true, unique: true, min: 1 },
    capacity: { type: Number, required: true, min: 1 },
    location: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Table = model<ITable>('Table', tableSchema);
