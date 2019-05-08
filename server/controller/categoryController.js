Category = require('../models/categoryModel');

exports.create = function (req, res) {
    var category = new Category();
    category.name = req.body.name;
    category.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: 'New category created!',
            data: category
        });
    });
};
