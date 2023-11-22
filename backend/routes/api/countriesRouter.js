const router = require('express').Router();
const countriesController = require('../../controllers/countriesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(countriesController.getCountries);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(countriesController.postCountry);

router.route('/admin/:id')
    .put(countriesController.updateCountryDetails);

module.exports = router;