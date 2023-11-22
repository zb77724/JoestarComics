const router = require('express').Router();
const languagesController = require('../../controllers/languagesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public Routes
router.route('/')
    .get(languagesController.getLanguages);
    
// Administrator Routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(languagesController.postLanguage);

router.route('/admin/:id')
    .put(languagesController.updateLanguageDetails);

module.exports = router;