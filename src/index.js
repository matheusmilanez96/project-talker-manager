const express = require('express');
const talkerManager = require('./talkerManager');

const app = express();
app.use(express.json());
// iniciando o projeto
const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const pessoas = await talkerManager.getAllPeople();
  res.status(200).json(pessoas);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const person = await talkerManager.getPersonById(Number(id));
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(person);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const minLength = 6;
  const token = talkerManager.generateToken();

  if ([email].includes(undefined)) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if ([password].includes(undefined)) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  if (password.length < minLength) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return res.status(200).json({ token });
});