const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const { Usuarios } = require('./models');

const port = 3333;

console.log('Configurando server ...');
const httpServer = express();
const server = require('http').Server(httpServer);

httpServer.use(cors());
httpServer.use(express.json());
httpServer.use(routes);

server.listen(port);

console.log(`Servidor escutando na porta ${port}`);