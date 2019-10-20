require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const express = require('express');

class App {
  constructor() {
    this.server = express();

    this._middleware();
    this._routes();
  }

  _middleware() {
    this.server.use(express.json());
  }

  _routes() {
    require('./routes/index')(this.server);
  }
}

module.exports = new App().server;
