const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig');
const morgan = require('morgan');
const verifyJWT = require('./middleware/verifyJWT');
const isAdmin = require('./middleware/isAdmin');

const PORT = process.env.PORT || 3101;

app.use(cors(corsConfig));
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

// Public routes: Routes which can be accessed by anyone using the application
app.use('/api/ratings', require('./routes/api/ratingsRouter'));
app.use('/api/languages', require('./routes/api/languagesRouter'));
app.use('/api/age_ratings', require('./routes/api/ageRatingsRouter'));
app.use('/api/countries', require('./routes/api/countriesRouter'));
app.use('/api/series', require('./routes/api/seriesRouter'));
app.use('/api/categories', require('./routes/api/categoriesRouter'));
app.use('/api/authors', require('./routes/api/authorsRouter'));
app.use('/api/genres', require('./routes/api/genresRouter'));
app.use('/api/companies', require('./routes/api/companiesRouter'));
app.use('/api/subcategories', require('./routes/api/subcategoriesRouter'));
app.use('/api/colors', require('./routes/api/colorsRouter'));
app.use('/api/sizes', require('./routes/api/sizesRouter'));
app.use('/api/materials', require('./routes/api/materialsRouter'));
app.use('/api/covers', require('./routes/api/coversRouter'));
app.use('/api/products', require('./routes/api/productsRouter'));
app.use('/api/anouncements', require('./routes/api/anouncementsRouter'));
app.use('/api/comments', require('./routes/api/commentsRouter'));
app.use('/api/signup', require('./routes/api/signupRouter'));
app.use('/api/users', require('./routes/api/usersRouter'));
app.use('/api/auth', require('./routes/api/authRouter'));

// User routes: Routes which can only be accessed by users regardless of their role
app.use(verifyJWT);
app.use('/api/orders', require('./routes/api/ordersRouter'));

// Administrator routes: Routes which can only be accessed by administrators
app.use(isAdmin);
app.use('/api/clothes', require('./routes/api/clothesRouter'));
app.use('/api/collectibles', require('./routes/api/collectiblesRouter'));
app.use('/api/comics', require('./routes/api/comicsRouter'));

app.listen(PORT, () => {
    console.log(`Running on port: ${PORT}`);
});