const { celebrate, Joi } = require('celebrate');

const { patterns } = require('../config');

const preValidateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Поле "email" должно быть строкой',
        'string.empty': 'Поле "email" не должно быть пустым',
        'string.email': 'Поле "email" должно быть валидным адресом',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.base': 'Поле "password" должно быть строкой',
        'string.empty': 'Поле "password" не должно быть пустым',
        'string.min': 'Минимальная длина поля "password": 6 символов',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': 'Поле "name" должно быть строкой',
        'string.empty': 'Поле "name" не должно быть пустым',
        'string.min': 'Минимальная длина поля "name": 2 символа',
        'string.max': 'Минимальная длина поля "name": 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const preValidateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Поле "email" должно быть строкой',
        'string.empty': 'Поле "email" не должно быть пустым',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().min(6).required()
      .messages({
        'string.base': 'Поле "password" должно быть строкой',
        'string.empty': 'Поле "password" не должно быть пустым',
        'string.min': 'Минимальная длина поля "password": 6 символов',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const preValidateUpdate = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required()
      .messages({
        'string.base': 'Поле "email" должно быть строкой',
        'string.empty': 'Поле "email" не должно быть пустым',
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30).required()
      .messages({
        'string.base': 'Поле "name" должно быть строкой',
        'string.empty': 'Поле "name" не должно быть пустым',
        'string.min': 'Минимальная длина поля "name": 2 символа',
        'string.max': 'Минимальная длина поля "name": 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const preValidateAddMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.base': 'Поле "country" должно быть строкой',
        'string.empty': 'Поле "country" не должно быть пустым',
        'any.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.base': 'Поле "director" должно быть строкой',
        'string.empty': 'Поле "director" не должно быть пустым',
        'any.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.base': 'Поле "duration" должно быть числом',
        'any.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.base': 'Поле "year" должно быть строкой',
        'string.empty': 'Поле "year" не должно быть пустым',
        'any.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.base': 'Поле "description" должно быть строкой',
        'string.empty': 'Поле "description" не должно быть пустым',
        'any.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string()
      .pattern(patterns.url, 'URL')
      .required()
      .messages({
        'string.base': 'Поле "image" должно быть строкой',
        'string.empty': 'Поле "image" не должно быть пустым',
        'string.pattern.name': 'Поле "image" должно быть валидной ссылкой',
        'any.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string()
      .pattern(patterns.url, 'URL')
      .required()
      .messages({
        'string.base': 'Поле "trailer" должно быть строкой',
        'string.empty': 'Поле "trailer" не должно быть пустым',
        'string.pattern.name': 'Поле "trailer" должно быть валидной ссылкой',
        'any.required': 'Поле "trailer" должно быть заполнено',
      }),
    thumbnail: Joi.string()
      .pattern(patterns.url, 'URL')
      .required()
      .messages({
        'string.base': 'Поле "thumbnail" должно быть строкой',
        'string.empty': 'Поле "thumbnail" не должно быть пустым',
        'string.pattern.name': 'Поле "thumbnail" должно быть валидной ссылкой',
        'any.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.base': 'Поле "movieId" должно быть числом',
        'any.required': 'Поле "movieId" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.base': 'Поле "nameRU" должно быть строкой',
        'string.empty': 'Поле "nameRU" не должно быть пустым',
        'any.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.base': 'Поле "nameEN" должно быть строкой',
        'string.empty': 'Поле "nameEN" не должно быть пустым',
        'any.required': 'Поле "nameEN" должно быть заполнено',
      }),
  }),
});

const preValidateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().hex().length(24).required()
      .messages({
        'string.base': 'Поле "_id" должно быть строкой',
        'string.empty': 'Поле "_id" не должно быть пустым',
        'string.hex': 'Поле "_id" должно быть шестнадцатеричным числом',
        'string.length': 'Поле "_id" должно иметь длину в 24 символа',
        'any.required': 'Поле "_id" должно быть заполнено',
      }),
  }),
});


module.exports = {
  preValidateSignUp,
  preValidateSignIn,
  preValidateUpdate,
  preValidateAddMovie,
  preValidateDeleteMovie,
};
