const router = require('express').Router();
const commentsController = require('../../controllers/commentsController');
const verifyJWT = require('../../middleware/verifyJWT');

// Public routes
router.route('/')
    .get(commentsController.getComments)

router.route('/:id')
    .put(commentsController.updateCommentVotes)

// User routes
router.use(verifyJWT);

router.route('/user')
    .post(commentsController.postComment);

router.route('/user/:id')
    .put(verifyJWT, commentsController.updateCommentDetails)
    .delete(verifyJWT, commentsController.deleteComment);

module.exports = router;