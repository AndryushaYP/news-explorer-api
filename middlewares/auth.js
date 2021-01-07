const jwt = require('jsonwebtoken');

const { SECRET } = require('../config.js');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const unauthorizedError = new Error('Неверный логин или пароль');
    unauthorizedError.statusCode = 401;
    next(unauthorizedError);
    return;
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    const notValidToken = new Error('Токен не валиден');
    notValidToken.statusCode = 401;
    next(notValidToken);
  }

  req.user = payload;

  next();
};
