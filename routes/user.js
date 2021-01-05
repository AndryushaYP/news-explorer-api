const router = require('express').Router();

const auth = require('../middlewares/auth.js');

const { createUser, login, getUserMe } = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);
router.get('/users/me', auth, getUserMe);

module.exports = router;
