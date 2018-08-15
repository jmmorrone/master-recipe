const mongoose = require('mongoose');

const CONFIG = require('../config/config');
const recipe = require('./recipe');

// Connection URL
const url = `mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db_name}`;

mongoose.connect(url, { useNewUrlParser: true });
const Recipe = mongoose.model('Recipe', recipe);

module.exports = {
  Recipe,
};
