var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var AuthSchema = mongoose.Schema({
    userId: Schema.Types.ObjectId,
    guestId: Schema.Types.ObjectId,
    email: String,
    password: String
});

module.exports = mongoose.model('Auth', AuthSchema);

