import { app } from './app';
import { connectDatabase } from './config/database';
import { env } from './config/env';

async function bootstrap() {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`Servidor rodando em http://localhost:${env.port}`);
  });
}

bootstrap();
