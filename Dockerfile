FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
COPY shared/ /shared/

CMD ["npx", "tsx", "src/server.ts"]
