const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, messages } = require('../config');

const NotFoundError = require('../errors/NotFoundError');
const ExistingEmailError = require('../errors/ExistingEmailError');
const IncorrectValueError = require('../errors/IncorrectValueError');
const AuthenticationError = require('../errors/AuthenticationError');

function signUp(req, res, next) { // Зарегистрировать пользователя
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email,
        password: hash,
        name,
      })
        .then((user) => res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new IncorrectValueError(messages.error.incorrectValues));
          } else if (err.code === 11000) {
            next(new ExistingEmailError(messages.error.existingEmail));
          }

          next(err);
        });
    })
    .catch((err) => {
      if (err.message.includes('Illegal arguments')) {
        next(new IncorrectValueError(messages.error.noPassword));
      }

      next(err);
    });
}

function signIn(req, res, next) { // Авторизовать пользователя
  const { email, password } = req.body;

  if (!email || !password) {
    throw new IncorrectValueError(messages.error.noCredentials);
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthenticationError(messages.error.incorrectCredentials);
      }

      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthenticationError(messages.error.incorrectCredentials);
          }

          const token = jwt.sign(
            { _id: user.id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );

          return res.cookie(
            'jwt',
            token,
            {
              maxAge: 3600000,
              httpOnly: true,
              sameSite: true,
            },
          ).send({ message: messages.info.signInSuccess });
        });
    })
    .catch((err) => {
      if (err.message.includes('Illegal arguments')) {
        next(new IncorrectValueError(messages.error.incorrectValues));
      }

      next(err);
    });
}

function signOut(req, res) {
  res.clearCookie('jwt').send({ message: messages.info.signOutSucces });
}


function getCurrentUser(req, res, next) { // Получить данные о себе
  User.findById(req.user._id)
    .orFail(new NotFoundError(messages.error.userNotFound))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(messages.error.userNotFound));
      }

      next(err);
    });
}

function updateCurrentUser(req, res, next) { // Обновить данные о себе
  const { name, email } = req.body;
  const id = req.user._id;

  if (!name || !email) {
    throw new IncorrectValueError(messages.error.noCredentials);
  }

  User.findByIdAndUpdate(id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: true,
    })
    .orFail(new NotFoundError(messages.error.userNotFound))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectValueError(messages.error.incorrectValues));
      } else if (err.code === 11000) {
        next(new ExistingEmailError(messages.error.existingEmail));
      }

      next(err);
    });
}

module.exports = {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updateCurrentUser,
};
