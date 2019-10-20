const router = require('express').Router();

const session = require('../app/controllers/SessionController');

router.route('/').post(session.store);

module.exports = router;
