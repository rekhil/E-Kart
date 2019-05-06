var mongoose = require('mongoose');

// User Schema
var UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: false
    }
});

var User = module.exports = mongoose.model('user', UserSchema);

