const router = require('express').Router();
const { createUser } = require('../../controllers/usersController');

router.post('/', createUser);

module.exports = router;