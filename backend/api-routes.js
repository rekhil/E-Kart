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


// Import product controller
var productController = require('./controller/productController');
// Product routes
router.route('/products')
    .get(productController.viewall)
    .post(productController.create);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);

// Export API routes
module.exports = router;