const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnCompanies = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM companies WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM companies;`;
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
                    const companies = rows.map(({ id, country_id, name }) => ({ id, country_id, name }));

                    return resolve({ status: 200, companies });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getCompanies = (req, res) => {

    // Send a response according to the given data
    returnCompanies()
    .then(({ status, companies }) => {
        // send the data in the response
        return res.status(status).json({ companies });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });
    
};

// Primary function which creates new rows in the corresponding tables
const postCompany = (req, res) => {

    // Check if required data was provided
    if(!req.body.name || !req.body.country_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name, country_id } = req.body;

    country_id = parseInt(country_id)

    // Create a new row with the given data
    const sql = `INSERT INTO companies (name, country_id) VALUES (?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name, country_id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Company added successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });
    });

};

// Primary function which updates the corresponding rows
const updateCompanyDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.name && !req.body.country_id) {
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
        sql = `UPDATE companies SET name = ? WHERE id = ?;`;

    } else {

        data = req.body.country_id;

        // Update the specified column with the given data
        sql = `UPDATE companies SET country_id = ? WHERE id = ?;`;

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
    returnCompanies,
    getCompanies,
    postCompany,
    updateCompanyDetails
};