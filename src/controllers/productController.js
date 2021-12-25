const { Product } = require('../database/models');
const httpStatus = require('../utils/httpStatus');

const findAllProducts = async (_req, res) => {
  const products = await Product.findAll();
  return res.status(httpStatus.ok).json({ products });
};

const findSpecificProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, urlImage: image } = await Product.findByPk(id);
  return res.status(httpStatus.ok).json({ name, price, image });
};

module.exports = {
  findAllProducts,
  findSpecificProduct,
};
