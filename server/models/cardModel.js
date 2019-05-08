var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CardSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    cardNumber: Number,
    nameOnCard: String,
    expiryMonth: Number,
    expiryYear: Number,
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('Card', CardSchema);

