const express = require("express");
const morgan = require("morgan");
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cors());

morgan.token("body", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/", require("./info"));
app.use("/api", require("./api"));

app.use((req, res) => {
  res.status(404).end("404 Not Found");
});
module.exports = app;
