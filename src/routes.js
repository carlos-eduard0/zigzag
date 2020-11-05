const express = require('express');
const rotas = express.Router();
const UserController = require('./controllers/userController.js');
const SlangController = require('./controllers/slangController.js');

rotas.post('/user', UserController.create);
rotas.get('/user', UserController.index);
rotas.put('/user', UserController.update);


rotas.post('/slang', SlangController.create);
rotas.post('/slang/:id/like', SlangController.like);
rotas.get('/slang', SlangController.index);
rotas.get('/slang/slangUser', SlangController.indexSlangsUser);
rotas.put('/slang/:id/updateSlang', SlangController.update);
rotas.get('/slang/filter', SlangController.filter);
rotas.get('/slang/filterState', SlangController.filterState);


module.exports = rotas;