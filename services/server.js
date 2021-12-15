const express = require('express');

const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
const Sockets = require('./socket');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
    this.app.get('/tickets', (req, res) => {
      res.json({ lasts: this.sockets.ticketList.lasts });
    });
  }

  serve() {
    this.middlewares();

    this.server.listen(this.port);
  }
}

module.exports = Server;
