const fs = require('fs').promises;
const { join } = require('path');
const crypto = require('crypto');

const readTalkerFile = async () => {
  const path = './talker.json';
  try {
    const contentFile = await fs.readFile(join(__dirname, path), 'utf-8');
    return JSON.parse(contentFile); 
  } catch (error) {
    return null;
  }
};

const getAllPeople = async () => {
  const allPeople = await readTalkerFile();
  return allPeople;
};

const getPersonById = async (id) => {
  const allPeople = await readTalkerFile();
  return allPeople.filter((person) => person.id === id)[0];
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

const addPerson = async (req) => {
  const { name, age, talk } = req.body;
  const pessoas = await getAllPeople();
  const newPerson = { 
    id: pessoas[pessoas.length - 1].id + 1,
    name,
    age,
    talk,
  };
  const allPeople = JSON.stringify([...pessoas, newPerson], null, 2);
  const path = './talker.json';
  await fs.writeFile(join(__dirname, path), allPeople);
  return (newPerson);
};

const editPerson = async (res, req) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const pessoas = await getAllPeople();
  const index = pessoas.findIndex((element) => element.id === Number(id));
  if (index === -1) {
    return null;
  }
  pessoas[index] = { id: Number(id), name, age, talk };
  const updatedPeople = JSON.stringify([...pessoas], null, 2);
  const path = './talker.json';
  await fs.writeFile(join(__dirname, path), updatedPeople);
  return (pessoas[index]);
};

module.exports = {
  getAllPeople,
  getPersonById,
  generateToken,
  addPerson,
  editPerson,
};
