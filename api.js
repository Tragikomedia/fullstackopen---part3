const router = require("express").Router();
const Contact = require("./contact");

router.get("/", async (req, res, next) => {
  const { contacts, error } = await Contact.getAll();
  if (error) return next(error);
  res.json({ persons: contacts });
});

router.post("/", async (req, res, next) => {
  try {
    const { reqError, contact } = Contact.fromReq(req);
    if (reqError) return next(reqError);
    await contact.save();
    res.status(201).json(contact.toJSON());
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
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

router.put("/:id", async (req, res, next) => {
  const { number } = req.body;
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { number },
      { new: true, runValidators: true }
    );
    if (!updatedContact) return res.status(404).end();
    return res.status(200).json(updatedContact.toJSON());
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    await Contact.findByIdAndRemove(id);
    res.status(204).end();
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
