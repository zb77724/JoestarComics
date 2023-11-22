const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnAuthors = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM authors WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM authors;`;
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
                    const authors = rows.map(({ id, name, country_id }) => ({ id, name, country_id }));

                    return resolve({ status: 200, authors });

                } else {
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Primary function which sends a response containing all requested data
const getAuthors = (req, res) => {

    // Get all rows from auxiliary function
    returnAuthors()
    .then(({ status, authors }) => {
        // send the data in the response
        return res.status(status).json({ authors });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });

};

// Primary function which creates new rows in the corresponding tables
const postAuthor = (req, res) => {

    // Check if required data was provided
    if(!req.body.name || !req.body.country_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { name, country_id } = req.body;

    country_id = parseInt(country_id);

    // Create a new row with the given data
    const sql = `INSERT INTO authors (name, country_id) VALUES (?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [name, country_id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Author posted successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateAuthorDetails = (req, res) => {

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
        sql = `UPDATE authors SET name = ? WHERE id = ?;`;

    } else {

        data = req.body.country_id;

        // Update the specified column with the given data
        sql = `UPDATE authors SET country_id = ? WHERE id = ?;`;

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

// Auxiliary function which returns all rows associated with the given ID
const returnComicAuthors = (comic_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!comic_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        comic_id = parseInt(comic_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM comic_authors WHERE comic_id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [comic_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const authors = await Promise.all(rows.map(async ({ author_id }) => {

                            // Fetch the rows with the given ID
                            const { authors } = await returnAuthors(author_id);

                            return authors[0];

                        }));

                        return resolve({ status: 200, authors });

                    })();

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Auxiliary function which updates the rows associated with the provided ID
const updateComicAuthors = async (res, comic_id, author_ids) => {

    // Check if required data was provided
    if (!comic_id || !author_ids) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }
    
    comic_id = parseInt(comic_id);

    // Make an asynchronous call to an auxiliary function to get required data
    const response = await returnComicAuthors(comic_id);

    let new_authors;
    
    return new Promise((resolve, reject) => {

        // Check if there are any rows associated with the given ID
        if (response.authors) {

            // Destructure the rows associated with the given ID
            let { authors } = response;

            // Initialize an array to store the IDs of all rows associated to the given ID
            const current_authors = authors.map(({ id }) => id);
            
            // Initialize an array to store the IDs of all rows not already associated with the given ID
            new_authors = author_ids.filter((naid) => !current_authors.includes(naid));

            // Initialize an array to store the IDs of all rows not included within the given array
            const unlinked_authors = current_authors.filter((caid) => !author_ids.includes(caid));

            // If any, then for each unlinked row, delete it from the db & the file system
            if (unlinked_authors.length > 0) {

                // Delete the respective rows
                let sql = `DELETE FROM comic_authors WHERE author_id = ?;`;

                unlinked_authors.forEach((uaid) => {

                    pool.getConnection((err, conn) => {

                        if (err) {
                            return reject({ status: 500, msg: "Connection failed" });
                        }

                        // Perform the database query
                        conn.query(sql, [uaid], (err, rows) => {
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

            new_authors = author_ids;

        }



        // Create a new row with the provided data
        let sql = `INSERT INTO comic_authors (comic_id, author_id) VALUES (?, ?);`;
                
        // Insert a new row for each new author
        new_authors.forEach((naid) => {
            pool.getConnection((err, conn) => {

                if (err) {
                    return reject({ status: 500, msg: "Connection failed" });
                }

                    // Perform the database query
                    conn.query(sql, [comic_id, naid], (err, rows) => {
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

            return resolve({ status: 204 });

    });

};

// Export all functions 
module.exports = {
    returnAuthors,
    getAuthors,
    postAuthor,
    updateAuthorDetails,
    returnComicAuthors,
    updateComicAuthors
};