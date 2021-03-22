const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use('/', require('./info'));
app.use('/api', require('./api'));

module.exports = app;