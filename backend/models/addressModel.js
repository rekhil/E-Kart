var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AddressSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    address: String,
    city: String,
    state: String,
    pincode: String,
    phoneNumber: String,
    account: { type: Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('Address', AddressSchema);

