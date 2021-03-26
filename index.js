require('dotenv').config();
const PORT = process.env.PORT;
const app = require('./app');
const db = require('./db');

const initializeServer = async () => {
  await db.connect();
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

initializeServer();
