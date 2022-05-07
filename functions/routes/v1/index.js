const express = require('express');
const emails = require('./emails');

const router = express.Router();

router.use('/emails', emails);

module.exports = router;
