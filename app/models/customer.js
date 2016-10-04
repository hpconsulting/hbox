var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
   id:Number,
   id_shop:Number,
   id_shop_group:Number
});

module.exports = mongoose.model('Customer', CustomerSchema);