var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CartSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
    account: String,
    guest: String
});

module.exports = mongoose.model('Cart', CartSchema);

