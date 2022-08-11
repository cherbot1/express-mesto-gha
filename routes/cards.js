const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  addLike,
  removeLike,
} = require('../controllers/cards');

router.get('/', getCards);
router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24),
  }),
}), deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(3)
      .max(30),
    link: Joi.string()
      .required()
      .pattern(/^http(?:s)?\:\/\/(?:w{3}\.)?[0-9a-z-]*\.[a-z]{2}(?:[a-z-._~:\/?#\[\]@!$&'()*+,;=]*)?/),
  }),
}), createCard);

router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24),
  }),
}), addLike);
router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .length(24),
  }),
}), removeLike);

module.exports = router;