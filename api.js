const router = require("express").Router();
const db = require('./helpers');
let { persons } = db.load();

const genId = () => Math.round(Math.random() * 100_000);

router.get("/persons", (req, res) => {
  res.json(persons);
});

router.post("/persons", (req, res) => {
  const { name, number} = req.body;
  if (!name || !number) return res.status(400).json({error: `${!name ? 'name' : 'number'} is missing`});
  if (persons.find(p => p.name === name)) return res.status(409).json({error: 'name must be unique'});
  const id = genId();
  const newPerson = {name, number, id};
  persons = [...persons, newPerson];
  db.save(persons);
  res.status(201).json(newPerson);
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
    db.save(persons);
    res.status(204).end();
});

module.exports = router;
