const mongoose = require('mongoose');

const url = process.env.DATABASE_URL;

const connect = async (shouldPrint = true) => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    if (shouldPrint) console.log('Connected to db');
  } catch (error) {
    console.log(`Could not connect to db: ${error}`);
  }
};

const disconnect = () => {
  mongoose.connection.close();
};

const db = { connect, disconnect };
module.exports = db;
