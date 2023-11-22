const router = require('express').Router();
const authorsController = require('../../controllers/authorsController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(authorsController.getAuthors);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(authorsController.postAuthor);
    
router.route('/admin/:id')
    .put(authorsController.updateAuthorDetails);

module.exports = router;