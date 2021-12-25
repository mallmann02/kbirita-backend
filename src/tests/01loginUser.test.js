const { expect } = require('chai');
const frisby = require('frisby');

const url = 'http://localhost:3001';

describe('01 - Login do usuario', () => {
  describe('Quando acessa com sucesso', () => {
    it('Retorna o codigo de status 200', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .expect('status', 200)
    });

    it('Retorna um objeto', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).to.be.a('object');
        })
    });

    it('O objeto possui a chave name', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).to.have.property('name');
        })
    });

    it('A chave name retorna o valor correto', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.name).to.be.equals('Fulana Pereira');
        })
    });

    it('O objeto possui a chave email', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).to.have.property('email');
        })
    });

    it('A chave email retorna o valor correto', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.email).to.be.equals('fulana@deliveryapp.com');
        })
    });

    it('O objeto possui a chave role', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).to.have.property('role');
        })
    });

    it('A chave role retorna o valor correto', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.role).to.be.equals('seller');
        })
    });

    it('O objeto possui a chave token', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result).to.have.property('token');
        })
    });
  });

  describe('Quando nao acessa por erro no email ou password', () => {
    it('Email errado informado deve retornar status 400', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp',
            password: 'fulana@123'
          })
        .expect('status', 400)
    });

    it('Verifica mensagem de erro para email incorreto', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp',
            password: 'fulana@123'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.error.message).to.be.equals('\"email\" must be a valid email');
        })
    });

    it('Password errada informada, deve retornar status 401', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@122'
          })
        .expect('status', 401)
    });

    it('Verifica mensagem de erro para password incorreta', async () => {
      await frisby
        .post(`${url}/login`,
          {
            email: 'fulana@deliveryapp.com',
            password: 'fulana@122'
          })
        .then ((response) => {
          const { body } = response;
          const result = JSON.parse(body);
          expect(result.error.message).to.be.equals('\"password\" must be a valid password');
        })
    });
  });
});
