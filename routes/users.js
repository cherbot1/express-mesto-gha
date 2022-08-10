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
router.get('/:userId',  celebrate({
  params: Joi.object().keys({
    id: Joi.string()
      .alphanum()
      .length(24),
  })
}), getUserId);

router.get('/me', getCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
    about: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
  }).unknown(true),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .regex(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
  }).unknown(true),
}), updateUserAvatar);

module.exports = router;