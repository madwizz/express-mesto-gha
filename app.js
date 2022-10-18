const express = require('express');
const mestodb = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');

const { NOT_FOUND_ERROR_CODE } = require('./utils/errors');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());

mestodb.connect(MONGO_URL);

app.use((req, res, next) => {
  req.user = {
    _id: '634e96f61e27bc77a373ffbd',
  };
  next();
});

app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({
    message: 'Wrong address or request. Check URL or request method.',
  });
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
