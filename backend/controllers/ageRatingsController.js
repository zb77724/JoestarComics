const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnAgeRatings = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM age_ratings WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM age_ratings;`;
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

                    // Initialize an array storing the relevant data from each row
                    const age_ratings = rows.map(({ id, age_rating }) => ({ id, age_rating }));

                    return resolve({ status: 200, age_ratings });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getAgeRatings = (req, res) => {

    // Send a response according to the given data
    returnAgeRatings()
    .then(({ status, age_ratings }) => {
        // send the data in the response
        return res.status(status).json({ age_ratings });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });
    
};

// Primary function which creates new rows in the corresponding tables
const postAgeRating = (req, res) => {

    // Check if required data was provided
    if(!req.body.age_rating) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { age_rating } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO age_ratings (age_rating) VALUES (?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [age_rating], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Age rating added successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });
    });

};

// Primary function which updates the corresponding rows
const updateAgeRatingDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.age_rating) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    // Obtain data from the request body
    let age_rating = req.body.age_rating;

    // Update the specified column with the given data
    let sql = `UPDATE age_ratings SET age_rating = ? WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [age_rating, id], (err, rows) => {

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
    returnAgeRatings,
    getAgeRatings,
    postAgeRating,
    updateAgeRatingDetails
};