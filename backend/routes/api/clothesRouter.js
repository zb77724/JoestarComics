const router = require('express').Router();
const { updateCategoryDetails } = require('../../controllers/clothesController');

router.put('/:id', updateCategoryDetails);

module.exports = router;