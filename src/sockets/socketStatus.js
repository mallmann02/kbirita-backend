const { Sale } = require('../database/models');

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('changeStatus', async ({ newStatus, idToChange }) => {
      await Sale.update({ status: newStatus }, { where: { id: idToChange } })
        .then(() => io.emit('changeStatus', { newStatus, idToChange }))
        .catch((error) => console.log(error.message));
    });
  });  
};
