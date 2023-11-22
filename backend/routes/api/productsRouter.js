const router = require('express').Router();
const productsController = require('../../controllers/productsController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(productsController.getProducts);

router.route('/:id')
    .get(productsController.getProducts)

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(productsController.postProduct);

router.route('/admin/:id')
    .put(productsController.updateProductDetails);

router.route('/admin/stock/:quantity')
    .put(productsController.resetStockProducts);
    
router.route('/admin/images/:id')
    .put(productsController.upload.array("image"), productsController.updateProductImages);

module.exports = router;