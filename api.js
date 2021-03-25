const router = require("express").Router();
const Contact = require("./contact");

const isUnique = async (name) => !(await Contact.findOne({ name }));

router.get("/persons", async (req, res, next) => {
  const { contacts, error } = await Contact.getAll();
  if (error) return next(error);
  res.json({ persons: contacts });
});

router.post("/persons", async (req, res, next) => {
  const { reqError, contact } = Contact.fromReq(req);
  if (reqError) return res.status(400).json({ error: reqError });
  if (!(await isUnique(contact.name)))
    return res.status(409).json({ error: "name must be unique" });
  try {
    await contact.save();
    res.status(201).json(contact);
  } catch {
    return next({ error: "Internal server error" });
  }
});

router.get("/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  let person;
  try {
    person = await Contact.findById(id);
  } catch (error) {
    return next(error);
  }
  if (!person) res.status(404).end("404 Not Found");
  res.json(person);
});

router.delete("/persons/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Contact.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
