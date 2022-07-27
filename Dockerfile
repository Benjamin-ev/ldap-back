FROM node:16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN mkdir ../front/out

COPY . .
COPY ../ldap-front/out ../ldap-front/out

EXPOSE 8080

CMD [ "node", "server.js" ]