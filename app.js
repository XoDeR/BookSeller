const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
var passport = require('passport');
var session = require('express-session');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var models = require('./server/models');

app.use(passport.initialize());
const localSignupStrategy = require('./server/config/passport/local-signup');
const localLoginStrategy = require('./server/config/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login',localLoginStrategy);

app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/index');
app.use('/auth',authRoutes);
app.use('/api',apiRoutes);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}));

module.exports = app;