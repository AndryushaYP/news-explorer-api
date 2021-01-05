const router = require('express').Router();

const auth = require('../middlewares/auth.js');

const { getUserArticles, createArticle, deleteArticle } = require('../controllers/article');

router.get('/articles', auth, getUserArticles);
router.post('/articles', auth, createArticle);
router.delete('/articles/:id', auth, deleteArticle);

module.exports = router;
