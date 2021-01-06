const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    const unauthorizedError = new Error('Неверный логин или пароль');
    unauthorizedError.statusCode = 401;
    next(unauthorizedError);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    const notValidToken = new Error('Токен не валиден');
    notValidToken.statusCode = 401;
    next(notValidToken);
  }

  req.user = payload;

  next();
};
