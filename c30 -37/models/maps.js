var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var maps = new Schema({
  title: String,
  lat: Number,
  lng: Number,
  token: String
})

module.exports = mongoose.model('Maps', maps)
