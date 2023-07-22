const express = require('express');
const logeer = require('morgan'); //para saber que es lo que esta pasando en la consola
const cors = require('cors');
const app = express();

app.use(logeer('dev'));
app.use(express.json()); //es para enviar objetos
app.use(cors());

const {connect} = require('./db/db');

const indexRouter = require('./routers/index');
const apiRouter = require('./routers/api');

app.use('/', indexRouter);
app.use('/v1', apiRouter);

connect(); //cuando ejecute el servidor se ejecuta todas las lineas de arriba

module.exports = app; 