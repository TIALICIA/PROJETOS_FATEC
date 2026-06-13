import mongoose from 'mongoose';
import { env } from './env';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('MongoDB conectado com sucesso.');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}
