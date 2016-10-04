var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
   id:Number,
   id_shop:Number,
   id_shop_group:Number,
   secure_key:String,
   note:String,
   id_gender:Number,
   id_default_group:Number,
   id_lang:Number,
   lastname:String,
   firstname:String,
   email:String
});

module.exports = mongoose.model('Customer', CustomerSchema);