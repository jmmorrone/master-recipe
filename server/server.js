const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const swaggerDocument = require('./swagger.json');
const CONFIG = require('./config/config');
const logger = require('./logger');
const recipeRoutes = require('./routes/recipe');
const userRoutes = require('./routes/user');
const session = require('./session');
const passport = require('./passport');

// App configuration
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  res.locals.loggedIn = false;
  if (req.session.passport && typeof req.session.passport.user !== 'undefined') {
    res.locals.loggedIn = true;
  }
  next();
});

// Connection URL
const url = `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@ds227332.mlab.com:${CONFIG.db_port}/${CONFIG.db_name}`;

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) logger.error('Cannot connect to Mongo');
});

// Swagger config
if (CONFIG.app === 'dev') {
  swaggerDocument.host = `localhost:" + ${CONFIG.port}`;
}

// Routes
app.use(userRoutes);
app.use('/api', recipeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle error promises
process.on('unhandledRejection', (reason) => {
  logger.error(reason.stack || reason);
});

app.listen(CONFIG.port);
