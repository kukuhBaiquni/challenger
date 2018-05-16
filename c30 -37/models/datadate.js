var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var datadate = new Schema({
  letter: Date,
  frequency: Number,
  token: String
})

module.exports = mongoose.model('Datadate', datadate)
