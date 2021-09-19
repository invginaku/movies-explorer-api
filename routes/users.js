const usersRouter = require('express').Router();

const {
  signOut,
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/users');

const { preValidateUpdate } = require('../middlewares/preValidate');

usersRouter.delete('/signout', signOut);
usersRouter.get('/me', getCurrentUser);
usersRouter.patch('/me', preValidateUpdate, updateCurrentUser);

module.exports = usersRouter;
