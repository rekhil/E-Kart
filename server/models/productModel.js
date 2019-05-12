var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProductSchema = mongoose.Schema({
    image: String,
    displayName: String,
    shortDesc: String,
    desc: String,
    price: Number,
    discount: Number,
    deliveryCharge: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    deals: [],
    review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = mongoose.model('Product', ProductSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}