Account = require('../models/accountModel');

exports.create = function (req, res) {
    var account = new Account();
    account.name = req.body.name;
    account.email = req.body.email;
    account.password = req.body.password;
    account.phone = req.body.phone;
    account.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'User profile created!',
            data: account
        });
    });
};

exports.update = function (req, res) {
    Account.findById(req.params.account_id, function (err, account) {
        if (err)
            res.send(err);
        account.name = req.body.name;
        account.password = req.body.password;
        account.phone = req.body.phone;
        account.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'User profile updated',
                data: account
            });
        });
    });
};

exports.view = function (req, res) {
    Account.findById(req.params.account_id, function (err, account) {
        if (err)
            res.send(err);
        res.json({
            message: 'User profile details retrieved',
            data: account
        });
    });
};