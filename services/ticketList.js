const Ticket = require('./ticket');

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pending = [];
    this.assings = [];
  }

  get getNext() {
    this.lastNumber += 1;
    return this.lastNumber;
  }

  get lasts() {
    return this.assings.slice(0, 3);
  }

  createTicket() {
    const newTicket = new Ticket(this.getNext);
    this.pending.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desk) {
    if (this.pending.length === 0) {
      return null;
    }

    const nextTicket = this.pending.shift();
    nextTicket.agent = agent;
    nextTicket.desk = desk;
    this.assings.unshift(nextTicket);
    return nextTicket;
  }
}

module.exports = TicketList;
