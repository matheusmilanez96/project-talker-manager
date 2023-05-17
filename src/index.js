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
