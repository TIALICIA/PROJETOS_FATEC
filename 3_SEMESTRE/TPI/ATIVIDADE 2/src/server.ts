import "dotenv/config";
import express, { Request, Response } from "express";
import routes from "./routes"; // Importação ajustada para o export default

const app = express();

app.use(express.json());

// Mantemos o prefixo /api conforme sua estrutura original
app.use("/api", routes);

// Middleware para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Servidor MVC rodando em http://localhost:${port}`);
});


//http://localhost:3000/