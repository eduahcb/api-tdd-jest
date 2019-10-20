const facker = require('faker');
const { factory } = require('factory-girl');
const { User } = require('../src/app/models');

factory.define('User', User, {
  name: facker.name.findName(),
  email: facker.internet.email,
  password: facker.internet.password()
});

module.exports = factory;
