Wishlist = require('../models/wishlistModel');
Product = require('../models/productModel');
const jwt = require("jsonwebtoken");

exports.create = function (req, res) {
    const decoded = jwt.decode(req.headers.authorization);
    Wishlist.findOne({ 'account': decoded.id }, function (err, wishlist) {
        if (err)
            res.json(err);
        if (!wishlist) {
            wishlist = new Wishlist();
            wishlist.items.push(req.body.productId)
            wishlist.account = decoded.id
            wishlist.save(function (err) {
                if (err)
                    res.json(err);
                Wishlist.findById(wishlist._id)
                    .populate({
                        path: 'items',
                        populate: {
                            path: 'product',
                            model: 'Product',
                            populate: {
                                path: 'category',
                                model: 'Category'
                            }
                        }
                    })
                    .exec(function (err, wishlistResponse) {
                        if (err)
                            res.json(err);
                        res.json({
                            status: "success",
                            message: 'Wishlist updated!',
                            data: wishlistResponse

                        });
                    });
            });
        } else {
            Wishlist.findOne({ 'account': decoded.id, items: { $elemMatch: { $in: req.body.productId } } }, function (err, wishlistItem) {
                if (err)
                    res.json(err);
                if (!wishlistItem) {
                    wishlist.items.push(req.body.productId)
                    wishlist.save(function (err) {
                        if (err)
                            res.json(err);
                        Wishlist.findById(wishlist._id)
                            .populate({
                                path: 'items',
                                populate: {
                                    path: 'product',
                                    model: 'Product',
                                    populate: {
                                        path: 'category',
                                        model: 'Category'
                                    }
                                }
                            })
                            .exec(function (err, wishlistResponse) {
                                if (err)
                                    res.json(err);
                                res.json({
                                    status: "success",
                                    message: 'Wishlist updated!',
                                    data: wishlistResponse

                                });
                            });
                    });
                } else {
                    res.json({
                        status: "conflict",
                        message: 'Already exist!',
                        data: wishlist
                    });
                }
            });
        }
    });
};

exports.view = function (req, res) {
    const decoded = jwt.decode(req.headers.authorization);
    Wishlist.findOne({ account: decoded.id })
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

exports.delete = function (req, res) {
    const decoded = jwt.decode(req.headers.authorization);
    Wishlist.findOne({ account: decoded.id })
        .populate({
            path: 'items',
            populate: {
                path: 'product',
                model: 'Product',
                populate: {
                    path: 'category',
                    model: 'Category'
                }
            }
        })
        .exec(function (err, wishlist) {
            if (err)
                res.send(err);
            if (wishlist) {
                Wishlist.findOne({ account: decoded.id, items: { $elemMatch: { $in: req.params.productId } } })
                    .populate({
                        path: 'items',
                        populate: {
                            path: 'product',
                            model: 'Product',
                            populate: {
                                path: 'category',
                                model: 'Category'
                            }
                        }
                    })
                    .exec(function (err, wishlistWithProduct) {
                        if (err)
                            res.send(err);
                        if (wishlistWithProduct) {
                            wishlistWithProduct.items.remove(req.params.productId);
                            wishlistWithProduct.save(function (err) {
                                if (err)
                                    res.json(err);
                                res.json({
                                    status: "success",
                                    message: 'Item removed from wishlist!',
                                    data: wishlistWithProduct
                                });
                            });
                        } else {
                            res.json({
                                status: "failed",
                                message: 'No product found in wishlist',
                                data: wishlist
                            });
                        }
                    });
            } else {
                res.json({
                    status: "failed",
                    message: 'No data found'
                });
            }
        });
};
