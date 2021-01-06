require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes/index.js');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3077;
const app = express();

mongoose.connect('mongodb://localhost:27017/diplomdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.use(bodyParser.json());

app.use(cors());

app.use(requestLogger);

app.use(routes);

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? err.message
      : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});
