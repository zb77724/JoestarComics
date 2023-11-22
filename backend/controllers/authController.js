const pool = require('../dbConnectionPool');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usersController = require('./usersController');

// Auxiliary function which asynchronously verifies a user's password
const verifyPassword = async (res, password, given_password) => {

    // Check if required data was provided
    if (!password || !given_password) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Compare the given password against the original password
    const match = await bcrypt.compare(given_password, password);

    return match;

};

// Primary function which authenticates users & generates tokens to autorize future interactions
const signIn = async (req, res) => {
    
    // Check if required data was provided
    if(!req.body.username || !req.body.password) {
        return res.status(400).json({ "mensaje": "Required data was not provided" });
    }

    // Obtain data from the request body
    const { username, password: given_password } = req.body;

    let response;
    
    try {
        // Get the user with the given username
        response = await usersController.returnUsers("username", username);
    } catch ({ status, msg }) {
        return res.status(status).json({ "message": msg });
    }

    // Destructure the referenced user's information
    const { id, role } = response.users[0];

    let password;

    try {
        // Obtain the referenced user's password
        password = await usersController.returnUserPassword(id);
    } catch ({ status, msg }) {
        return res.status(status).json({ "message": msg });
    }

    // Verify the given password
    const match = await verifyPassword(res, password, given_password);
                
    // Check if the passwords match
    if (!match) {
        return res.status(400).json({ "message": "Incorrect password" });
    }

    // Generate access token
    const access_token = jwt.sign(
        { 
            "user_info": {
                "user_id": id,
                "role": role
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );

    // Generate refresh token
    const refresh_token = jwt.sign(
        { 
            "user_info": {
                "user_id": id,
                "role": role
            }
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    );

    // Store the refresh token in the database
    sql = `UPDATE users SET refresh_token = ? WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            console.log(err);
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [refresh_token, id], (err, rows) => {
            if (!err) {

                // Create an httpOnly cookie to store the refresh token
                res.cookie('jwt', refresh_token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

                return res.status(200).json({ "user_id": id, role, access_token });

            } else {
                console.log(err);
                return res.status(500).json({ "message": "Operation failed" });
            }
        });

    });

};

// Primary function which generates new access tokens
const refreshAccessToken = (req, res) => {

    // Obtains the request cookies
    const cookies = req.cookies;

    // Check if the cookie storing the refresh token was provided
    if(!cookies?.jwt) {
        return res.status(401).json({ "mensaje": "Refresh token doesn't exist" });
    }

    // Obtain the refresh token from the request cookies
    const refresh_token = cookies.jwt;

    // Get the user with the given refresh token
    let sql = `SELECT * FROM users WHERE refresh_token = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [refresh_token], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                if (rows.length > 0) {

                    // Obtain the associated user's data
                    const { id } = rows[0];

                    // Verify refresh token
                    jwt.verify(
                        refresh_token,
                        process.env.REFRESH_TOKEN_SECRET,
                        (err, decoded) => {

                            if(err || id !== decoded.user_info.user_id) {
                                return res.status(401).json({ "message": "Invalid Token" });
                            }
                            
                            // Obtain data from decoded user information
                            const role = decoded.user_info.role;
                            const access_token = jwt.sign(
                                { 
                                    "user_info": {
                                        "user_id": decoded.user_info.user_id,
                                        "role": role
                                    }
                                },
                                process.env.ACCESS_TOKEN_SECRET,
                                { expiresIn: '1h' }
                            );

                            const user_id = decoded.user_info.user_id;

                            return res.status(200).json({ user_id, role, access_token });
                        }
                    );

                } else {
                    return res.status(403).json({ "message": "Invalid refresh token" });
                }
            } else {
                console.log(err);
                return res.status(500).json({ "message": "Operation failed" });
            }
        });

    });

};

// Eliminates the refresh token, preventing further access until signing in again
const logout = (req, res) => {

   // Obtains the request cookies
    const cookies = req.cookies;

    // Check if the cookie storing the refresh token was provided
    if(!cookies?.jwt) {
        return res.status(204).json({ "mensaje": "Refresh token doesn't exist" });
    }
    
    // Obtain the refresh token from the request cookies
    const refresh_token = cookies.jwt;

    // Delete the refresh token from the database
    let sql = `UPDATE users SET refresh_token = ? WHERE refresh_token = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [null, refresh_token], (err, rows) => {

            // Release the connection
            conn.release();
            
            if (err) {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

        // Eliminate the cookie storing the refresh token
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.status(200).json({ "message": "Refresh token deleted successfully" });

    });

};

module.exports = {
    signIn,
    refreshAccessToken,
    logout
};