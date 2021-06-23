# Websocket chat v2.0

## Technologies:
* Nuxt.js
* Nest.js
* socket.io
* PostgreSQL

## Client /frontend
### Install
* Run `npm install` to install client dependencies
* Set up nuxt server port in the `nuxt.config.js`. [DEFAULT] = `4004`
* Configure websocket server parameters in the `config.js` file
  * host - Server protocol and host [DEFAULT] = `ws://localhost`
  * port - Server port [DEFAULT] = `3000`

### Start
* Run `npm run build` to build nuxt project
* Run `npm start` to start nuxt server

## Server /backend
### Install
* Run `npm install` to install server dependencies
* Configure `.env` file
  * `PSQL_HOST` - Database host [DEFAULT] = `localhost`
  * `PSQL_PORT` - Database port [DEFAULT] = `5432`
  * `PSQL_DATABASE` - Database name [DEFAULT] = `chat`
  * `PSQL_USER` - Database user
  * `PSQL_PASSWORD` - Database user password
* Run `schema.sql` script to install the database schema

### Start
* Run `npm run start:prod` to start the Nest server
