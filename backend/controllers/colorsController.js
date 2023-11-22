const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnColors = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM colors WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM colors;`;
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
                    const colors = rows.map(({ id, name }) => ({ id, name }));

                    return resolve({ status: 200, colors });

                } else {
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Primary function which sends a response containing all requested data
const getColors = (req, res) => {

    // Get all rows from auxiliary function
    returnColors()
    .then(({ status, colors }) => {
        // send the data in the response
        return res.status(status).json({ colors });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });

};

// Primary function which creates new rows in the corresponding tables
const postColor = (req, res) => {

    // Check if required data was provided
    if(!req.body.name) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO colors (name) VALUES (?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Color posted successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateColorDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.name) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    // Obtain data from the request body
    let { name } = req.body;

    // Update the specified column with the given data
    sql = `UPDATE colors SET name = ? WHERE id = ?;`;

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
const returnClothingColors = (item_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!item_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        item_id = parseInt(item_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM clothing_colors WHERE item_id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [item_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const colors = await Promise.all(rows.map(async ({ color_id }) => {

                            // Fetch the rows with the given ID
                            const { colors } = await returnColors(color_id);

                            return colors[0];

                        }));

                        return resolve({ status: 200, colors });

                    })();

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Auxiliary function which updates the rows associated with the provided ID
const updateClothingColors = async (res, item_id, color_ids) => {

    // Check if required data was provided
    if (!item_id || !color_ids) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }
    
    item_id = parseInt(item_id);

    // Make an asynchronous call to an auxiliary function to get required data
    const response = await returnClothingColors(item_id);

    let new_colors;
    
    return new Promise((resolve, reject) => {

        // Check if there are any rows associated with the given ID
        if (response.colors) {

            // Destructure the rows associated with the given ID
            let { colors } = response;

            // Initialize an array to store the IDs of all rows associated to the given ID
            const current_colors = colors.map(({ id }) => id);
            
            // Initialize an array to store the IDs of all rows not already associated with the given ID
            new_colors = color_ids.filter((ncid) => !current_colors.includes(ncid));

            // Initialize an array to store the IDs of all rows not included within the given array
            const unlinked_colors = current_colors.filter((ccid) => !color_ids.includes(ccid));

            // If any, then for each unlinked row, delete it from the db & the file system
            if (unlinked_colors.length > 0) {

                // Delete the respective rows
                let sql = `DELETE FROM clothing_colors WHERE color_id = ?;`;

                unlinked_colors.forEach((ucid) => {

                    pool.getConnection((err, conn) => {

                        if (err) {
                            return reject({ status: 500, msg: "Connection failed" });
                        }

                        // Perform the database query
                        conn.query(sql, [ucid], (err, rows) => {

                            // Release the connection
                            conn.release();

                            if (err) {
                                return reject({ status: 500, msg: "Operation failed" });
                            }

                        });
                    });

                });

            }
        } else {

            new_colors = color_ids;

        }



        // Create a new row with the provided data
        let sql = `INSERT INTO clothing_colors (item_id, color_id) VALUES (?, ?);`;
                
        // Insert a new row for each new color
        new_colors.forEach((ncid) => {
            pool.getConnection((err, conn) => {

                if (err) {
                    return reject({ status: 500, msg: "Connection failed" });
                }

                    // Perform the database query
                    conn.query(sql, [item_id, ncid], (err, rows) => {

                        // Release the connection
                        conn.release();

                        if (err) {
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
    returnColors,
    getColors,
    postColor,
    updateColorDetails,
    returnClothingColors,
    updateClothingColors
};