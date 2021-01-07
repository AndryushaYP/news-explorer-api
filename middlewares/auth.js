const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, JWT_SECRET_DEV } = process.env;

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
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEV);
  } catch (err) {
    const notValidToken = new Error('Токен не валиден');
    notValidToken.statusCode = 401;
    next(notValidToken);
  }

  req.user = payload;

  next();
};
