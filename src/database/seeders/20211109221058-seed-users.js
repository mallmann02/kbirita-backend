'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users',
      [{
        id: 1,
        name: 'Delivery App Admin',
        email: 'adm@deliveryapp.com',
        password: 'a4c86edecc5aee06eff8fdeda69e0d04',
        role: 'administrator',
      },
      {
        id: 2,
        name: 'Fulana Pereira',
        email: 'fulana@deliveryapp.com',
        password: '3c28d2b0881bf46457a853e0b07531c6',
        role: 'seller',
      },
      {
        id: 3,
        name: 'Cliente Zé Birita',
        email: 'zebirita@email.com',
        password: '1c37466c159755ce1fa181bd247cb925',
        role: 'customer',
      },
      {
        id: 4,
        name: 'test',
        email: 'test@email.com',
        password: 'bf54b1c4f8df323ee9206d456323b2ab', //senha é "test-login" bf54b1c4f8df323ee9206d456323b2ab
        role: 'administrator',
      },
      {
        id: 5,
        name: 'test',
        email: 'test2@email.com',
        password: 'bf54b1c4f8df323ee9206d456323b2ab', //senha é "test-login" bf54b1c4f8df323ee9206d456323b2ab
        role: 'costumer',
      },
      ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
