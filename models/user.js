const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимум 2 символа, Вы ввели {VALUE}'],
    maxlength: [30, 'Максимум 30 символов, Вы ввели {VALUE}'],
  },
  about: {
    type: String,
    required: [true, 'Обязательное поле'],
    minlength: [2, 'Минимум 2 символа, Вы ввели {VALUE}'],
    maxlength: [30, 'Максимум 30 символов, Вы ввели {VALUE}'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);