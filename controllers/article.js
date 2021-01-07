const Article = require('../models/article');

const customError = require('../utils/error.js');

// Возвращает все сохранённые пользователем статьи

module.exports.getUserArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Добавить статью

module.exports.createArticle = (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => {
      res.status(200).send({
        id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      });
    })
    .catch((err) => {
      customError(err, res, next);
    });
};

// Удалить статью

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id).select('+owner')
    .then((article) => {
      if (!article) {
        const error = new Error('Такой статьи не существует!');
        error.statusCode = 404;
        throw error;
      } if (!article.owner.equals(req.user._id)) {
        const error = new Error('У вас нет таких прав');
        error.statusCode = 403;
        throw error;
      }
      return Article.findByIdAndRemove(req.params.id);
    })
    .then((article) => res.status(200).send(article))
    .catch(next);
};
