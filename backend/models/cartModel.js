var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CartItemSchema = mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
    offerPrice: Number,
    cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
});

var CartSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }],
    totalPrice: Number,
    deliveryCharges: Number,
    billAmount: Number,
    userid: { type: Schema.Types.ObjectId, ref: 'Account' },
    guestId: String
});

module.exports = mongoose.model('CartItem', CartItemSchema);
module.exports = mongoose.model('Cart', CartSchema);

