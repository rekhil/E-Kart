let router = require('express').Router();

router.get('/', function (req, res) {
    res.json(
        {
            status: 'Rest API Working',
            message: 'Welcome to E-kart Rest API!'
        });
});

var accountController = require('./controller/accountController');
router.route('/account')
    .post(accountController.create);

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

var cartController = require('./controller/cartController');
router.route('/cart')
    .post(cartController.create);
router.route('/cart/:guestId/count')
    .get(cartController.viewCount);
router.route('/cart/:guestId')
    .get(cartController.view);
router.route('/cartitem/:cartItemId')
    .delete(cartController.delete);
router.route('/cartitem/:cartItemId')
    .post(cartController.update);

var wishlistController = require('./controller/wishlistController');
router.route('/wishlist')
    .post(wishlistController.create);
router.route('/wishlist/:accountId')
    .get(wishlistController.view);

module.exports = router;