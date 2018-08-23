const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');

const CONFIG = require('./config/config');
const swaggerDocument = require('./swagger.json');
const logger = require('./logger');
const recipeRoutes = require('./routes/recipe');
const authCheck = require('./authCheck');

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

// Swagger config
if (CONFIG.app === 'dev') {
  swaggerDocument.host = `localhost:" + ${CONFIG.port}`;
}

// Routes
app.use('/api', authCheck, recipeRoutes);
app.use('/api-docs', authCheck, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Handle error promises
process.on('unhandledRejection', (reason) => {
  logger.error(reason.stack || reason);
});

app.listen(CONFIG.port);
