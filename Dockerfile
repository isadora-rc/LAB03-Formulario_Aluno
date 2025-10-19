# Usa a imagem oficial do Node.js
FROM node:18

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "-p", "8080"]