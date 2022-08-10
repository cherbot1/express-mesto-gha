const { INTERNAL_SERVER_ERROR } = require('../utils/errorCodes');

module.exports = (err, req, res, next) => {
  res
    .status(INTERNAL_SERVER_ERROR)
    .send({message: 'Ошибка сервера'});
  next();
};