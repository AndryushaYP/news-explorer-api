const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const isEmail = require('validator/lib/isEmail');

const userShema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userShema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const error = new Error('Неправильные почта или пароль');
        error.statusCode = 404;
        throw error;
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            const error = new Error('Неправильные почта или пароль');
            error.statusCode = 401;
            throw error;
          }
          return user;
        });
    });
};

const userModel = mongoose.model('user', userShema);

module.exports = userModel;
