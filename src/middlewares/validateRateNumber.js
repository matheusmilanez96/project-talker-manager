module.exports = (req, res, next) => {
    const { talk } = req.body;
    
    if (!Number.isInteger(talk.rate) || Number(talk.rate) > 5 || Number(talk.rate) < 1) {
      return res.status(400).json(
        { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
      );
    }
  
    next();
  };