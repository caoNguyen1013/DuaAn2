var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;

var Kind = new Schema({
   kind: { type: String }
},
{collection : 'kind'});

module.exports = mongoose.model('Kind', Kind);