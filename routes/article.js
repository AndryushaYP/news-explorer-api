const router = require('express').Router();

const auth = require('../middlewares/auth.js');

const { getUserArticles, createArticle, deleteArticle } = require('../controllers/article');

const { validateCreateArticle, validateParams } = require('../middlewares/validateRequest.js');

router.get('/articles', validateParams, auth, getUserArticles);
router.post('/articles', validateCreateArticle, auth, createArticle);
router.delete('/articles/:id', validateParams, auth, deleteArticle);

module.exports = router;
