let router = require('express').Router();

router.get('/', function (req, res) {
    res.json(
        {
            status: 'Rest API Working',
            message: 'Welcome to E-kart Rest API!'
        });
});

var accountController = require('./controller/accountController');
router.route('/account/profile')
    .post(accountController.register)
    .put(accountController.updateProfile);
router.route('/account/login')
    .post(accountController.login);

var productController = require('./controller/productController');
router.route('/products')
    .get(productController.viewall)
    .post(productController.create);
router.route('/products/search')
    .post(productController.searchByText);
router.route('/products/deals')
    .get(productController.getDeals);
router.route('/products/recommendations')
    .get(productController.getRecommendations);
router.route('/products/:product_id')
    .get(productController.view)
    .patch(productController.update)
    .put(productController.update)
    .delete(productController.delete);

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
    .delete(cartController.delete)
    .put(cartController.update);

var wishlistController = require('./controller/wishlistController');
router.route('/wishlist')
    .post(wishlistController.create)
    .get(wishlistController.view);
router.route('/wishlist/:productId')
    .delete(wishlistController.delete);

var orderController = require('./controller/orderController');
router.route('/order')
    .post(orderController.create)

module.exports = router;