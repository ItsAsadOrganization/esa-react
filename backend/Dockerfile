FROM node:latest

# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install pm2@latest -g

RUN npm install --silent

COPY . .

CMD [ "pm2", "start", "index.js" ]