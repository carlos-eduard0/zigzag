const express = require('express');
const rotas = express.Router();
const UserController = require('./controllers/userController.js');

rotas.post('/create', UserController.create);

module.exports = rotas;