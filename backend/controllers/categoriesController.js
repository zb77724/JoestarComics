const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnCategories = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM categories WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM categories;`;
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
                    const categories = rows.map(({ id, name }) => ({ id, name }));

                    return resolve({ status: 200, categories });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getCategories = (req, res) => {

    // Send a response according to the given data
    returnCategories()
    .then(({ status, categories }) => {
        // send the data in the response
        return res.status(status).json({ categories });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });
    
};

// Primary function which creates new rows in the corresponding tables
const postCategory = (req, res) => {

    // Check if required data was provided
    if(!req.body.name) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO categories (name) VALUES (?);`;


    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                
                return res.status(201).json({ "message": "Category added successfully"});
                
            } else {
                
                // End the connection
                conn.end();
                
                return res.status(500).json({ "message": "Operation failed" });
                
            }
            
        });
    });

};

// Primary function which updates the corresponding rows
const updateCategoryDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.name) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    // Obtain data from the request body
    let name = req.body.name;

    // Update the specified column with the given data
    let sql = `UPDATE categories SET name = ? WHERE id = ?;`;

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

// Export all functions
module.exports = {
    returnCategories,
    getCategories,
    postCategory,
    updateCategoryDetails
};