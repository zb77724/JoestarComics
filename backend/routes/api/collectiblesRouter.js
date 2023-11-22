const router = require('express').Router();
const { updateCategoryDetails } = require('../../controllers/collectiblesController');

router.put('/:id', updateCategoryDetails);

module.exports = router;