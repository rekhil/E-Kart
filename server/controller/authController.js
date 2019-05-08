Auth = require('../models/authModel');

exports.validate = function (req, res) {
    Auth.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, auth) {
        if (err)
            res.send(err);
        res.json({
            message: 'Authenticated Successfully',
            data: auth
        });
    });
};