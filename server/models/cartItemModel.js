var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CartItemSchema = mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    account: String,
    guest: String
});

module.exports = mongoose.model('CartItem', CartItemSchema);