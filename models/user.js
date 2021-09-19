const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
    },
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
