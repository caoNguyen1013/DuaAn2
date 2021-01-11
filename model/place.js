var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Place = new Schema({
  name:  String,
  nameKhongDau: String

},{collection : 'place'});

module.exports = mongoose.model('Place', Place);