const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = require('../config');

const AuthenticationError = require('../errors/AuthenticationError');

function auth(req, res, next) {
  try {
    const payload = jwt.verify(
      req.cookies.jwt,
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
    );
    req.user = payload;
    next();
  } catch (err) {
    next(new AuthenticationError('Неправильный токен авторизации'));
  }
}

module.exports = auth;
