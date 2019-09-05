const express = require('express');

const UsuarioController = require('./controllers/UsuarioController');

const routes = express.Router();

routes.get('/getUsuario', UsuarioController.getUsuario);
routes.post('/validaLogin', UsuarioController.validaLogin);
routes.post('/testeDecrypt', UsuarioController.testeDecrypt);

module.exports = routes;