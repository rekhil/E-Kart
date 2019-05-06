var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategorySchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

var DealsSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    price: Number,
    discount: Number,
    date: Date,
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

var RatingSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    rating: Number,
    comment: String,
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

var ProductSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    image: String,
    displayName: String,
    shortDesc: String,
    desc: String,
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    price: Number,
    discount: Number,
    deals: [{ type: Schema.Types.ObjectId, ref: 'Deals' }],
    offerPrice: Number,
    deliveryCharge: Number,
    avgRating: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Rating' }],
});

module.exports = mongoose.model('Category', CategorySchema);
module.exports = mongoose.model('Deals', DealsSchema);
module.exports = mongoose.model('Rating', RatingSchema);
module.exports = mongoose.model('Product', ProductSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}