const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnRatings = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        product_id = parseInt(product_id);

        let sql;

        // Formulate the query based on provided input
        if (product_id) {

            product_id = parseInt(product_id);

            // Get the row with the specified ID
            sql = `SELECT * FROM ratings WHERE product_id = ${product_id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM ratings;`;
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
                    const ratings = rows.map(({ product_id, five_stars, four_stars, three_stars, two_stars, one_star }) => ({ product_id, five_stars, four_stars, three_stars, two_stars, one_star }));

                    return resolve({ status: 200, ratings });

                } else {
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Auxiliary function that creates a row with rating information when a product is created
const addRating = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        product_id = parseInt(product_id);

        // Create a new row with the given data
        const sql = `INSERT INTO ratings (product_id, five_stars, four_stars, three_stars, two_stars, one_star) VALUES (?, ?, ?, ?, ?, ?);`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id, 0, 0, 0, 0, 0], (err, rows) => {
                console.log(err);

                // Release the connection
                conn.release();

                if(!err) {
                    return resolve({ status: 201, msg: "Rating added successfully" });
                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }

            });

        });

    });

};

// Primary function which updates the corresponding rows
const updateRating = (req, res) => {

    // Check if required data was provided
    if (!req.params.id ||
        !req.body.five_stars && 
        !req.body.four_stars &&
        !req.body.three_stars &&
        !req.body.two_stars &&
        !req.body.one_star) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request parameters
    let id = parseInt(req.params.id);

    let sql;

    // Formulate the query based on provided data
    if (req.body.five_stars) {

        if (req.body.five_stars === 1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET five_stars = five_stars + 1 WHERE product_id = ? AND five_stars >= 0;`;
        } else if (req.body.five_stars === -1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET five_stars = five_stars - 1 WHERE product_id = ? AND five_stars > 0;`;
        } else {
            return res.status(400).json({ "message": "Invalid score value" })
        }

    } else if (req.body.four_stars) {

        if (req.body.four_stars === 1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET four_stars = four_stars + 1 WHERE product_id = ? AND four_stars >= 0;`;
        } else if (req.body.four_stars === -1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET four_stars = four_stars - 1 WHERE product_id = ? AND four_stars > 0;`;
        } else {
            return res.status(400).json({ "message": "Invalid score value" })
        }

    } else if (req.body.three_stars) {

        if (req.body.three_stars === 1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET three_stars = three_stars + 1 WHERE product_id = ? AND three_stars >= 0;`;
        } else if (req.body.three_stars === -1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET three_stars = three_stars - 1 WHERE product_id = ? AND three_stars > 0;`;
        }  else {
            return res.status(400).json({ "message": "Invalid score value" })
        }

    } else if (req.body.two_stars) {

        if (req.body.two_stars === 1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET two_stars = two_stars + 1 WHERE product_id = ? AND two_stars >= 0;`;
        } else if (req.body.two_stars === -1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET two_stars = two_stars - 1 WHERE product_id = ? AND two_stars > 0;`;
        }  else {
            return res.status(400).json({ "message": "Invalid score value" })
        }

    } else {

        if (req.body.one_star === 1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET one_star = one_star + 1 WHERE product_id = ? AND one_star >= 0;`;
        } else if (req.body.one_star === -1) {
            // Update the specified column with the given data
            sql = `UPDATE ratings SET one_star = one_star - 1 WHERE product_id = ? AND one_star > 0;`;
        }  else {
            return res.status(400).json({ "message": "Invalid score value" })
        }

    }

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                console.log(rows);
                return res.sendStatus(204);
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });

    });

};

// Auxiliary function which calculates a product's average rating
const calculateAverageRating = async (res, product_id) => {

    // Check if required data was provided
    if (!product_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Make an asynchronous call to an auxiliary function to get required data
    const response = await returnRatings(product_id);

    return new Promise((resolve, reject) => {

        // Check if there are any rows associated with the given ID
        if (!response.ratings) {
            return reject({ status: 400, msg: "No associations found" });
        }

        const productRating = response.ratings[0];

        // Destructures rating information from the rating object
        const { five_stars, four_stars, three_stars, two_stars, one_star } = productRating;

        // Calculates the total amount of reviews
        const reviewTotal = one_star + two_stars + three_stars + four_stars + five_stars;

        // Calculates the sum of the occurrences of each score value
        const starTotal = one_star + two_stars * 2 + three_stars * 3 + four_stars * 4 + five_stars * 5;

        // Calculates the average rating
        const averageRating = parseFloat((starTotal / reviewTotal).toFixed(2)); 

        return resolve({ status: 204, averageRating });

    });

};

module.exports = {
    returnRatings,
    addRating,
    updateRating,
    calculateAverageRating
};