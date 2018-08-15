const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const session = require('./session');
const passport = require('./passport');
const indexRoutes = require('./routes/index');
const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');

// App configuration
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use(indexRoutes);
app.use(userRoutes);
app.use(recipeRoutes);

module.exports = app;
