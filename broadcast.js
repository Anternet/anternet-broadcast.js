const crypto = require('crypto');
const secp256k1 = require('secp256k1');
const Transmitter = require('./lib/transmitter');

const PRIVATE_KEY_LENGTH = 32;
const PUBLIC_KEY_LENGTH = 33;
const SIGNATURE_LENGTH = 64;
const MSG_HEADER_LENGTH = PUBLIC_KEY_LENGTH + SIGNATURE_LENGTH;

const BUFFER_ENCODING = 'hex';
const HASH_ALGORITHM = 'sha256';

class Broadcast {

  constructor(privateKey) {
    if (privateKey instanceof Buffer) {
      this.privateKey = privateKey;
    } else if (typeof privateKey === 'string') {
      this.privateKey = Buffer.from(privateKey, BUFFER_ENCODING);
    } else {
      throw new Error('`privateKey` must be a Buffer or string');
    }

    if (this.privateKey.length !== PRIVATE_KEY_LENGTH) throw new Error('Invalid privateKey length');
    this.publicKey = this.constructor.getPublicKey(this.privateKey);
  }

  static generate(callback) {
    if (callback === undefined) {
      const privateKey = this.generatePrivateKey();
      return new this(privateKey);
    }

    this.generatePrivateKey((err, privateKey) => {
      if (err) return callback(err);

      callback(null, new this(privateKey));
    });
  }

  static createHash() {
    return crypto.createHash(HASH_ALGORITHM);
  }

  static getPublicKey(privateKey) {
    return secp256k1.publicKeyCreate(privateKey);
  }

  static generatePrivateKey(callback) {
    if (callback === undefined) {
      let privateKey;

      do {
        privateKey = crypto.randomBytes(PRIVATE_KEY_LENGTH);
      } while (!secp256k1.privateKeyVerify(privateKey));

      return privateKey;
    }

    crypto.randomBytes(PRIVATE_KEY_LENGTH, (err, privateKey) => {
      if (err || secp256k1.privateKeyVerify(privateKey)) return callback(err, privateKey);

      this.generatePrivateKey(callback);
    });
  }

  get id() {
    return this.publicKey.toString(BUFFER_ENCODING);
  }

  send(anternet, data, port, address, callback) {
    return this.sign(anternet, data).send(port, address, callback);
  }

  sign(anternet, data) {
    const buffer = anternet.encode(data);
    const hash = this.constructor.createHash().update(buffer).digest();
    const signObj = secp256k1.sign(hash, this.privateKey);

    const msg = Buffer.concat(
        [this.publicKey, signObj.signature, buffer],
        MSG_HEADER_LENGTH + buffer.length
    );
    return new Transmitter(anternet, msg);
  }
}

module.exports = Broadcast;
