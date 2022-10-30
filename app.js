const express = require('express');
const mestodb = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const errorHandler = require('./utils/errorHandler');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
mestodb.connect(MONGO_URL);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
