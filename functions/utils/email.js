const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const auth = {
  auth: {
    api_key: 'c75a3bb6aeed9b07426f93d29138ff07-d5e69b0b-ae620cf5',
    domain: 'mg.ignitestudios.com',
  },
};

const transporter = nodemailer.createTransport(mg(auth));

module.exports = options => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(options, error => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
};
