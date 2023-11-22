const pool = require('../dbConnectionPool');
const { returnSubcategories } = require('./subcategoriesController');
const { returnCompanies } = require('./companiesController');

// Auxiliary function which returns all rows associated with the given ID
const returnCategoryDetails = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        parseInt(product_id);

        // Get all rows associated with the given ID
        let sql = `SELECT * FROM collectibles WHERE product_id = ?`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id], (err, rows) => {
        
                // Release the connection
                conn.release();
        
                if (!err) {
        
                    // Destructure all data & foreign keys from the returned row
                    const {
                        id,
                        subcategory_id, 
                        company_id
                    } = rows[0];
        
                    (async () => {
        
                        // Make asynchronous calls to auxiliary functions to obtain remaining data
                        const { subcategories } = await returnSubcategories(subcategory_id);
                        const { companies } = await returnCompanies(company_id);

                        // Obtain the object within each returned array
                        const subcategory = subcategories[0];
                        const company = companies[0];
        
                        // Create an object with all related data
                        const item = {
                            id,
                            subcategory,
                            company
                        }
        
                        return resolve({ status: 200, item });
        
                        })();
        
                } else {
                    
                    return reject({ status: 500, msg: "Operation failed" });
                }
            });

        });
    
    });

};

// Primary function which updates the category details of the provided item
const updateCategoryDetails = async (req, res) => {

    // Check if required data was provided
    if (!req.params.id || 
        !req.body.subcategory_id && 
        !req.body.company_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let { id } = req.params;
    id = parseInt(id);

    let data;
    let sql;

    // Formulate the query based on provided data
    if (req.body.subcategory_id) {

        data = parseInt(req.body.subcategory_id);

        sql = `UPDATE collectibles SET subcategory_id = ? WHERE id = ?;`;

    } else {

        data = parseInt(req.body.company_id);

        sql = `UPDATE collectibles SET company_id = ? WHERE id = ?;`;

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
                return res.status(204).json({ "message": "Category details updated successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed"});
            }
        });

    });

};

// Auxiliary function which creates a new row in the category table
const addCategoryDetails = (req, res, product_id) => {
    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id || 
            !req.body.subcategory_id || 
            !req.body.company_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        // Obtain data from the request body
        let { 
            subcategory_id, 
            company_id
        } = req.body;

        // Parse the given data to the corresponding datatypes
        product_id = parseInt(product_id);
        subcategory_id = parseInt(subcategory_id);
        company_id = parseInt(company_id);

        // Create a new row with the given data
        let sql = `INSERT INTO collectibles (product_id, subcategory_id, company_id) VALUES (?, ?, ?);`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id, subcategory_id, company_id], (err, rows) => {
                
                // Release the connection
                conn.release();

                if (!err) {
                    return resolve({ status: 204 });
                } else {
                    console.log("error in collectibles: ", err);
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });
    });
};

// Export all functions
module.exports = {
    returnCategoryDetails,
    updateCategoryDetails,
    addCategoryDetails
};