const router = require('express').Router();
const anouncementsController = require('../../controllers/anouncementsController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(anouncementsController.getAnouncements);

router.route('/:id')
    .get(anouncementsController.getAnouncements)

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(anouncementsController.postAnouncement);

router.route('/admin/:id')
    .put(anouncementsController.updateAnouncementDetails);
    
router.route('/admin/images/:id')
    .put(anouncementsController.upload.array("image"), anouncementsController.updateAnouncementImages);

module.exports = router;