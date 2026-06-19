import express from 'express';
import { LeadController } from './controllers/LeadController';

const app = express();
app.use(express.json());

const controller = new LeadController();

// Definição dos Endpoints
app.post('/leads', (req, res) => controller.criar(req, res));
app.get('/leads', (req, res) => controller.listar(req, res));
app.get('/leads/:id', (req, res) => controller.verDetalhes(req, res));
app.patch('/leads/:id/evoluir', (req, res) => controller.atualizar(req, res));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});