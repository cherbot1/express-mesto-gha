const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getUserId,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .length(24),
  }),
}), getUserId);

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(3)
      .max(30),
    about: Joi.string()
      .min(3)
      .max(30),
  }).unknown(true),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .pattern(/^http(?:s)?\:\/\/(?:w{3}\.)?[0-9a-z-]*\.[a-z]{2}(?:[a-z-._~:\/?#\[\]@!$&'()*+,;=]*)?/),
  }),
}), updateUserAvatar);

module.exports = router;