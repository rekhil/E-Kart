var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CategorySchema = mongoose.Schema({
    name: String
});

module.exports = mongoose.model('Category', CategorySchema);