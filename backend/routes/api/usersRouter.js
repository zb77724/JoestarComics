const router = require('express').Router();
const usersController = require('../../controllers/usersController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/:id')
    .get(usersController.getUsers);

// User routes
router.use(verifyJWT);

router.route('/')
    .put(usersController.updateUserDetails);

router.route('/images')
    .put(usersController.upload.single('pfp'), usersController.updateUserPfp);

// Administrator routes
router.use(isAdmin);

router.route('/admin')
    .post(usersController.createUserAdmin);

module.exports = router;