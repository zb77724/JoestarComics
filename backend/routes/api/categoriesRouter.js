const router = require('express').Router();
const categoriesController = require('../../controllers/categoriesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(categoriesController.getCategories);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(categoriesController.postCategory);

router.route('/admin/:id')
    .put(categoriesController.updateCategoryDetails);

module.exports = router;