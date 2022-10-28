const userRoutes = require('express').Router();

const {
  getUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
  getMyInfo,
} = require('../controllers/user');
const { validateUserId, validateUserInfo, validateUserAvatar } = require('../utils/validators/userValidator');

userRoutes.get('/', getUsers);
userRoutes.get('/:id', validateUserId, getUser);
userRoutes.get('/me', getMyInfo);
userRoutes.patch('/me', validateUserInfo, updateUserInfo);
userRoutes.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRoutes;
