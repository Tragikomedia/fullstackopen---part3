const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use('/api', require('./router'));

module.exports = app;