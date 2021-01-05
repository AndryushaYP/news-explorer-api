const bcrypt = require('bcryptjs');

/* const jwt = require('jsonwebtoken'); */

const User = require('../models/user');

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
