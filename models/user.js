const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const UnauthorizedError = require('../utils/classErrors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => validator.isURL(v, { protocols: ['http', 'https'], require_protocol: true }),
      message: ({ value }) => `${value} - URL address is not valid. Expected URL address format: http(s)://(www).site.com`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Email is incorrect',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// userSchema.statics.findUser = async (email, password) => {
//   let user;
//   try {
//     user = await this.findOne({ email }).select('+password');
//   } catch (err) {
//     return Promise.reject(new UnauthorizedError('Wrong email: this email does not exist'));
//   }
//   const match = await bcrypt.compare(password, user.password);
//   if (!match) {
//     return Promise.reject(new UnauthorizedError('Wrong password'));
//   }
//   return user;
// };

userSchema.statics.findUser = async function (email, password) {
  let user;

  try {
    user = await this.findOne({ email }).select('+password');
  } catch (err) {
    console.log(err);
    return Promise.reject(new UnauthorizedError('Wrong email: this email does not exist'));
  }

  try {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedError('Wrong password');
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(new UnauthorizedError('Wrong password'));
  }
  return user;
};

module.exports = mongoose.model('user', userSchema);
