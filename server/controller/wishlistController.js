Wishlist = require('../models/wishlistModel');
Product = require('../models/productModel');

exports.create = function (req, res) {
    Wishlist.findOne({ 'email': req.body.email }, function (err, wishlist) {
        if (err)
            res.json(err);
        if (!wishlist) {
            wishlist = new Wishlist();
            wishlist.items.push(req.body.productId)
            wishlist.email = req.body.email
            wishlist.save(function (err) {
                if (err)
                    res.json(err);
                res.json({
                    status: "success",
                    message: 'Wishlist updated!',
                    data: wishlist
                });
            });
        } else {
            ~
                Wishlist.findOne({ 'email': req.body.email, items: { $elemMatch: { $in: req.body.productId } } }, function (err, wishlistItem) {
                    if (err)
                        res.json(err);
                    if (!wishlistItem) {
                        wishlist.items.push(req.body.productId)
                        wishlist.save(function (err) {
                            if (err)
                                res.json(err);
                            res.json({
                                status: "success",
                                message: 'Wishlist updated!',
                                data: wishlist
                            });
                        });
                    } else {
                        res.json({
                            status: "conflict",
                            message: 'Already exist!',
                            data: wishlistItem
                        });
                    }
                });
        }
    });
};

exports.view = function (req, res) {
    Wishlist.findOne({ email: req.params.email })
        .populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Product'
            }
        })
        .exec(function (err, wishlist) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'wishlist details retrieved',
                data: wishlist
            });
        });
};