const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnSeries = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM series WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM series;`;
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
                    const series = rows.map(({ id, name }) => ({ id, name }));

                    return resolve({ status: 200, series });

                } else {
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Primary function which sends a response containing all requested data
const getSeries = (req, res) => {

    // Get all rows from auxiliary function
    returnSeries()
    .then(({ status, series }) => {
        // send the data in the response
        return res.status(status).json({ series });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });

};

// Primary function which creates new rows in the corresponding tables
const postSeries = (req, res) => {

    // Check if required data was provided
    if(!req.body.name) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO series (name) VALUES (?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Series posted successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateSeriesDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.name) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    // Obtain data from the request body
    let { name } = req.body;

    // Update the specified column with the given data
    sql = `UPDATE series SET name = ? WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name, id], (err, rows) => {

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

// Auxiliary function which returns all rows associated with the given ID
const returnCollaborations = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        product_id = parseInt(product_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM collaborations WHERE product_id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const series = await Promise.all(rows.map(async ({ series_id }) => {

                            // Fetch the rows with the given ID
                            const { series } = await returnSeries(series_id);

                            return series[0];

                        }));

                        return resolve({ status: 200, series });

                    })();

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Auxiliary function which updates the rows associated with the provided ID
const updateCollaborations = async (res, product_id, series_ids) => {

    // Check if required data was provided
    if (!product_id || !series_ids) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }
    
    product_id = parseInt(product_id);

    // Make an asynchronous call to an auxiliary function to get required data
    const response = await returnCollaborations(product_id);

    let new_series;
    
    return new Promise((resolve, reject) => {

        // Check if there are any rows associated with the given ID
        if (response.series) {

            // Destructure the rows associated with the given ID
            let { series } = response;

            // Initialize an array to store the IDs of all rows associated to the given ID
            const current_series = series.map(({ id }) => id);
            
            // Initialize an array to store the IDs of all rows not already associated with the given ID
            new_series = series_ids.filter((ncid) => !current_series.includes(ncid));

            // Initialize an array to store the IDs of all rows not included within the given array
            const unlinked_series = current_series.filter((ccid) => !series_ids.includes(ccid));

            // If any, then for each unlinked row, delete it from the db & the file system
            if (unlinked_series.length > 0) {

                // Delete the respective rows
                let sql = `DELETE FROM collaborations WHERE series_id = ?;`;

                unlinked_series.forEach((ucid) => {

                    pool.getConnection((err, conn) => {

                        if (err) {
                            return reject({ status: 500, msg: "Connection failed" });
                        }

                        // Perform the database query
                        conn.query(sql, [ucid], (err, rows) => {

                            console.log(err);

                            // Release the connection
                            conn.release();

                            if (err) {
                                console.log(err);
                                return reject({ status: 500, msg: "Operation failed" });
                            }

                        });
                    });

                });

            }
        } else {

            new_series = series_ids;

        }



        // Create a new row with the provided data
        let sql = `INSERT INTO collaborations (product_id, series_id) VALUES (?, ?);`;
                
        // Insert a new row for each new series
        new_series.forEach((ncid) => {
            pool.getConnection((err, conn) => {

                if (err) {
                    return reject({ status: 500, msg: "Connection failed" });
                }

                    // Perform the database query
                    conn.query(sql, [product_id, ncid], (err, rows) => {
                        console.log(err);

                        // Release the connection
                        conn.release();

                        if (err) {
                            console.log(err);
                            console.log("error in collaborations: ", err);
                            return reject({ status: 500, msg: "Operation failed" });
                        }

                    });

                });
            });

            return resolve({ status: 204 });

    });

};

// Export all functions 
module.exports = {
    returnSeries,
    getSeries,
    postSeries,
    updateSeriesDetails,
    returnCollaborations,
    updateCollaborations
};