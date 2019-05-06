var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AccountSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    phone: String
});

module.exports = mongoose.model('Account', AccountSchema);

