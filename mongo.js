require('dotenv').config();
const Contact = require('./contact');
const db = require('./db');

const determineMode = (argv) => {
  const len = argv.length;
  switch (len) {
  case 3: {
    return { mode: 'get' };
  }
  case 5: {
    return { mode: 'post' };
  }
  default: {
    return {
      error:
          'Invalid use. Please state your password and optionally contacts data to be saved.',
    };
  }
  }
};

const invalidPassword = (password) => password !== process.env.CLI_PASSWORD;

const saveContact = async (argv) => {
  const { err, contact } = Contact.fromArgv(argv);
  if (err) return console.error(err);
  try {
    await contact.save();
    console.log(`Added ${contact.name} number ${contact.number} to phonebook`);
  } catch {
    console.error('Error! Could not save contact to the database.');
  }
};

const printContacts = async () => {
  let contacts;
  try {
    contacts = await Contact.find({});
  } catch {
    return console.error('Error! Could not connect to the database');
  }
  if (!contacts.length) return console.log('Phonebook is empty');
  console.log('PHONEBOOK');
  contacts.forEach(({ name, number }) => {
    console.log(`${name} ${number}`);
  });
};

const handleRequest = async () => {
  const { error, mode } = determineMode(process.argv);
  if (error) return console.error(error);
  if (invalidPassword(process.argv[2]))
    return console.error('Invalid password');
  if (mode === 'post') {
    await saveContact(process.argv);
  } else {
    await printContacts();
  }
};

const main = async () => {
  await db.connect(false);
  await handleRequest();
  db.disconnect();
};

main();
