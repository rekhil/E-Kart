var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CartSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
    totalPrice: Number,
    deliveryCharge: Number,
    billAmount: Number,
    accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
    guest: String
});

module.exports = mongoose.model('Cart', CartSchema);

