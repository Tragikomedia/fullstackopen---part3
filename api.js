const router = require("express").Router();
const Contact = require("./contact");

const isUnique = async (name) => !(await Contact.findOne({ name }));

router.get("/persons", async (req, res) => {
  const { contacts, error } = await Contact.getAll();
  if (error) return res.status(500).json({ error });
  res.json({ persons: contacts });
});

router.post("/persons", async (req, res) => {
  const { reqError, contact } = Contact.fromReq(req);
  if (reqError) return res.status(400).json({ error: reqError });
  if (!(await isUnique(contact.name)))
    return res.status(409).json({ error: "name must be unique" });
  try {
    await contact.save();
    res.status(201).json(contact);
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/persons/:id", async (req, res) => {
  const id = req.params.id;
  const person = await Contact.findById(id);
  if (!person) res.status(404).end("404 Not Found");
  res.json(person);
});

router.delete("/persons/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Contact.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
