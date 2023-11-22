const router = require('express').Router();
const ratingsController = require('../../controllers/ratingsController');

router.put('/:id', ratingsController.updateRating);

module.exports = router;