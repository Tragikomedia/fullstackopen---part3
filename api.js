const router = require("express").Router();
const { persons } = require("./db");

router.get("/persons", (req, res) => {
  res.json(persons);
});

router.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) res.status(404).end("404 Not Found");
  res.json(person);
});

module.exports = router;
