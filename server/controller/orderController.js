Order = require('../models/orderModel');
OrderProduct = require('../models/OrderProductModel');
Product = require('../models/productModel');

exports.create = function (req, res) {
    var order = new Order();
    order.items = [];
    order.totalPrice = req.body.totalPrice;
    order.deliveryCharges = req.body.deliveryCharges;
    order.billAmount = req.body.billAmount;
    order.date = req.body.date;
    order.email = req.body.email;

    order.save(function (err) {
        if (err)
            res.json(err);

        req.body.items.forEach(product => {
            var orderProduct = new OrderProduct();
            orderProduct.product = product.product;
            orderProduct.quantity = product.quantity;
            orderProduct.price = product.price;
            orderProduct.offerPrice = product.offerPrice;
            orderProduct.save(function (err) {
                if (err)
                    res.json(err);
                order.items.push(orderProduct._id)
                order.save(function (err) {
                    if (err)
                        res.json(err);
                    res.json({
                        status: "success",
                        message: 'New Order created!',
                        data: order
                    });
                });
            });
        });
    });
};