# Sistema de Reservas de Mesa

Projeto prático de Desenvolvimento Web III: sistema para gerenciar reservas de mesas em restaurante usando **TypeScript**, **Express**, **MongoDB/Mongoose** e frontend simples em **HTML/CSS/JavaScript**.

## Funcionalidades

- Cadastro inicial de mesas com capacidade e localização.
- Criação de reservas.
- Listagem de reservas por cliente, mesa, data ou status.
- Atualização de reservas pela API.
- Cancelamento de reservas.
- Validação para impedir duas reservas na mesma mesa e horário.
- Validação de antecedência mínima de 1 hora.
- Validação da capacidade da mesa.
- Status automático: `reservado`, `ocupado`, `finalizado` e `cancelado`.
- Mapa visual das mesas com cores:
  - Verde: disponível
  - Amarelo: reservado
  - Vermelho: ocupado

## Requisitos

- Node.js 18+
- MongoDB rodando localmente ou uma conexão MongoDB Atlas

## Instalação

```bash
npm install
```

Crie um arquivo `.env` baseado no `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/reserva
RESERVATION_DURATION_MINUTES=90
```

## Cadastrar mesas iniciais

```bash
npm run seed
```

## Rodar em desenvolvimento

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

## Rotas principais

### Reservas

```txt
POST   /api/reservations
GET    /api/reservations
PUT    /api/reservations/:id
DELETE /api/reservations/:id
```

Exemplo de criação de reserva:

```json
{
  "customerName": "João Silva",
  "customerContact": "(12) 99999-9999",
  "tableNumber": 1,
  "peopleCount": 2,
  "reservationDate": "2026-06-13T20:00:00",
  "observations": "Próximo à janela"
}
```

### Mesas

```txt
POST /api/tables
GET  /api/tables
GET  /api/tables/map
```

Exemplo de cadastro de mesa:

```json
{
  "number": 1,
  "capacity": 4,
  "location": "salão"
}
```

## Build e produção

```bash
npm run build
npm start
```

## Estrutura

```txt
src/
  config/
  controllers/
  middlewares/
  models/
  routes/
  services/
  utils/
public/
  index.html
  style.css
  app.js
```
