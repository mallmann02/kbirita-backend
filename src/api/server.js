const port = process.env.API_PORT || 3001;
const socketIo = require('socket.io');
const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    methods: ['GET', 'POST'],
  },
});

const socket = require('../sockets/socketStatus');

socket(io);

server.listen(port, () => console.log(`App listening on port ${port}!`));
