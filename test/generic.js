const assert = require('assert');
const Anternet = require('anternet');
const Broadcast = require('../');
const { describe, it } = global;

describe('generic', () => {
  it('should send broadcast', (done) => {
    const anternet = new Anternet();
    const broadcast = Broadcast.generate();

    assert.equal(typeof broadcast.id, 'string');

    broadcast.send(anternet, { foo: 'bar' }, 12345, '127.0.0.1');
    done();
  });
});
