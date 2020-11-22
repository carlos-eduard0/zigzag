const express = require('express');
const rotas = require('./routes.js');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use(rotas);
app.listen('8080');