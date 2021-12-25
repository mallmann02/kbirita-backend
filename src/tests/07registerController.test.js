const sinon = require('sinon');
const { expect } = require('chai');
const shell = require('shelljs');

const registerController = require('../controllers/registerController');

describe('07 - Ao chamar o controller de criacao de novo usuario', () => {
  describe('Quando o payload informado é válido', () => {
    shell.cd('..');
    shell.exec('npm run db:reset');
    shell.cd('back-end');

    const response = {};
    const request = {};

    before(() => {
      request.body = {
        "name": "Fulano Souza Filho",
        "email": "fusouza@email.com",
        "password": "123456",
        "role": "customer",
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();
    });

     it('Retorna status 201', async () => {
      await registerController.registerUser(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('Retorna mensagem de usuario criado', async () => {
      await registerController.registerUser(request, response);

      expect(response.json.firstCall.args[0].message).to.be.equals('User Fulano Souza Filho created');
    });
  });
});
