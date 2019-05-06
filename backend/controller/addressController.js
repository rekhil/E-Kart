Address = require('../models/addressModel');

exports.create = function (req, res) {
    var address = new Address();
    address.address = req.body.address;
    address.city = req.body.city;
    address.state = req.body.state;
    address.pincode = req.body.pincode;
    address.phoneNumber = req.body.phoneNumber;
    address.account = req.body.accountId;
    address.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'Address created successfully!',
            data: address
        });
    });
};

exports.update = function (req, res) {
    Address.findById(req.params.address_id, function (err, address) {
        if (err)
            res.send(err);
        address.address = req.body.address;
        address.city = req.body.city;
        address.state = req.body.state;
        address.pincode = req.body.pincode;
        address.phoneNumber = req.body.phoneNumber;
        address.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Address updated successfully',
                data: address
            });
        });
    });
};

exports.delete = function (req, res) {
    Address.remove({
        _id: req.params.address_id
    }, function (err, address) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Address deleted successfully'
        });
    });
};

exports.view = function (req, res) {
    Address.findById(req.params.address_id, function (err, address) {
        if (err)
            res.send(err);
        res.json({
            message: 'Address details retrieved',
            data: address
        });
    });
};

exports.viewAll = function (req, res) {
    Address.find({ 'account': req.params.account_id }, function (err, address) {
        if (err)
            res.send(err);
        res.json({
            message: 'All account addresses details retrieved',
            data: address
        });
    });
};