const fs = require('fs').promises;
const { join } = require('path');

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

module.exports = {
  getAllPeople,
};
