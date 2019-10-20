const session = require('./session');
const dashboard = require('./dashboard');
const auth = require('../app/middleware/auth');

module.exports = app => {
  app.use('/sessions', session);
  app.use(auth);
  app.use('/dashboard', dashboard);
};
