const router = require('express').Router();
const genresController = require('../../controllers/genresController');
const verifyJWT = require('../../middleware/verifyJWT');
const isAdmin = require('../../middleware/isAdmin');

// Public routes
router.route('/')
    .get(genresController.getGenres);

// Administrator routes
router.use(verifyJWT);
router.use(isAdmin);

router.route('/admin')
    .post(genresController.postGenre);
    
router.route('/admin/:id')
    .put(genresController.updateGenreDetails);

module.exports = router;