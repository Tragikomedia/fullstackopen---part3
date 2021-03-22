const router = require("express").Router();
const fs = require('fs');
let { persons } = JSON.parse(fs.readFileSync('./db.json'));

router.get("/persons", (req, res) => {
  res.json(persons);
});

router.get("/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) res.status(404).end("404 Not Found");
  res.json(person);
});

router.delete("/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(p => p.id !== id);
    fs.writeFileSync('./db.json', JSON.stringify({persons}));
    res.status(204);
});

module.exports = router;
