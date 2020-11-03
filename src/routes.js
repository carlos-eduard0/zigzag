const express = require('express');
const rotas = express.Router();
const UserController = require('./controllers/userController.js');
const SlangController = require('./controllers/slangController.js');

rotas.post('/create', UserController.create);
rotas.get('/index', UserController.index);


rotas.post('/create/slang', SlangController.create);
rotas.get('/index/slang', SlangController.index);
rotas.get('/index/slangUser', SlangController.indexSlangsUser);
rotas.put('/update/slang/:id', SlangController.update);

module.exports = rotas;