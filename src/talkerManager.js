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
  const allPeople = JSON.stringify([...pessoas, newPerson]);
  const path = './talker.json';
  await fs.writeFile(join(__dirname, path), allPeople);
  return (newPerson);
};

module.exports = {
  getAllPeople,
  getPersonById,
  generateToken,
  addPerson,
};
