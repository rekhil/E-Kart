Cart = require('../models/cartModel');
Product = require('../models/productModel');
Account = require('../models/accountModel');
CartItem = require('../models/cartItemModel');

//add new product to cart -- add cart if cart_id is null, add to cart item, update price details in cart
//delete product from cart -- remove from cart item, update price details in cart
//update quantity in cart -- update cart item, update price details in cart
//get cart details by accountId, guestId
//get distint item count from cart
//delete cart details by accountId

//accountId
//guestId
//productId
//quantity
//price
//offerPrice
//deliveryCharges

//totalPrice
//deliveryCharges
//billAmount (totalPrice + deliveryCharges)

exports.create = function (req, res) {
    CartItem.findOne({ 'product': req.body.productId, 'guest': req.body.guestId }, function (err, cartitem) {
        if (err)
            res.json(err);
        if (!cartitem)
            cartitem = new CartItem();
        cartitem.product = req.body.productId;
        if (!cartitem.quantity)
            cartitem.quantity = 0
        cartitem.quantity += req.body.quantity;
        cartitem.price = req.body.price;
        cartitem.offerPrice = req.body.offerPrice;
        cartitem.deliveryCharge = req.body.deliveryCharge;
        cartitem.account = req.body.accountId;
        cartitem.guest = req.body.guestId;
        cartitem.save(function (err) {
            if (err)
                res.json(err);
            Cart.findOne({ 'guest': req.body.guestId }, function (err, cart) {
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
                            res.json({
                                status: "success",
                                message: 'Cart updated!',
                                data: cart
                            });
                        });
                    });
                }
            });
        });
    });
};
