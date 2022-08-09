const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { NotFoundError } = require('./utils/errors/NotFoundErr');
const auth = require('./middlewares/auth');
const {
  createUser,
  login,
} = require('./controllers/users');
const {
  NOT_FOUND,
} = require('./utils/errorCodes');


const { PORT = 3000 } = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/cards', auth, require('./routes/cards'));
app.use('/users', auth, require('./routes/users'));
app.post('/signin', login);
app.post('/signup', createUser);

app.use('/^', (req, res) => {
  throw new NotFoundError('Страницы не существует');
});

app.listen(PORT);