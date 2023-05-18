const express = require('express');
const talkerManager = require('./talkerManager');
const auth = require('./middlewares/auth');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRateLength = require('./middlewares/validateRateLength');
const validateRateNumber = require('./middlewares/validateRateNumber');

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

app.post('/talker',
  auth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRateLength,
  validateRateNumber,
  async (req, res) => {
    const newPerson = await talkerManager.addPerson(req);
    return res.status(201).json(newPerson);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const person = await talkerManager.getPersonById(Number(id));
  if (!person) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(person);
});

app.put('/talker/:id',
  auth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRateLength,
  validateRateNumber,
  async (req, res) => {
    const newPerson = await talkerManager.editPerson(res, req);
    if (!newPerson) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    return res.status(200).json(newPerson);
});

app.delete('/talker/:id', auth, async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
    return res.status(401).json({ message: 'Token inválido' });
  }
  const pessoaDeletada = await talkerManager.deletePerson(id);
  if (!pessoaDeletada) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  return res.status(204).json();
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