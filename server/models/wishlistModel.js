var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var WishlistSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    email: String
});

module.exports = mongoose.model('Wishlist', WishlistSchema);

