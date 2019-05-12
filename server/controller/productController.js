Product = require('../models/productModel');
Review = require('../models/reviewModel');

exports.viewall = function (req, res) {
    Product.find()
        .populate('category')
        .populate('review')
        .exec(function (err, products) {
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

exports.getDeals = function (req, res) {
    var today = new Date();
    Product.find({ 'deals.date': { $eq: `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}` } })
        .populate('category')
        .populate('review')
        .exec(function (err, products) {
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

exports.getRecommendations = function (req, res) {
    Product.find()
        .populate('category')
        .populate('review')
        .exec(function (err, products) {
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

exports.searchByText = function (req, res) {
    Product.find({
        $or: [
            { displayName: { $regex: '.*' + req.body.searchText + '.*', $options: 'i' } },
            { shortDesc: { $regex: '.*' + req.body.searchText + '.*', $options: 'i' } },
            { desc: { $regex: '.*' + req.body.searchText + '.*', $options: 'i' } }
        ]
    })
        .populate('category')
        .populate('review')
        .exec(function (err, products) {
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

exports.create = function (req, res) {
    var product = new Product();
    product.image = req.body.image;
    product.displayName = req.body.displayName;
    product.shortDesc = req.body.shortDesc;
    product.desc = req.body.desc;
    product.price = req.body.price;
    product.discount = req.body.discount;
    product.offerPrice = req.body.offerPrice;
    product.deliveryCharge = req.body.deliveryCharge;
    product.avgRating = req.body.avgRating;
    product.category = req.body.category;
    product.deals = [];
    product.reviews = [];
    product.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            status: "success",
            message: 'New product created!',
            data: product
        });
    });
};

exports.view = function (req, res) {
    Product.findById(req.params.product_id)
        .populate('category')
        .populate('review')
        .exec(function (err, product) {
            if (err)
                res.send(err);
            res.json({
                status: "success",
                message: 'Product details retrieved',
                data: product
            });
        });
};

exports.update = function (req, res) {
    Product.findById(req.params.product_id, function (err, product) {
        if (err)
            res.send(err);
        product.image = req.body.image;
        product.displayName = req.body.displayName;
        product.shortDesc = req.body.shortDesc;
        product.desc = req.body.desc;
        product.price = req.body.price;
        product.discount = req.body.discount;
        product.offerPrice = req.body.offerPrice;
        product.deliveryCharge = req.body.deliveryCharge;
        product.avgRating = req.body.avgRating;
        product.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                status: "success",
                message: 'Product Info updated',
                data: product
            });
        });
    });
};

exports.delete = function (req, res) {
    Product.remove({
        _id: req.params.product_id
    }, function (err, product) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Product deleted',
            data: req.params.product_id
        });
    });
};