var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var CustomerSchema   = new Schema({
      id: Number,
      firstname: String,
      lastname: String
});

module.exports = mongoose.model('Customer', CustomerSchema);