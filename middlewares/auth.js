const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/classErrors/UnauthorizedError');
const { SECRET_JWT } = require('../utils/constants');

module.exports = (req, res, next) => {
  let payload;
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return next(new UnauthorizedError('Authorization is required'));
    }
    payload = jwt.verify(token, SECRET_JWT);
  } catch (err) {
    return next(new UnauthorizedError('Authorization is required'));
  }
  req.user = payload;
  return next();
};
