const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const NotFoundError = require('./utils/errors/NotFoundErr');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error')
const {
  createUser,
  login,
} = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .required(),
  }).unknown(true),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email(),
    name: Joi.string()
      .min(3)
      .max(30),
    about: Joi.string()
      .min(3)
      .max(30),
    password: Joi.string()
      .required(),
    avatar: Joi.string()
      .pattern(/https?:\/\/(www)?[0-9a-z\-._~:/?#[\]@!$&'()*+,;=]+#?$/i),
  }),
}), createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(errors());

app.use('/^', (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(error);

app.listen(PORT);