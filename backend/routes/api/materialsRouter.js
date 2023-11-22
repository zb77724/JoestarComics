const router = require('express').Router();
const materialsController = require('../../controllers/materialsController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public Routes
router.route('/')
    .get(materialsController.getMaterials);
    
// Administrator Routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(materialsController.postMaterial);

router.route('/admin/:id')
    .put(materialsController.updateMaterialDetails);

module.exports = router;