module.exports = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk.rate && talk.rate !== 0) {
    return res.status(400).json(
      { message: 'O campo "rate" é obrigatório' },
    );
  }

  next();
};