const Joi = require('joi');
const errorMessages = require('../utils/errorMessages');
const httpStatus = require('../utils/httpStatus');
const { User } = require('../database/models');

const emailNotExists = async (email) => {
  const searchResult = await User.findOne({ where: { email } });
  if (searchResult !== null) {
    return { isExist: true };
  }
  return { isExist: false };
};

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(12).required(),
  role: Joi.string().required(),
});

const validateNewUserData = async (req, res, next) => {
  const { email, password, name, role } = req.body;

  const { error } = registerSchema.validate({ email, password, name, role });
  if (error) {
    const { message } = error;
    return res.status(httpStatus.badRequest).json({ error: { message } });
  }
  const { isExist } = await emailNotExists(email);
  if (isExist) {
    return res.status(httpStatus.conflict).json({
      error: { message: errorMessages.userExists },
    });
  }
  return next();
};
module.exports = {
  validateNewUserData,
};
