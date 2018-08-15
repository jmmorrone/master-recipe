const mongoose = require('mongoose');

const CONFIG = require('../config/config');
const recipe = require('./recipe');

// Connection URL
const url = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;

mongoose.createConnection(url);
const Recipe = mongoose.model('Recipe', recipe);

module.exports = {
  Recipe,
};
