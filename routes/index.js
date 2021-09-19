const router = require('express').Router();

const auth = require('../middlewares/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const {
  signUp,
  signIn,
} = require('../controllers/users');

const {
  preValidateSignUp,
  preValidateSignIn,
} = require('../middlewares/preValidate');

const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', preValidateSignUp, signUp);
router.post('/signin', preValidateSignIn, signIn);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);

router.use('*', () => {
  throw new NotFoundError('Страница не найдена');
});

module.exports = router;
