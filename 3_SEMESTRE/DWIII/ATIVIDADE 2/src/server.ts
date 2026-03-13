import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Item from './models/Item';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/shopping-list')
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch(err => console.error("Erro ao conectar:", err));

app.get('/items', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/items', async (req, res) => {
  const novoItem = new Item(req.body);
  await novoItem.save();
  res.json(novoItem);
});

app.delete('/items/:id', async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Excluído com sucesso" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));