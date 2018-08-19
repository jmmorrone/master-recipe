const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');

const CONFIG = require('./config/config');
const logger = require('./logger');
const recipeRoutes = require('./routes/recipe');

// App configuration
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connection URL
const url = `mongodb://${CONFIG.db_user}:${CONFIG.db_password}@ds227332.mlab.com:${CONFIG.db_port}/${CONFIG.db_name}`;

mongoose.connect(url, { useNewUrlParser: true }, (err) => {
  if (err) logger.error('Cannot connect to Mongo');
});

// Routes
app.use('/api', recipeRoutes);

// Handle error promises
process.on('unhandledRejection', (reason) => {
  logger.error(reason.stack || reason);
});

app.listen(CONFIG.port);
