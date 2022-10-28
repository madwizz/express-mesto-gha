const userRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getMyInfo,
} = require('../controllers/user');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validators/userValidator');

userRoutes.get('/users', getUsers);
userRoutes.get('/users/:id', validateUserId, getUser);
userRoutes.get('/users/me', getMyInfo);
userRoutes.patch('/users/me', validateUserInfo, updateUserInfo);
userRoutes.patch('/users/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRoutes;
