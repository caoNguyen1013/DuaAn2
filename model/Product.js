var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Product = new Schema({
  name 		    	:  String,
  nameKhongDau	: String,
  img 		    	: String,
  placeId 	   	: String,
  des 			    : String,
  price 		    : Number,
  st 			      : Number,
  address       : String,
  kindId        : String,
  address       : Array, 
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
},{collection : 'product'});

module.exports = mongoose.model('Product', Product);