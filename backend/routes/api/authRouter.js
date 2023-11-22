const router = require('express').Router();
const authController = require('../../controllers/authController');

router.route('/signin')
    .post(authController.signIn);
    
router.route('/refresh')
    .post(authController.refreshAccessToken);

router.route('/logout')
    .post(authController.logout);

module.exports = router;