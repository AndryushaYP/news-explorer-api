const router = require('express').Router();

const usersRouter = require('./user.js');
const articleRouter = require('./article.js');

router.use(usersRouter, articleRouter);

router.use('*', () => {
  const error = new Error('Запрашиваемый ресурс не найден');
  error.statusCode = 404;
  throw error;
});

module.exports = router;
