const express = require('express');
const rotas = express.Router();
const UserController = require('./controllers/userController.js');
const SlangController = require('./controllers/slangController.js');
const SessionController = require('./controllers/sessionController.js');

rotas.post('/user', UserController.create);
rotas.get('/user', UserController.index);
rotas.put('/user', UserController.update);

rotas.put('/user', UserController.update);


rotas.post('/slang', SlangController.create);
rotas.post('/slang/:id/like', SlangController.like);
rotas.get('/slang', SlangController.index);
rotas.get('/slang/slangUser', SlangController.indexSlangsUser);
rotas.put('/slang/:id/updateSlang', SlangController.update);
rotas.post('/slang/filter', SlangController.filter);
rotas.get('/slang/likes', SlangController.indexLikes);
rotas.get('/slang/filterState', SlangController.filterState);

rotas.post('/sessions', SessionController.login);

module.exports = rotas;