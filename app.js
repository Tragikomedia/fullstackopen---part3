const express = require("express");
const morgan = require('morgan');
const app = express();

app.use(morgan('tiny'));

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use('/', require('./info'));
app.use('/api', require('./api'));

app.use((req, res) => {
    res.status(404).end("404 Not Found");
})
module.exports = app;