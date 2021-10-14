const Movie = require('../models/movie');

const EmptyDatabaseError = require('../errors/EmptyDatabaseError');
const IncorrectValueError = require('../errors/IncorrectValueError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const { messages } = require('../config');

function getMovies(req, res, next) { // Получить сохранённые фильмы
  Movie.find({
    owner: req.user._id
  })
    .orFail(new EmptyDatabaseError(messages.info.noMovies))
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
  Movie.findById(req.params._id)
    .orFail(new NotFoundError(messages.error.movieNotFound))
    .then((movie) => {
      if (req.user._id === String(movie.owner)) {
        return Movie.findByIdAndDelete(req.params._id)
          .then(() => res.send({ message: messages.info.movieDeleted }));
      }

      throw new ForbiddenError(messages.error.deletingMovieForbidden);
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
