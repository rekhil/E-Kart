var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderProductSchema = mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    status: Number,
    orderItem: { type: Schema.Types.ObjectId, ref: 'OrderItem' },
    order: { type: Schema.Types.ObjectId, ref: 'Order' }
});

var OrderItemSchema = mongoose.Schema({
    product: [{ type: Schema.Types.ObjectId, ref: 'OrderProduct' }],
    quantity: Number,
    price: Number,
    offerPrice: Number,
    order: { type: Schema.Types.ObjectId, ref: 'Order' }
});

var OrderSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderItem' }],
    totalPrice: Number,
    deliveryCharges: Number,
    billAmount: Number,
    userid: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('OrderProduct', OrderProductSchema);
module.exports = mongoose.model('OrderItem', OrderItemSchema);
module.exports = mongoose.model('Order', OrderSchema);

