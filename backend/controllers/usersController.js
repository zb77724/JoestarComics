const pool = require('../dbConnectionPool');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const multer = require('multer');

const baseURL = `http://localhost:${process.env.PORT}/images/users/`;
const basePath = path.join(__dirname, '..', 'public', 'images', 'users');
const defaultPfp = "perfecthuman.jpeg";

// Configure middleware for image processing & storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, basePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// Create an instance of multer
const upload = multer({ storage: storage });

// Auxiliary function that returns data without sending a response
const returnUsers = (field, data) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (field === "username") {
            // Get the row with the specified username
            sql = `SELECT * FROM users WHERE username = "${data}";`;
        } else if (field === "id") {

            data = parseInt(data);

            // Get the row with the specified ID
            sql = `SELECT * FROM users WHERE id = ${data};`;
            
        }  else {
            // Get all rows
            sql = `SELECT * FROM users;`;
        }

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    if (rows.length > 0) {

                        // Initialize an array storing the relevant data from each row
                        const users = rows.map(({ id, username, role, email, pfp_path }) => ({ id, username, role, email, pfp_path: path.join(baseURL, pfp_path) }));

                        return resolve({ status: 200, users });

                    } else {
                        return reject({ status: 500, msg: "No users found" });
                    }
                    
                } else {
                    console.log(err);
                    return reject({ status: 500, msg: "Operation failed" });
                }

            });
        });

    });

};

