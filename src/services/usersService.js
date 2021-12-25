const { User } = require('../database/models');

const listUsers = async (role) => (
  role ? User.findAll({ where: { role } }) : User.findAll()
);

module.exports = {
  listUsers,
};
