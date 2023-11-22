const router = require('express').Router();
const { updateCategoryDetails } = require('../../controllers/comicsController');

router.put('/:id', updateCategoryDetails);

module.exports = router;