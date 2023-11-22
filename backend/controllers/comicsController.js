const pool = require('../dbConnectionPool');
const { returnSubcategories } = require('./subcategoriesController');
const { returnCompanies } = require('./companiesController');
const { returnLanguages } = require('./languagesController');
const { returnCovers } = require('./coversController');
const authorsController = require('./authorsController');
const genresController = require('./genresController');

// Auxiliary function which returns all rows associated with the given ID
const returnCategoryDetails = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        parseInt(product_id);

        // Get all rows associated with the given ID
        let sql = `SELECT * FROM comics WHERE product_id = ?`;

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
                        company_id,
                        language_id,
                        cover_id,
                        colored,
                        release_date
                    } = rows[0];
        
                    (async () => {
        
                        // Make asynchronous calls to auxiliary functions to obtain remaining data
                        const { subcategories } = await returnSubcategories(subcategory_id);
                        const { companies } = await returnCompanies(company_id);
                        const { languages } = await returnLanguages(language_id);
                        const { covers } = await returnCovers(cover_id);
                        const { authors} = await authorsController.returnComicAuthors(id);
                        const { genres } = await genresController.returnComicGenres(id);

                        // Obtain the object within each returned array
                        const subcategory = subcategories[0];
                        const company = companies[0];
                        const language = languages[0];
                        const cover = covers[0];
        
                        // Create an object with all related data
                        const item = {
                            id,
                            subcategory,
                            company,
                            language,
                            cover,
                            colored,
                            release_date,
                            authors,
                            genres
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
        !req.body.company_id && 
        !req.body.language_id && 
        !req.body.cover_id && 
        !req.body.colored && 
        !req.body.release_date && 
        !req.body.genre_ids && 
        !req.body.author_ids) {
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

        sql = `UPDATE comics SET subcategory_id = ? WHERE id = ?;`;

    } else if (req.body.company_id) {

        data = parseInt(req.body.company_id);

        sql = `UPDATE comics SET company_id = ? WHERE id = ?;`;

    } else if (req.body.language_id) {

        data = parseInt(req.body.language_id);

        sql = `UPDATE comics SET language_id = ? WHERE id = ?;`;
        
    } else if (req.body.cover_id) {

        data = parseInt(req.body.cover_id);

        sql = `UPDATE comics SET cover_id = ? WHERE id = ?;`;
        
    } else if (req.body.colored) {

        // Handle boolean data from the request body
        data = req.body.colored === "true" ? 1 : 0;

        sql = `UPDATE comics SET colored = ? WHERE id = ?;`;
        
    } else if (req.body.release_date) {

        data = req.body.release_date;

        sql = `UPDATE comics SET release_date = ? WHERE id = ?;`;
        
    } else if (req.body.genre_ids) {

        data = req.body.genre_ids.map((gid) => parseInt(gid));

        // Make asynchronous calls to auxiliary functions to update associated rows
        try {
            
            await genresController.updateComicGenres(res, id, data);
            
            return res.sendStatus(204);
            
        } catch ({ status, msg }) {
            return  res.status(status).json({ "message": msg });
        }
        
    } else {

        data = req.body.author_ids.map((aid) => parseInt(aid));

        // Make asynchronous calls to auxiliary functions to update associated rows
        try {
            const { status } = await authorsController.updateComicAuthors(res, id, data);
            return res.sendStatus(status);
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
            !req.body.company_id || 
            !req.body.language_id || 
            !req.body.cover_id || 
            !req.body.colored || 
            !req.body.genre_ids || 
            !req.body.author_ids || 
            !req.body.release_date) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        // Obtain data from the request body
        let { 
            subcategory_id, 
            company_id,
            language_id,
            cover_id,
            genre_ids,
            author_ids,
            colored,
            release_date
        } = req.body;


        // Handle boolean data from the request body
        colored = req.body.colored === "true" ? 1 : 0;

        // Parse the given data to the corresponding datatypes
        product_id = parseInt(product_id);
        subcategory_id = parseInt(subcategory_id);
        company_id = parseInt(company_id);
        language_id = parseInt(language_id);
        cover_id = parseInt(cover_id);
        genre_ids = genre_ids.map(gid => parseInt(gid));
        author_ids = author_ids.map(aid => parseInt(aid));

        // Create a new row with the given data
        let sql = `INSERT INTO comics (product_id, subcategory_id, company_id, language_id, cover_id, colored, release_date) VALUES (?, ?, ?, ?, ?, ?, ?);`;

        pool.getConnection((err, conn) => {

            if (err) {
                
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id, subcategory_id, company_id, language_id, cover_id, colored, release_date], (err, rows) => {

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
                        await authorsController.updateComicAuthors(res, item_id, author_ids);
                        const { status } = await genresController.updateComicGenres(res, item_id, genre_ids);

                        return resolve({ status });
                        
                    } catch ({ status, msg }) {  
                        return reject({ status, msg });
                    }

                })();

                } else {           
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