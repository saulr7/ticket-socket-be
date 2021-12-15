const { socketActions } = require('../constant');
const TicketList = require('./ticketList');

const {
  ON_CONNECTION,

} = socketActions;

class Sockets {
  constructor(io) {
    this.io = io;
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on(ON_CONNECTION, (socket) => {
      socket.on('request-ticket', (_, cb) => {
        const newticket = this.ticketList.createTicket();
        cb(newticket);
      });

      socket.on('next-ticket', ({ agent, desk }, cb) => {
        const ticket = this.ticketList.assignTicket(agent, desk);
        cb(ticket);

        this.io.emit('ticket-taken', this.ticketList.lasts);
      });
    });
  }
}

module.exports = Sockets;
