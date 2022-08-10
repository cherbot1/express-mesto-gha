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
router.delete('/:cardId', deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .required()
      .min(3)
      .max(30),
    link: Joi.string()
      .required()
      .regex(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/),
  }).unknown(true),
}), createCard);

router.put('/:cardId/likes', addLike);
router.delete('/:cardId/likes', removeLike);

module.exports = router;