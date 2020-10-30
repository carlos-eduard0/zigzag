const express = require('express');
const rotas = require('./routes.js');
const app = express();

app.use(express.json());

app.use(rotas);
app.listen('8080');