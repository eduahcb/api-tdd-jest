const router = require('express').Router();

router.route('/').get((req, res) => res.status(200).json({ message: 'ok' }));

module.exports = router;
