const router = require('express').Router();
const coversController = require('../../controllers/coversController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(coversController.getCovers);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(coversController.postCover);
    
router.route('/admin/:id')
    .put(coversController.updateCoverDetails);

module.exports = router;