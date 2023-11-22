const router = require('express').Router();
const companiesController = require('../../controllers/companiesController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(companiesController.getCompanies);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(companiesController.postCompany);

router.route('/admin/:id')
    .put(companiesController.updateCompanyDetails);

module.exports = router;