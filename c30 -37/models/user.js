var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  email: String,
  password: String,
  token: String
})

user.methods.validPassword = function(pwd){
  return (this.password === pwd)
}

module.exports = mongoose.model('User', user)
