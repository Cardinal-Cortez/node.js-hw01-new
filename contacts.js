const fs = require("node:fs/promises");
const path = require("path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname,"db/contacts.json");

async function read() {
    const data = await fs.readFile(contactsPath, "utf-8");

    return JSON.parse(data)
}

function write(data) {
    return fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
}

function listContacts() {
  const data = read();

  return data;
}

async function getContactById(contactId) {
  const data = await read();

  const getContact = data.find(contact => contact.id === contactId);

  if (!getContact) return null;

  return getContact;
}

async function removeContact(contactId) {
  const data = await read();

  const removedContact = data.find(contact => contact.id === contactId);
  
  if (!removedContact) return null;

  const updatedContacts = data.filter(contact => contact.id !== contactId);

  await write(updatedContacts);

  return removedContact;
}


async function addContact(name, email, phone) {
  const data = await read();

  const newContact = { name, email, phone, id: crypto.randomUUID() };
  
  data.push(newContact);

  write(data);

  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};