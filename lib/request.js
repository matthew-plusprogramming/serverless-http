'use strict';

const http = require('http');
const stream = require('stream');

module.exports = class ServerlessRequest extends http.IncomingMessage {
  constructor({ method, url, headers, body, remoteAddress }) {
    const socket = new stream.Readable({ read: Function.prototype });

    Object.assign(socket, {
      encrypted: true,
      remoteAddress,
      address: () => ({ port: 443 }),
      end: Function.prototype,
      destroy: Function.prototype
    });

    super(socket);

    if (typeof headers['content-length'] === 'undefined') {
      headers['content-length'] = Buffer.byteLength(body);
    }

    Object.assign(this, {
      ip: remoteAddress,
      complete: true,
      httpVersion: '1.1',
      httpVersionMajor: '1',
      httpVersionMinor: '1',
      method,
      headers,
      body,
      url,
    });

    this._read = Function.prototype;
    this.push(body);
    this.push(null);
  }

}
