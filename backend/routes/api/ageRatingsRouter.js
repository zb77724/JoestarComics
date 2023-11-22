const router = require('express').Router();
const ageRatingsController = require('../../controllers/ageRatingsController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(ageRatingsController.getAgeRatings);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(ageRatingsController.postAgeRating);
    
router.route('/admin/:id')
    .put(ageRatingsController.updateAgeRatingDetails);

module.exports = router;