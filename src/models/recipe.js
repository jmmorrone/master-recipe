const { Schema } = require('mongoose');

const recipe = new Schema({
  title: { type: String, index: true, required: true },
  ingredients: { type: [String] },
  instructions: [{ text: String, image: [String] }],
  author: { type: String, index: true, required: true },
  createdOn: { type: Date, required: true, default: Date.now },
});

module.exports = recipe;
