const { Command } = require('commander');
const Contacts = require("./contacts.js");

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
      case 'list':
          const listContacts = await Contacts.listContacts();
          console.table(listContacts);
          break;
      case 'get':
          const getContact = await Contacts.getContactById(id);
          console.log(getContact);
          break;
      case 'add':
          const addContact = await Contacts.addContact(name, email, phone);
          console.log(addContact);
          break;
      case 'remove':
          const removeContact = await Contacts.removeContact(id);
          console.log(removeContact);
          break;
    default:
      console.warn('\x1B[31m Unknown action type!');
    };
}

invokeAction(argv);