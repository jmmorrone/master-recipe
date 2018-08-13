const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.load();

const session = require('./session');
const passport = require('./passport');
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

// App configuration
const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(indexRoutes);
app.use(authRoutes);

app.listen(port, () => { });

module.exports = app;
