const mongoose = require('mongoose');

const { patterns } = require('../config');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    validate: {
      validator: (v) => patterns.url.test(v),
    },
    required: true,
  },

  trailer: {
    type: String,
    validate: {
      validator: (v) => patterns.url.test(v),
    },
    required: true,
  },

  thumbnail: {
    type: String,
    validate: {
      validator: (v) => patterns.url.test(v),
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
