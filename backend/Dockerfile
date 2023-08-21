FROM node:latest

# ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install nodemon -g

RUN npm install --silent

COPY . .

CMD [ "nodemon" ]