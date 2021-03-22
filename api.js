const router = require('express').Router();
const {persons} = require('./db');

router.get('/persons', (req, res) => {
    res.json(persons);
})

module.exports = router;