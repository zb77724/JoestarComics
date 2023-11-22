const pool = require('../dbConnectionPool');
const { returnSubcategories } = require('./subcategoriesController');
const { returnSizes } = require('./sizesController');
const { returnMaterials } = require('./materialsController');
const colorsController = require('./colorsController');

// Auxiliary function which returns all rows associated with the given ID
const returnCategoryDetails = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        parseInt(product_id);

        // Get all rows associated with the given ID
        let sql = `SELECT * FROM clothes WHERE product_id = ?`;

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
                        size_id,
                        material_id
                    } = rows[0];
        
                    (async () => {
        
                        // Make asynchronous calls to auxiliary functions to obtain remaining data
                        const { subcategories } = await returnSubcategories(subcategory_id);
                        const { sizes } = await returnSizes(size_id);
                        const { materials } = await returnMaterials(material_id);
                        const { colors} = await colorsController.returnClothingColors(id);

                        // Obtain the object within each returned array
                        const subcategory = subcategories[0];
                        const size = sizes[0];
                        const material = materials[0];
        
                        // Create an object with all related data
                        const item = {
                            id,
                            subcategory,
                            size,
                            material,
                            colors
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
        !req.body.size_id && 
        !req.body.material_id && 
        !req.body.color_ids) {
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

        sql = `UPDATE clothes SET subcategory_id = ? WHERE id = ?;`;

    } else if (req.body.size_id) {

        data = parseInt(req.body.size_id);

        sql = `UPDATE clothes SET size_id = ? WHERE id = ?;`;

    } else if (req.body.material_id) {

        data = parseInt(req.body.material_id);

        sql = `UPDATE clothes SET material_id = ? WHERE id = ?;`;
        
    } else {

        data = req.body.color_ids.map((cid) => parseInt(cid));

        // Make asynchronous calls to auxiliary functions to update associated rows
        try {
            
            await colorsController.updateClothingColors(res, id, data);
            
            return res.sendStatus(204);
            
        } catch ({ status, msg }) {
            return  res.status(status).json({ "message": msg });
        }
        
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
                console.log(err);
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
            !req.body.size_id || 
            !req.body.material_id || 
            !req.body.color_ids) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        // Obtain data from the request body
        let { 
            subcategory_id, 
            size_id,
            material_id,
            color_ids
        } = req.body;

        // Parse the given data to the corresponding datatypes
        product_id = parseInt(product_id);
        subcategory_id = parseInt(subcategory_id);
        size_id = parseInt(size_id);
        material_id = parseInt(material_id);
        color_ids = color_ids.map(aid => parseInt(aid));

        // Create a new row with the given data
        let sql = `INSERT INTO clothes (product_id, subcategory_id, size_id, material_id) VALUES (?, ?, ?, ?);`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id, subcategory_id, size_id, material_id], (err, rows) => {
                
                // Release the connection
                conn.release();

                if (!err) {

                // Get the ID of the inserted row
                const item_id = rows.insertId;

                // Define an asynchronous, immediately invoked function expression
                (async () => {

                    // Create rows in the association tables
                    try {

                        // Make asynchronous calls to auxiliary functions to update the associated rows
                        const { status } = await colorsController.updateClothingColors(res, item_id, color_ids);

                        return resolve({ status });
                        
                    } catch ({ status, msg }) {  
                        return reject({ status, msg });
                    }

                })();

                } else {
                    console.log(err);
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