const router = require('express').Router();
const colorsController = require('../../controllers/colorsController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(colorsController.getColors) 

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(isAdmin, colorsController.postColor);

router.route('/admin/:id')
    .put(isAdmin, colorsController.updateColorDetails);

module.exports = router;