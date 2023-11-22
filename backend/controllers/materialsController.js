const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnMaterials = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM materials WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM materials;`;
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
                    const materials = rows.map(({ id, name, subcategory_id }) => ({ id, name, subcategory_id }));

                    return resolve({ status: 200, materials });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getMaterials = (req, res) => {

    // Send a response according to the given data
    returnMaterials()
    .then(({ status, materials }) => {
        // send the data in the response
        return res.status(status).json({ materials });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });
    
};

// Primary function which creates new rows in the corresponding tables
const postMaterial = (req, res) => {

    // Check if required data was provided
    if(!req.body.name || !req.body.subcategory_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name, subcategory_id } = req.body;

    subcategory_id = parseInt(subcategory_id)

    // Create a new row with the given data
    const sql = `INSERT INTO materials (name, subcategory_id) VALUES (?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name, subcategory_id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Material added successfully"});
            } else {
                console.log(err);
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });
    });

};

// Primary function which updates the corresponding rows
const updateMaterialDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.name && !req.body.subcategory_id) {
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
        sql = `UPDATE materials SET name = ? WHERE id = ?;`;

    } else {

        data = req.body.subcategory_id;

        // Update the specified column with the given data
        sql = `UPDATE materials SET subcategory_id = ? WHERE id = ?;`;

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
    returnMaterials,
    getMaterials,
    postMaterial,
    updateMaterialDetails
};