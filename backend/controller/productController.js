// Import product model
Product = require('../models/productModel');

// Handle index actions
exports.viewall = function (req, res) {
    Product.get(function (err, products) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Products retrieved successfully",
            data: products
        });
    });
};

// Handle create product actions
exports.create = function (req, res) {
    var product = new Product();
    product.displayName = req.body.displayName;
    product.shortDesc = req.body.shortDesc;
    product.desc = req.body.desc;
    product.category = req.body.category;
    product.price = req.body.price;
    product.image = req.body.image;
    product.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New product created!',
            data: product
        });
    });
};

// Handle view product info
exports.view = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            message: 'Product details retrieved',
            data: product
        });
    });
};

// Handle update product info
exports.update = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        product.displayName = req.body.displayName;
        product.shortDesc = req.body.shortDesc;
        product.desc = req.body.desc;
        product.category = req.body.category;
        product.price = req.body.price;
        product.image = req.body.image;
        // save the product and check for errors
        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Product Info updated',
                data: product
            });
        });
    });
};

// Handle delete product
exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Product deleted'
        });
    });
};