const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
////const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/index');
////app.use('/auth',authRoutes);
app.use('/api',apiRoutes);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;