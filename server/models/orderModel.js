var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'OrderProduct' }],
    totalPrice: Number,
    deliveryCharges: Number,
    billAmount: Number,
    date: Date,
    email: String
});

module.exports = mongoose.model('order', OrderSchema);

