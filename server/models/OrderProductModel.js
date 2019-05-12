var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var OrderProductSchema = mongoose.Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number,
    offerPrice: Number
});

module.exports = mongoose.model('OrderProduct', OrderProductSchema);