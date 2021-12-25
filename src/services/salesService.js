const { Sale } = require('../database/models');
const { SaleProduct } = require('../database/models');

const createSaleElement = async (saleInfo) => {
  const { totalPrice, deliveryAddress, deliveryNumber, userId, sellerId } = saleInfo;
  const result = await Sale.create({
    totalPrice: parseFloat(totalPrice.toFixed(2)),
    deliveryAddress,
    deliveryNumber,
    userId,
    sellerId,
    status: 'Pendente',
  }).catch((error) => ({ error: { message: error.message } }));
  return result;
};

const registerProductsOnSale = async (saleId, products) => {
  const productsInfo = products.map(({ id, quantity }) => ({ productId: id, quantity }));

  productsInfo.forEach(async (product) => {
    try {
      await SaleProduct.create({ ...product, saleId });
    } catch (e) {
      return { error: { message: e.message } };
    }
  });
  return true;
};

const createSale = async (saleData) => {
  const { totalPrice, deliveryAddress, deliveryNumber, userId, sellerId, products } = saleData;
  const saleInfo = { totalPrice, deliveryAddress, deliveryNumber, userId, sellerId };
  const { dataValues, error } = await createSaleElement(saleInfo);
  if (error !== undefined) {
    return { error };
  }
  const saleId = dataValues.id;

  // const { error: errorProductsInception } = await registerProductsOnSale(saleId, products);
  // if (errorProductsInception !== undefined) {
  //   return { error: errorProductsInception };
  // }

  const saleProductResponse = await registerProductsOnSale(saleId, products);
  if (saleProductResponse.error) {
    return { error: saleProductResponse };
  }
  return { saleId: dataValues.id };
};

module.exports = {
  createSale,
};