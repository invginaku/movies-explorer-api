const Movie = require('../models/movie');
const mongoose = require('mongoose');

const IncorrectValueError = require('../errors/IncorrectValueError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const { messages } = require('../config');

function getMovies(req, res, next) { // Получить сохранённые фильмы
  Movie.find({
    owner: mongoose.Types.ObjectId(req.user._id)
  })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
}

function addMovie(req, res, next) { // Добавить фильм
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectValueError('Введены некорректные данные'));
      }

      next(err);
    });
}

function deleteMovie(req, res, next) { // Удалить фильм
  Movie.deleteOne({
    movieId: req.params._id,
    owner: mongoose.Types.ObjectId(req.user._id)
  })
    .orFail(new NotFoundError(messages.error.movieNotFound))
    .then(() => {
      res.send({ message: messages.info.movieDeleted })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(messages.error.movieNotFound));
      }
      next(err);
    });
}

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
