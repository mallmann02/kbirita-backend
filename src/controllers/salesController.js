const httpStatus = require('../utils/httpStatus');
const { createSale } = require('../services/salesService');
const { Sale } = require('../database/models');

const registerSale = async (req, res) => {
  const { sale } = req;
  const { error, saleId } = await createSale(sale);
  if (error !== undefined) {
    return res.status(httpStatus.serverError).json({ error: { message: error } });
  }
  return res.status(httpStatus.created).json({ saleId });
};

const getAllSales = async (req, res) => {
  const customerRequest = (userId) => Sale
    .findAll({ where: { userId } })
    .catch((e) => ({ error: { message: e.message } }));

  const normalRequest = () => Sale.findAll()
    .catch((e) => ({ error: { message: e.message } }));
  
  const { id, role } = req.user;
  const sales = role === 'customer'
    ? await customerRequest(id)
    : await normalRequest();
  if (sales.error !== undefined) {
    return res.status(httpStatus.serverError).json({ error: sales });
  }
  return res.status(httpStatus.ok).json({ sales });
};

const getSpecificSale = async (req, res) => {
  const { id } = req.params;

  const sale = await Sale.findOne(
    { where: { id }, include: { all: true } },
  );
  return res.status(200).json(sale);
};

module.exports = {
  registerSale,
  getSpecificSale,
  getAllSales,
};
