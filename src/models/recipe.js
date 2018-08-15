const { Schema } = require('mongoose');
const instruction = require('./instruction');

const recipe = new Schema({
  title: { type: String, index: true, required: true },
  ingredients: { type: [String] },
  instructions: { type: [instruction], default: [] },
  author: { type: String, index: true, required: true },
});

module.exports = recipe;
