# anternet-broadcast.js

[![build](https://img.shields.io/travis/Anternet/anternet-broadcast.js.svg?branch=master)](https://travis-ci.org/Anternet/anternet-broadcast.js)
[![npm](https://img.shields.io/npm/v/anternet-broadcast.svg)](https://npmjs.org/package/anternet-broadcast)
[![Join the chat at https://gitter.im/Anternet/anternet.js](https://badges.gitter.im/Anternet/anternet.js.svg)](https://gitter.im/Anternet/anternet.js?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![npm](https://img.shields.io/npm/l/anternet-broadcast.svg)](LICENSE)


[Anternet](https://www.npmjs.com/package/anternet) library for broadcast messages to other peers that listening on the same channel.

## Example

```js
const Anternet = require('anternet');
const Broadcast = require('anternet-broadcast');

const msg = {a: 'Hello world', foo: 'bar'};
              
const anternet = new Anternet();
const broadcast = Broadcast.generate();

console.log(broadcast.publicKey); // print broadcast id string

// send messages to a given peer
const address = '127.0.0.1';
const port = 12345;
broadcast.send(anternet, msg, port, address);
```

## License

[MIT License](LICENSE).
Copyright &copy; 2016 [Moshe Simantov](https://github.com/moshest)