// Auxiliary function that returns data without sending a response
const returnUserPassword = (id) => {
    
    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        // Obtain the password associated with the given user ID
        const sql = `SELECT password FROM users WHERE id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    const { password } = rows[0];

                    return resolve(password);

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }

            });

        });

    });

};

// Primary function which sends a response containing all requested data
const getUsers = (req, res) => {

    // Send a response according to the given data
    if (req.params.id) {

        // Obtain the ID from the request parameters
        let { id } = req.params;
        id = parseInt(id);

        // Get a specific row from auxiliary function
        returnUsers("id", id)
        .then(({ status, users }) => {
            // send the data in the response
            return res.status(status).json({ users });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });

    } else {
        // Get all rows from auxiliary function
        returnUsers()
        .then(({ status, users }) => {
            // send the data in the response
            return res.status(status).json({ users });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });
    }

};

// Primary function which creates new rows in the corresponding tables
const createUser = async (req, res) => {

    // Check if required data was provided
    if(!req.body.username || !req.body.password || !req.body.email) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { username, password, email } = req.body;

    // Check if the given password is invalid
    if (password.includes(" ")) {
        return res.status(400).json({ "message": "Invalid password" });
    }

    // Check the username's availability
    try {
        await isUsernameAvailable(username);
    } catch ({ status, msg }) {
        return res.status(status).json({ "message": msg });
    }
    

    // // Encrypt the given password
    password = await bcrypt.hash(password, 10);

    // Create a new row with the given data
    sql = `INSERT INTO users (username, password, email, pfp_path) VALUES (?, ?, ?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [username, password, email, defaultPfp], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "User created successfully"});
            } else {
                console.log(err);
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which creates new rows in the corresponding tables
const createUserAdmin = async (req, res) => {

    // Check if required data was provided
    if(!req.body.username || !req.body.role || !req.body.password || !req.body.email) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { username, role, password, email } = req.body;

    if (role !== "admin" && role !== "customer") {
        return res.status(400).json({ "message": "Invalid role provided" });
    }

    // Check if the given password is invalid
    if (password.includes(" ")) {
        return res.status(400).json({ "message": "Invalid password" });
    }

    // Check the username's availability
    try {
        await isUsernameAvailable(username);
    } catch ({ status, msg }) {
        return res.status(status).json({ "message": msg });
    }

    // Encrypt the given password
    password = await bcrypt.hash(password, 10);

    // Create a new row with the given data
    sql = `INSERT INTO users (username, role, password, email, pfp_path) VALUES (?, ?, ?, ?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [username, role, password, email, defaultPfp], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "User posted successfully"});
            } else {
                console.log(err);
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateUserDetails = async (req, res) => {

    // Check if required data was provided
    if (!req.user_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request
    const user_id = parseInt(req.user_id);

    // Check if a password has been provided
    if (req.body.password) {

        const { password } = req.body;

        // Change the user password
        try {

            await changeUserPassword(user_id, password);

            return res.sendStatus(204);

        } catch ({ status, msg }) {
            return res.status(status).json({ "message": msg });
        }

    }

    // Check if required data was provided
    if (!req.body.username && !req.body.role && !req.body.email) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    let data;
    let sql;

    // Formulate the query based on provided data
    if (req.body.username) {

        data = req.body.username;

        // Check if the username is available
        try {
            await isUsernameAvailable(data);
        } catch ({ status, msg }) {
            return res.status(status).json({ "message": msg });
        }

        // Update the specified column with the given data
        sql = `UPDATE users SET username = ? WHERE id = ?;`;

    } else if (req.body.role) {

        data = req.body.role;

        // Update the specified column with the given data
        sql = `UPDATE users SET role = ? WHERE id = ?;`;

    } else {

        data = req.body.email;

        // Update the specified column with the given data
        sql = `UPDATE users SET email = ? WHERE id = ?;`;

    }

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [data, user_id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.sendStatus(204);
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });

    });

};

// Auxiliary function which updates the corresponding rows
const changeUserPassword = async (user_id, password) => {

    return new Promise((resolve, reject) => {
        // Check if required data was provided
        if (!user_id || !password) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        (async () => {

            // Encrypt the given password
            password = await bcrypt.hash(password, 10);

            // Update the corresponding rows with the given data
            const sql = `UPDATE users SET password = ? WHERE id = ?;`;

            pool.getConnection((err, conn) => {

                if (err) {
                    return reject({ status: 500, msg: "Connection failed" });
                }

                // Perform the database query
                conn.query(sql, [password, user_id], (err, rows) => {
                    if (!err) {
                        return resolve({ status: 204 });
                    } else {
                        return reject({ status: 500, msg: "Operation failed" });
                    }
                });

            });
        })();

    });

};

// Auxiliary function which performs data checks
const isUsernameAvailable = async (username) => {

    let response;

    try {

        response = await returnUsers("username", username);

    } catch {
        return { status: 204 };
    }

    if (response.users.length > 0) {
        throw { status: 400, msg: "Username not available" };
    }

};

// Primary function which updates the images associated with the provided ID
const updateUserPfp = async (req, res) => {

    // Check if required data was provided
    if (!req.user_id || !req.file) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request
    let id = parseInt(req.user_id);

    // Obtain the new profile picture from the given file
    const new_pfp = req.file.filename;

    // Obtain the user with the specified ID
    const { users } = await returnUsers("id", id);

    // Check if the user with the given ID exists
    if (!users[0]) {
        return res.status(400).json({ "message": "The given user doesn't exist" });
    }

    // Obtain the pfp path from the given user
    let { pfp_path } = users[0];

    // Get the filename of the provided pfp
    pfp_path = path.basename(pfp_path);

    // Check if the user's pfp exists & is unique
    if (pfp_path && pfp_path !== defaultPfp) {

        // Get the pfp's full path
        pfp_full_path = path.join(basePath, pfp_path);

        // Remove the current pfp from the file system
        fs.unlink(pfp_full_path, (err) => {
            if (err) {
                return console.log(`File deletion failed for: ${pfp_path}`);
            }
            console.log(`Deleted: ${pfp_full_path}`);
        });

    }
    
    // Update the given user's pfp
    const sql = `UPDATE users SET pfp_path = ? WHERE id = ?;`;
    
    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [new_pfp, id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.sendStatus(204);
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Export all functions 
module.exports = {
    returnUsers,
    returnUserPassword,
    getUsers,
    createUser,
    createUserAdmin,
    updateUserDetails,
    changeUserPassword,
    updateUserPfp,
    isUsernameAvailable,
    upload
};