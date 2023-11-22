const router = require('express').Router();
const sizesController = require('../../controllers/sizesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(sizesController.getSizes);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(sizesController.postSize);

router.route('/admin/:id')
    .put(sizesController.updateSizeDetails);

module.exports = router;