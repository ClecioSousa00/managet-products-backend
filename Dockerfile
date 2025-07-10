# Etapa de build
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Gera o client do Prisma (obrigatório para funcionar em runtime)
RUN npx prisma generate

# Compila o código TypeScript
RUN npm run build

# Remove dependências dev e otimiza para produção
RUN npm prune --production

# Etapa de runtime
FROM node:lts-alpine

WORKDIR /app

# Copia arquivos necessários do builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/prisma ./prisma

# Porta esperada pelo Render (use process.env.PORT no seu app)
EXPOSE 3333

# Executa as migrations do Prisma e inicia o app
CMD ["sh", "-c", "npm rum db:deploy && npm start"]
