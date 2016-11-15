var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
   id:Schema.Types.Mixed,
   id_shop:Schema.Types.Mixed,
   id_shop_group:Number,
   secure_key:String,
   note:String,
   id_gender:Number,
   id_default_group:Number,
   id_lang:Number,
   lastname:String,
   firstname:String,
   email:String,
   newsletter:Boolean,
   ip_registration_newsletter:String,
   optin:Boolean,
   website:String,
   company:String,
   siret:String,
   ape:String,
   outstanding_allow_amount:Number,
   show_public_prices:Number,
   id_risk:Number,
   max_payment_days:Number,
   passwd:String,
   active:Number,
   is_guest:Boolean,
   deleted:Boolean,
   geoloc_id_country:Number,
   geoloc_id_state:Number,
   geoloc_postcode:String,
   logged:Number,
   id_guest:Number,
   groupBox:String,
   id_shop_list:Number,
   force_id:Boolean
});

module.exports = mongoose.model('Customer', CustomerSchema);