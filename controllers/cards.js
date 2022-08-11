const Card = require('../models/card');
const NotFoundError = require('../utils/errors/NotFoundErr');
const BadRequestError = require('../utils/errors/BadRequestErr');
const ForbiddenError = require('../utils/errors/ForbiddenErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  /* const owner = req.user._id; ?? */
  const { name, link, owner = req.user._id } = req.body;

  Card.create({ name, link, owner })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректный запрос'));
        return;
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('Карточки не существует');
    })
    .then((card) => {
      if (req.user._id !== card.owner._id.valueOf()) {
        return next(new ForbiddenError('Карточка создана другим пользователем, удалить невозможно'));
      }
      return Card.remove();
    })
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос'));
        return;
      }
      next(err);
    });
};

module.exports.addLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Карточки не существует'));
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный запрос'));
      }
      next(err);
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточки не существует');
      }
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректный запрос');
      }
      next(err);
    });
};
