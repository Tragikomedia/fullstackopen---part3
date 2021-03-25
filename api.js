const router = require("express").Router();
const Contact = require("./contact");

router.get("/persons", async (req, res, next) => {
  const { contacts, error } = await Contact.getAll();
  if (error) return next(error);
  res.json({ persons: contacts });
});

router.post("/persons", async (req, res, next) => {
  const { error, existingContact } = await Contact.findExisting(req.body?.name);
  if (error) return next(error);
  if (existingContact)
    return res.status(409).json({ error: "name must be unique" });
  const { reqError, contact } = Contact.fromReq(req);
  if (reqError) return res.status(400).json({ error: reqError });
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

router.put("/persons/:id", async (req, res, next) => {
  const { error, existingContact } = await Contact.findExisting(req.body?.name);
  if (error) return next(error);
  if (existingContact) {
    try {
      await existingContact.update({ number: req.body?.number });
      await existingContact.save();
      return res
        .status(200)
        .json({
          number: req.body?.number,
          name: existingContact.name,
          id: existingContact.id,
        });
    } catch (error) {
      next(error);
    }
  }
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
