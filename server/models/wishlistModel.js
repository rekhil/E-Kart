var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var WishlistSchema = mongoose.Schema({
    items: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('Wishlist', WishlistSchema);

