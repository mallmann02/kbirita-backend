const { createToken } = require('../middlewares/createJwt');
const httpStatus = require('../utils/httpStatus');

const loginUser = async (req, res) => {
  const { email, role, name, id } = req.user;
  const user = { email, role, name, id };

  const { token } = createToken(user);

  const response = { name, email, role, token, id };

  res.status(httpStatus.ok).json(response);
};

module.exports = {
  loginUser,
};
