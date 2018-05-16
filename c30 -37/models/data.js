var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var data = new Schema({
  letter: String,
  frequency: Number,
  token: String
})

module.exports = mongoose.model('Data', data)
