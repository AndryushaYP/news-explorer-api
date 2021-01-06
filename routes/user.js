const router = require('express').Router();

const auth = require('../middlewares/auth.js');

const { createUser, login, getUserMe } = require('../controllers/users');

const { validateRegister, validateLogin, validateParams } = require('../middlewares/validateRequest.js');

router.post('/signup', validateRegister, createUser);
router.post('/signin', validateLogin, login);
router.get('/users/me', validateParams, auth, getUserMe);

module.exports = router;
