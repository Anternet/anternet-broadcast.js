const EventEmitter = require('events');

const MSG_TYPE_BROADCAST = 0x04;

class Transmitter extends EventEmitter {

  constructor(anternet, buffer) {
    super();

    this.anternet = anternet;
    this.msg = buffer;
  }

  send(port, address, callback) {
    this.anternet.request(MSG_TYPE_BROADCAST, this.msg, port, address, err => {
      if (callback) callback(err);

      if (err) {
        this.emit('error', err, port, address);
      } else {
        this.emit('success', port, address);
      }
    });

    return this;
  }
}

module.exports = Transmitter;
