Deals = require('../models/dealsModel');
Product = require('../models/productModel');

exports.create = function (req, res) {

    var deals = new Deals();
    deals.discount = req.body.discount;
    deals.date = req.body.date;
    deals.save(function (err) {
        if (err)
            res.json(err);
        Product.findById(req.body.product, function (err, product) {
            if (err)
                res.send(err);
            product.deals.push(deals._id)
            product.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    message: 'New deal added!',
                    data: product
                });
            });
        });
    });
};
