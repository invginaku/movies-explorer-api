require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3000,
  DATA_BASE = 'mongodb://localhost:27017/moviesdb',
  JWT_SECRET,
} = process.env;

const messages = {
  info: {
    signInSuccess: 'Авторизация прошла успешно!',
    signOutSucces: 'Пользователь деавторизован',
    noMovies: 'Нет сохранённых фильмов',
    movieDeleted: 'Фильм успешно удалён!',
  },
  error: {
    incorrectValues: 'Введены некорректные данные',
    userNotFound: 'Нет пользователя с таким ID',
    noCredentials: 'Не введены почта или пароль',
    noPassword: 'Не введён пароль',
    incorrectCredentials: 'Неправильные почта или пароль',
    existingEmail: 'Уже есть пользователь с такой почтой',
    movieNotFound: 'Нет фильма с таким ID',
    deletingMovieForbidden: 'У вас нет прав на удаление этого фильма',
  },
};

const patterns = {
  url: /^(https?:\/\/)(www\.)?([\da-z-.]+)\.([a-z.]{2,6})[\da-zA-Z-._~:?#[\]@!$&'()*+,;=/]*\/?#?$/,
};


module.exports = {
  NODE_ENV,
  PORT,
  DATA_BASE,
  JWT_SECRET,
  messages,
  patterns,
};
