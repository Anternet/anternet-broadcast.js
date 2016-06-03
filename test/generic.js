const assert = require('assert');
const Anternet = require('anternet');
const Broadcast = require('../');
const { describe, it } = global;

describe('generic', () => {
  it('should send broadcast', () => {
    const anternet = new Anternet();
    const broadcast = Broadcast.generate();

    assert.equal(typeof broadcast.id, 'string');

    broadcast.sign(anternet, { foo: 'bar' }).send(12345, '127.0.0.1');
  });
});
