const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnSubcategories = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM subcategories WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM subcategories;`;
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
                    const subcategories = rows.map(({ id, category_id, name }) => ({ id, category_id, name }));

                    return resolve({ status: 200, subcategories });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getSubcategories = (req, res) => {

    // Send a response according to the given data
    returnSubcategories()
    .then(({ status, subcategories }) => {
        // send the data in the response
        return res.status(status).json({ subcategories });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });
    
};

// Primary function which creates new rows in the corresponding tables
const postSubcategory = (req, res) => {

    // Check if required data was provided
    if(!req.body.name || !req.body.category_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name, category_id } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO subcategories (name, category_id) VALUES (?, ?);`;


    pool.getConnection((err, conn) => {
        // Perform the database query
        conn.query(sql, [name, category_id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                
                return res.status(201).json({ "message": "Subcategory added successfully"});
                
            } else {
                
                // End the connection
                conn.end();
                
                return res.status(500).json({ "message": "Operation failed" });
                
            }
            
        });
    });

};

// Primary function which updates the corresponding rows
const updateSubcategoryDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.name && !req.body.category_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    let data;
    let sql;

    // Formulate the query based on provided data
    if (req.body.name) {

        data = req.body.name;

        // Update the specified column with the given data
        sql = `UPDATE subcategories SET name = ? WHERE id = ?;`;

    } else {

        data = req.body.category_id;

        // Update the specified column with the given data
        sql = `UPDATE subcategories SET category_id = ? WHERE id = ?;`;

    }

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [data, id], (err, rows) => {

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
    returnSubcategories,
    getSubcategories,
    postSubcategory,
    updateSubcategoryDetails
};