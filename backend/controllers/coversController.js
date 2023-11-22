const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnCovers = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM covers WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM covers;`;
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
                    const covers = rows.map(({ id, cover }) => ({ id, cover }));

                    return resolve({ status: 200, covers });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getCovers = (req, res) => {

    // Send a response according to the given data
    returnCovers()
    .then(({ status, covers }) => {
        // send the data in the response
        return res.status(status).json({ covers });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });
    
};

// Primary function which creates new rows in the corresponding tables
const postCover = (req, res) => {

    // Check if required data was provided
    if(!req.body.cover) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { cover } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO covers (cover) VALUES (?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [cover], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Cover added successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });
    });

};

// Primary function which updates the corresponding rows
const updateCoverDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.cover) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    // Obtain data from the request body
    let cover = req.body.cover;

    // Update the specified column with the given data
    let sql = `UPDATE covers SET cover = ? WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [cover, id], (err, rows) => {

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
    returnCovers,
    getCovers,
    postCover,
    updateCoverDetails
};