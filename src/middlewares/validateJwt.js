const jwt = require('jsonwebtoken');
const httpStatus = require('../utils/httpStatus');
const errorMessage = require('../utils/errorMessages');

const secret = process.env.JWT_SECRET || 'secret_key';

const verify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

const validateJWT = async (req, res, next) => {
  if (req.baseUrl === '/register') return next();
  try {
    const token = req.headers.authorization;

    if (!token) { 
      return res.status(httpStatus.unauthorized).json({ error: { message: errorMessage.noToken } });
    }

    const payload = verify(token);
    req.payload = payload;
    req.user = payload;

    return next();
  } catch (_e) {
    res.status(httpStatus.unauthorized).json({ error: { message: errorMessage.invalidToken } });
  }
};

module.exports = {
  validateJWT,
  verify,
};
