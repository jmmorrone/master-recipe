const { Schema } = require('mongoose');

const instruction = new Schema({
  text: String,
  image: String,
});

module.exports = instruction;
