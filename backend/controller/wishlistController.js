Wishlist = require('../models/wishlistModel');
Product = require('../models/productModel');
Account = require('../models/accountModel');

exports.create = function (req, res) {
    Wishlist.findOne({ 'account': req.body.accountId }, function (err, wishlist) {
        if (err)
            res.json(err);
        if (!wishlist) {
            wishlist = new Wishlist();
            wishlist.items.push(req.body.productId)
            wishlist.account = req.body.accountId
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
            Wishlist.findOne({ 'account': req.body.accountId, items: { $elemMatch: { $in: req.body.productId } } }, function (err, wishlistItem) {
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