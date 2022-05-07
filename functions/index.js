const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(bodyParser.json({ limit: '250kb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors({ origin: true }));

app.get('/', (req, res) => res.send('Healthy'));

app.use('/', require(path.join(__dirname, 'routes')));

app.use((err, req, res, next) => {
  console.log('ERROR HANDLER', req.url);
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);
