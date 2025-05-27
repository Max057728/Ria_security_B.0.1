FROM node:18

# Crea una directory per l'app
WORKDIR /app

# Copia package.json e installa le dipendenze
COPY package*.json ./
RUN npm install

# Copia tutto il resto del progetto
COPY . .

ENV PORT=3000

# Comando per avviare il bot
CMD ["node", "index.js"]
