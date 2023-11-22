const jwt = require('jsonwebtoken'); // Requerido para utilizar json web tokens
require('dotenv').config(); // Requerido para utilizar variables de entorno

// Middleware function which verifies access token's integrity
const verifyJWT = (req, res, next) => {

    // Obtain the authorization header from the request
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if the provided authorization header is valid
    if(!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ "message": "Access denied" });
    } 

    // Obtain the access token from the authorization header
    const access_token = authHeader.split(' ')[1];

    // Verify that the given access token is not malformed
    jwt.verify(
        access_token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {

            if (err) {
                return res.status(403).json({ "message": "Invalid token"});
            }

            // Initialize new properties in the request
            req.user_id = decoded.user_info.user_id
            req.role = decoded.user_info.role;
            
            next();

        }
    );

};

// Export the middleware function
module.exports = verifyJWT;