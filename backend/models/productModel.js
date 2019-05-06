var mongoose = require('mongoose');

// Product Schema
var ProductSchema = mongoose.Schema({
    displayName: {
        type: String,
        required: true
    },
    shortDesc: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: String
});

var Product = module.exports = mongoose.model('product', ProductSchema);

module.exports.get = function (callback, limit) {
    Product.find(callback).limit(limit);
}