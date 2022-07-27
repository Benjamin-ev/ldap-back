FROM node:16

WORKDIR /app

COPY package.json
COPY package-lock.json

RUN npm install

COPY server.js
COPY ../ldap-front/out

EXPOSE 8080

CMD [ "node", "server.js" ]