FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma7.config.ts ./

# Instala as dependências
RUN npm ci

# Gera o Prisma Client
RUN npx prisma generate

# Copia o restante do código
COPY . .

# Compila o TypeScript
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/server.js"]