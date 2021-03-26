const router = require('express').Router();
const Contact = require('./contact');

router.get('/info', async (req, res) => {
  let { contacts, error } = await Contact.getAll();
  if (error) return res.status(500).send(error);
  const len = contacts.length;
  const date = new Date().toString();
  res.set('Content-Type', 'text/html; charset=utf-8');
  res.end(`<p>Phonebook has info for ${len} people</p><br><p>${date}`);
});

module.exports = router;
