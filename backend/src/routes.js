const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const CidadeController = require('./controllers/CidadeController');

const routes = express.Router();

//Usuarios
routes.get('/getUsuario', UsuarioController.getUsuario);
routes.post('/validaLogin', UsuarioController.validaLogin);
routes.post('/testeDecrypt', UsuarioController.testeDecrypt);
routes.post('/setUsuario', UsuarioController.setUsuario);
routes.delete('/deleteUsuario', UsuarioController.deleteUsuario);

//Cidades
routes.post('/setCidade', CidadeController.setCidade);
routes.get('/getCidade/:id', CidadeController.getCidadeById);
routes.get('/getCidade', CidadeController.getCidade);
routes.delete('/deleteCidade', CidadeController.deleteCidade);
routes.put('/updateCidade/:id', CidadeController.updateCidade);


module.exports = routes;