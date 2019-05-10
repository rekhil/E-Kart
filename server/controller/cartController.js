Cart = require('../models/cartModel');
Product = require('../models/productModel');
CartItem = require('../models/cartItemModel');
Category = require('../models/categoryModel');

//update quantity in cart -- update cart item, update price details in cart
//get distint item count from cart

exports.create = function (req, res) {
    CartItem.findOne({ 'product': req.body.productId, 'guest': req.body.guestId }, function (err, cartitem) {
        if (err)
            res.json(err);
        if (!cartitem)
            cartitem = new CartItem();
        cartitem.product = req.body.productId;
        if (!cartitem.quantity)
            cartitem.quantity = req.body.quantity
        else
            cartitem.quantity = cartitem.quantity + req.body.quantity;
        if (cartitem.quantity > 4)
            cartitem.quantity = 4
        cartitem.price = req.body.price;
        cartitem.offerPrice = req.body.offerPrice;
        cartitem.deliveryCharge = req.body.deliveryCharge;
        cartitem.account = req.body.accountId;
        cartitem.guest = req.body.guestId;
        cartitem.save(function (err) {
            if (err)
                res.json(err);
            Cart.findOne({ 'guest': req.body.guestId })
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
                .exec(function (err, cart) {
                    if (err)
                        res.json(err);
                    if (!cart) {
                        cart = new Cart();
                        cart.items.push(cartitem._id)
                        //calculate price here
                        cart.totalPrice = 1000
                        cart.deliveryCharge = 100
                        cart.billAmount = 1000
                        cart.account = req.body.accountId;
                        cart.guest = req.body.guestId;
                        cart.save(function (err) {
                            if (err)
                                res.json(err);
                            res.json({
                                status: "success",
                                message: 'Cart updated!',
                                data: cart
                            });
                        });
                    } else {
                        Cart.findOne({ 'guest': req.body.guestId, items: { $elemMatch: { $in: cartitem._id } } }, function (err, existingCartItem) {
                            if (err)
                                res.json(err);

                            if (!existingCartItem)
                                cart.items.push(cartitem._id)
                            //calculate price here
                            cart.totalPrice = 1000
                            cart.deliveryCharge = 100
                            cart.billAmount = 1000
                            cart.account = req.body.accountId;
                            cart.guest = req.body.guestId;
                            cart.save(function (err) {
                                if (err)
                                    res.json(err);
                                Cart.findOne({ 'guest': req.body.guestId })
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
                                    .exec(function (err, cartResponse) {
                                        if (err)
                                            res.json(err);
                                        res.json({
                                            status: "success",
                                            message: 'Cart updated!',
                                            data: cartResponse
                                        });
                                    });
                            });
                        });
                    }
                });
        });
    });
};

exports.delete = function (req, res) {
    CartItem.findOne({ _id: req.params.cartItemId }, function (err, cartItem) {
        if (err)
            res.send(err);
        if (cartItem) {
            CartItem.deleteOne({ _id: req.params.cartItemId }, function (err, deleteStatus) {
                if (err)
                    res.send(err);
                if (deleteStatus.deletedCount > 0) {
                    Cart.findOne({ 'guest': cartItem.guest, items: { $elemMatch: { $in: cartItem._id } } })
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
                        .exec(function (err, cart) {

                            if (err)
                                res.json(err);
                            if (cart) {
                                cart.items.remove(cartItem._id);
                                //calculate price here
                                cart.totalPrice = 1000
                                cart.deliveryCharge = 100
                                cart.billAmount = 1000
                                cart.save(function (err) {
                                    if (err)
                                        res.json(err);
                                    res.json({
                                        status: "success",
                                        message: 'Item removed from cart!',
                                        data: cart
                                    });
                                });
                            }
                        });
                } else {
                    res.json({
                        status: "failed",
                        message: 'Cannot delete',
                        data: req.params.cartItemId
                    });
                }
            });
        } else {
            res.json({
                status: "failed",
                message: 'No data found',
                data: req.params.cartItemId
            });
        }
    });
};

exports.view = function (req, res) {
    Cart.findOne({ guest: req.params.guestId })
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
        .exec(function (err, cart) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'cart details retrieved',
                data: cart
            });
        });
};


exports.viewCount = function (req, res) {
    Cart.findOne({ guest: req.params.guestId })
        .exec(function (err, cart) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'cart details retrieved',
                data: cart && cart.items ? cart.items.length : 0
            });
        });
};

exports.update = function (req, res) {
    CartItem.findOne({ _id: req.params.cartItemId })
        .exec(function (err, cartItem) {
            if (err)
                res.send(err);
            cartItem.quantity = req.body.quantity
            cartItem.save(function (err) {
                if (err)
                    res.json(err);
                Cart.findOne({ 'guest': cartItem.guest, items: { $elemMatch: { $in: cartItem._id } } })
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
                    .exec(function (err, cart) {
                        if (err)
                            res.json(err);
                        //calculate price here
                        cart.totalPrice = 1000
                        cart.deliveryCharge = 100
                        cart.billAmount = 1000
                        cart.save(function (err) {
                            if (err)
                                res.json(err);
                            res.json({
                                status: "success",
                                message: 'cart updated!',
                                data: cart
                            });
                        });
                    });
            });
        });
};
