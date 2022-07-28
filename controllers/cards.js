const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then(cards => res.send({ data: cards }))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` }));
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res
          .status(BAD_REQUEST).send({ message: `Некорректный запрос: ${err.message}` });
      }
      return res
        .status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) =>{
      if (!card) {
        res.send('Карточки не существует');
        return;
      } else {
        res.send({data:card});
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` }));
};

module.exports.addLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточки не существует' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` }));
};

module.exports.removeLike = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true })
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточки не существует' });
      } else {
        res.send({ data: card });
      }
    })
    .catch((err) => res.status(INTERNAL_SERVER_ERROR).send({ message: `Ошибка сервера: ${err.message}` }));
};
