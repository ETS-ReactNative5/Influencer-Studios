const express = require('express');
const router = express.Router();

const emails = require('./emails');

router.use('/', emails);

module.exports = router;
