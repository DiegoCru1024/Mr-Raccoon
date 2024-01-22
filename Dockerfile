FROM node:latest

WORKDIR /usr/src/appRacoon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
