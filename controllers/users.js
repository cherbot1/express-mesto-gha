const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then(users => res.send({ data: users }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST).send({ message: `Некорректный запрос: ${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` });
    });
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) =>{
      if (!user) {
        res.status(NOT_FOUND).send({ message: `Пользователь не найден` });
        return;
      } else {
        res.send({data:user});
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` }));
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, { name, about })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST).send({ message: `Некорректный запрос: ${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, { avatar })
    .then(() => res.send({ avatar }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST).send({ message: `Некорректный запрос: ${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` });
    });
};