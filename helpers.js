const fs = require('fs');

const save = (persons) => fs.writeFileSync('./db.json', JSON.stringify({persons}));
const load = () => JSON.parse(fs.readFileSync('./db.json'));

module.exports = { save, load };