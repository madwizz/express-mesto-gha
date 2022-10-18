const userRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/user');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:id', getUser);
userRoutes.post('/users', createUser);
userRoutes.patch('/users/me', updateUserInfo);
userRoutes.patch('/users/me/avatar', updateUserAvatar);

module.exports = userRoutes;
