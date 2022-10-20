const User = require('../models/user');

const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/errors');

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.send(user);
  } catch (err) {
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'Cannot get users',
    });
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(NOT_FOUND_ERROR_CODE).json({
        message: 'User is not found',
      });
    }
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'User is not found',
    });
  }
  return null;
};

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = await User.create({ name, about, avatar });
    res.send({
      message: 'User is successfully created',
    }, user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'User was not created',
    });
  }
};

module.exports.updateUserInfo = async (req, res) => {
  try {
    const { name, about } = req.body;
    const userInfoUpdate = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
    res.send(userInfoUpdate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'User Info was not updated',
    });
  }
};

module.exports.updateUserAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const avatarUpdate = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );
    res.send(avatarUpdate);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(INCORRECT_DATA_ERROR_CODE).json({
        message: 'Invalid data is received',
      });
      return;
    }
    res.status(DEFAULT_ERROR_CODE).json({
      message: 'User Avatar was not updated',
    });
  }
};
