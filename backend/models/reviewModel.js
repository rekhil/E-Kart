var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ReviewSchema = mongoose.Schema({
    rating: Number,
    comment: String,
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('Review', ReviewSchema);