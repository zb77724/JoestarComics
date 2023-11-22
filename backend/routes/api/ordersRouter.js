const router = require('express').Router();
const ordersController = require('../../controllers/ordersController');
const isAdmin = require('../../middleware/isAdmin');

// User routes
router.route('/')
    .get(ordersController.getOrders)
    .post(ordersController.postOrder);

router.route('/:id')
    .get(ordersController.getOrders);

// Administrator routes
router.use(isAdmin);

router.route('/admin/:id')
    .put(ordersController.updateOrderState);

module.exports = router;