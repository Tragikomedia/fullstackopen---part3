const router = require("express").Router();

const { persons } = require("./db");

router.get("/info", (req, res) => {
  const len = persons.length;
  const date = new Date().toString();
  res.set("Content-Type", "text/html; charset=utf-8")
  res.end(`<p>Phonebook has info for ${len} people</p><br><p>${date}`);
});

module.exports = router;
