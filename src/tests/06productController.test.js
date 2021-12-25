const sinon = require('sinon');
const { expect } = require('chai');

const productController = require('../controllers/productController');

describe('06 - Ao chamar o controller de produtos', () => {
  describe('Quando o path informado é /products', () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

     it('Retorna status 200', async () => {
      await productController.findAllProducts(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna os 11 produtos cadastrados', async () => {
      await productController.findAllProducts(request, response);

      expect(response.json.firstCall.args[0].products.length).to.be.equals(11);
    });
  });

  describe('Quando o path informado é /products/:id', () => {
    const response = {};
    const request = {};

    before(() => {
      request.params = { 'id': 1 };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

     it('Retorna status 200', async () => {
      await productController.findSpecificProduct(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna os dados do produto', async () => {
      await productController.findSpecificProduct(request, response);

      expect(response.json.firstCall.args[0].name).to.be.equals('Skol Lata 250ml');
      expect(response.json.firstCall.args[0].price).to.be.equals('2.20');
      expect(response.json.firstCall.args[0].image).to.be.equals('http://localhost:3001/images/skol_lata_350ml.jpg');
    });
  });
});
