var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderProduct' }],
    totalPrice: Number,
    deliveryCharges: Number,
    billAmount: Number,
    date: Date,
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('order', OrderSchema);

