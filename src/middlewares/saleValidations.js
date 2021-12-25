const Joi = require('joi');
const httpStatus = require('../utils/httpStatus');

const saleSchema = Joi.object({ 
  totalPrice: Joi.number().required(), 
  deliveryAddress: Joi.string().required(),
  deliveryNumber: Joi.number().required(),
  userId: Joi.number().required(),
  sellerId: Joi.number().required(),
  products: Joi.array().required(),
});

const saleValidations = async (req, res, next) => { 
  const { totalPrice, deliveryAddress, deliveryNumber, userId, sellerId, products } = req.body;
  const sale = { totalPrice, deliveryAddress, deliveryNumber, userId, sellerId, products };
  const { error } = saleSchema.validate(sale);
  if (error) {
    const { message } = error;
    return res.status(httpStatus.badRequest).json({ error: { message } });
  }
  req.sale = sale;
  return next();
};

module.exports = { saleValidations };
