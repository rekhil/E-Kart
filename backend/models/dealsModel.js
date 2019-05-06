var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var DealsSchema = mongoose.Schema({
    discount: Number,
    date: Date
});

module.exports = mongoose.model('Deals', DealsSchema);