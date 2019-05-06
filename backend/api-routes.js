// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json(
        {
            status: 'Rest API Working',
            message: 'Welcome to E-kart Rest API!'
        });
});

var productController = require('./controller/productController');
router.route('/products')
    .get(productController.viewall)
    .post(productController.create);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);

var dealsController = require('./controller/dealsController');
router.route('/deals')
    .post(dealsController.create);

var categoryController = require('./controller/categoryController');
router.route('/categories')
    .post(categoryController.create);

// Export API routes
module.exports = router;