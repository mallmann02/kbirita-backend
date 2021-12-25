const { expect } = require('chai');
const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3001';

describe('04 - Retorno de sales', () => {
  
  shell.cd('..');
  shell.exec('npm run db:reset');
  shell.cd('back-end');

  describe('Quando a venda efetuada com sucesso', () => {
    it('Retorna o codigo de status 201 e o saleId: 1', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": 123,
        "userId": 3,
        "sellerId": 2,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 201)
        expect(result.saleId).to.be.equals(1);
      })
    });
  });

  describe('Quando faltam dados na venda', () => {
    it('Falta token: recebe status 401 e mensagem de erro', async () => {
      await frisby
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": 123,
        "userId": 3,
        "sellerId": 2,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 401)
        expect(result.error.message).to.be.equals('Token not found');
      })
    });

    it('Falta preco total: recebe status 400 e mensagem de erro', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": null, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": 123,
        "userId": 3,
        "sellerId": 2,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 400)
        expect(result.error.message).to.be.equals('\"totalPrice\" must be a number');
      })
    });

    it('Falta endereco de entrega: recebe status 400 e mensagem de erro', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "",
        "deliveryNumber": 123,
        "userId": 3,
        "sellerId": 2,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 400)
        expect(result.error.message).to.be.equals('\"deliveryAddress\" is not allowed to be empty');
      })
    });

    it('Falta numero do endereco de entrega: recebe status 400 e mensagem de erro', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": null,
        "userId": 3,
        "sellerId": 2,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 400)
        expect(result.error.message).to.be.equals('\"deliveryNumber\" must be a number');
      })
    });

    it('Falta userId: recebe status 400 e mensagem de erro', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": 123,
        "userId": null,
        "sellerId": 2,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 400)
        expect(result.error.message).to.be.equals('\"userId\" must be a number');
      })
    });

    it('Falta sellerId: recebe status 400 e mensagem de erro', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": 123,
        "userId": 3,
        "sellerId": null,
        "products": [{ "productId": 1, "quantity": 2 }]
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 400)
        expect(result.error.message).to.be.equals('\"sellerId\" must be a number');
      })
    });

    it('Falta produtos: recebe status 400 e mensagem de erro', async () => {
      let token;
      await frisby
      .post(`${url}/login`,
        {
          email: 'zebirita@email.com',
          password: '$#zebirita#$',
        })
      .expect('status', 200)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        token = result.token;
      });

      await frisby
      .setup({
        request: {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        },
      })
      .post(`${url}/sales`,
      {
        "totalPrice": 15.00, 
        "deliveryAddress": "Rua K",
        "deliveryNumber": 123,
        "userId": 3,
        "sellerId": 2,
        "products": null
      })
      .then ((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect('status', 400)
        expect(result.error.message).to.be.equals('\"products\" must be an array');
      })
    });

  });
});
