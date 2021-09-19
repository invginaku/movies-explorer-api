const moviesRouter = require('express').Router();

const {
  getMovies,
  addMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  preValidateAddMovie,
  preValidateDeleteMovie,
} = require('../middlewares/preValidate');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', preValidateAddMovie, addMovie);
moviesRouter.delete('/:_id', preValidateDeleteMovie, deleteMovie);

module.exports = moviesRouter;
