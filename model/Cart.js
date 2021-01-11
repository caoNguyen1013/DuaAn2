var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Cart = new Schema({
  name 		:  String,
  email 	: String,
  sdt 		: String,
  msg 		: String,
  cart 		: Object,
  dayIn   : {type: Date, default: Date.now()},
  dayOut  :{type: Date, default: Date.now()},
  st 		: Number

},{collection : 'cart'});

module.exports = mongoose.model('Cart', Cart);