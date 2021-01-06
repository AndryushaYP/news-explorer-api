const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');

const customError = require('../utils/error.js');

// Регистрация

module.exports.createUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email })
    .then((data) => {
      if (data) {
        const error = new Error('Пользователь с таким email уже существует');
        error.statusCode = 409;
        throw error;
      }
      bcrypt.hash(req.body.password, 10)
        .then((hash) => User.create({
          email: req.body.email,
          password: hash,
          name: req.body.name,
        }))
        .then((user) => res.status(200).send(user))
        .catch((err) => {
          next(err);
        });
    }).catch((err) => {
      next(err);
    });
};

// Авторизация

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.status(200).send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

// Инфо текущего пользователя

module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send({ email: user.email, name: user.name });
    })
    .catch((err) => {
      customError(err, res, next);
    });
};
