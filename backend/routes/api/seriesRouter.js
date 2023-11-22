const router = require('express').Router();
const seriesController = require('../../controllers/seriesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(seriesController.getSeries);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(seriesController.postSeries);

router.route('/admin/:id')
    .put(seriesController.updateSeriesDetails);

module.exports = router;