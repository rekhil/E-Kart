Card = require('../models/cardModel');

exports.create = function (req, res) {
    var card = new Card();
    card.cardNumber = req.body.cardNumber;
    card.nameOnCard = req.body.nameOnCard;
    card.expiryMonth = req.body.expiryMonth;
    card.expiryYear = req.body.expiryYear;
    card.account = req.body.account;
    card.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'Card added successfully!',
            data: card
        });
    });
};

exports.delete = function (req, res) {
    Card.remove({ _id: req.params.card_id }, function (err, card) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Card deleted successfully'
        });
    });
};

exports.view = function (req, res) {
    Card.findById(req.params.card_id, function (err, card) {
        if (err)
            res.send(err);
        res.json({
            message: 'Card details retrieved',
            data: card
        });
    });
};

exports.viewAll = function (req, res) {
    Card.find({ 'account': req.params.account_id }, function (err, card) {
        if (err)
            res.send(err);
        res.json({
            message: 'All account card details retrieved',
            data: card
        });
    });
};