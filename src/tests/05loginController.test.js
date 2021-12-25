const sinon = require('sinon');
const { expect } = require('chai');

const loginController = require('../controllers/loginController');

describe('05 - Ao chamar o controller de login', () => {
  describe('Quando o payload informado é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.user = {
        "name": "Cliente Zé Birita",
        "email": "zebirita@email.com",
        "role": "customer",
        "id": 3
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

     it('Retorna status 200', async () => {
      await loginController.loginUser(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna dados do usuario com token', async () => {
      await loginController.loginUser(request, response);

      expect(response.json.firstCall.args[0].name).to.be.equals('Cliente Zé Birita');
      expect(response.json.firstCall.args[0].email).to.be.equals('zebirita@email.com');
      expect(response.json.firstCall.args[0].role).to.be.equals('customer');
      expect(response.json.firstCall.args[0]).to.have.property('token');
      expect(response.json.firstCall.args[0].id).to.be.equals(3);
    });
  });
});
