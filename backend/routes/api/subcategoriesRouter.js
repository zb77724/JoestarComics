const router = require('express').Router();
const subcategoriesController = require('../../controllers/subcategoriesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(subcategoriesController.getSubcategories);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(isAdmin, subcategoriesController.postSubcategory);

router.route('/admin/:id')
    .put(isAdmin, subcategoriesController.updateSubcategoryDetails);

module.exports = router;