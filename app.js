const express = require('express');
const mestodb = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/user');

const NotFoundError = require('./utils/classErrors/NotFoundError');
const errorHandler = require('./utils/errorHandler');
const { validateLogin, validateRegister } = require('./utils/validators/userValidator');

const { PORT = 3000, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

app.use(bodyParser.json());
mestodb.connect(MONGO_URL);

app.post('/signin', validateLogin, login);
app.post('signup', validateRegister, createUser);

app.use(auth);
app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('*', () => {
  throw new NotFoundError('URL is not found. Check URL and request method');
});
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
