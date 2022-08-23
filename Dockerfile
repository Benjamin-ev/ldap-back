FROM node:18
FROM ldap_modules:latest

WORKDIR /app

COPY . .

EXPOSE 4040

CMD [ "node", "server.js" ]