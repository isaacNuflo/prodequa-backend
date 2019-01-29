const express = require('express');

const app = express();

app.use(require('./persona'));
app.use(require('./empresa'));

module.exports = app;