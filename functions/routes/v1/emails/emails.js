const express = require('express');
const email = require('../../../utils/email');
const router = express.Router();

const sendEmail = async (req, res, next) => {
  try {
    let emailOptions = req.body;
    emailOptions.from = 'web-outreach@ignitestudios.com';
    emailOptions.to = 'info@ignitestudios.com';
    await email(emailOptions);
    res.json(`Email successfully sent to ${emailOptions.to}`);
  } catch (e) {
    next(e);
  }
};

router.post('/', sendEmail);

module.exports = router;
