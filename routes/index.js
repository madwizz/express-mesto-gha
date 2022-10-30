const router = require('express').Router();
const userRoutes = require('./userRoutes');
const cardRoutes = require('./cardRoutes');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/user');
const NotFoundError = require('../utils/classErrors/NotFoundError');
const { validateLogin, validateRegister } = require('../utils/validators/userValidator');

router.post('/signin', validateLogin, login);
router.post('/signup', validateRegister, createUser);
router.use(auth);
router.use('/users', userRoutes);
router.use('/cards', cardRoutes);
router.use('*', () => {
  throw new NotFoundError('URL is not found. Check URL and request method');
});
