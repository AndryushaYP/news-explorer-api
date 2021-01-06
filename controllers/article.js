const Article = require('../models/article');

// Возвращает все сохранённые пользователем статьи

module.exports.getUserArticles = (req, res) => {
  Article.find({ owner: req.user._id })
    .then((article) => {
      res.status(200).send(article);
    })
    .catch((err) => {
      res.status(404).send({ maessage: err.maessage });
    });
};

// Добавить статью

module.exports.createArticle = (req, res) => {
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
      res.status(200).send(article);
    })
    .catch((err) => {
      res.status(404).send({ maessage: err.maessage });
    });
};

// Удалить статью

module.exports.deleteArticle = (req, res, next) => {
  Article.findById(req.params.id)
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
    .then((card) => res.status(200).send(card))
    .catch(next);
};
