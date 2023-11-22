const pool = require('../dbConnectionPool');

// Auxiliary function that returns data without sending a response
const returnGenres = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM genres WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM genres;`;
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
                    const genres = rows.map(({ id, genre, age_rating_id }) => ({ id, genre, age_rating_id }));

                    return resolve({ status: 200, genres });

                } else {
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Primary function which sends a response containing all requested data
const getGenres = (req, res) => {

    // Get all rows from auxiliary function
    returnGenres()
    .then(({ status, genres }) => {
        // send the data in the response
        return res.status(status).json({ genres });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });

};

// Primary function which creates new rows in the corresponding tables
const postGenre = (req, res) => {

    // Check if required data was provided
    if(!req.body.genre || !req.body.age_rating_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { genre, age_rating_id } = req.body;

    age_rating_id = parseInt(age_rating_id);

    // Create a new row with the given data
    const sql = `INSERT INTO genres (genre, age_rating_id) VALUES (?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [genre, age_rating_id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Genre posted successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateGenreDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.genre && !req.body.age_rating_id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    let data;
    let sql;

    // Formulate the query based on provided data
    if (req.body.genre) {

        data = req.body.genre;

        // Update the specified column with the given data
        sql = `UPDATE genres SET genre = ? WHERE id = ?;`;

    } else {

        data = req.body.age_rating_id;

        // Update the specified column with the given data
        sql = `UPDATE genres SET age_rating_id = ? WHERE id = ?;`;

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
const returnComicGenres = (comic_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!comic_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        comic_id = parseInt(comic_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM comic_genres WHERE comic_id = ?;`;

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
                        const genres = await Promise.all(rows.map(async ({ genre_id }) => {

                            // Fetch the rows with the given ID
                            const { genres } = await returnGenres(genre_id);

                            return genres[0];

                        }));

                        return resolve({ status: 200, genres });

                    })();

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Auxiliary function which updates the rows associated with the provided ID
const updateComicGenres = async (res, comic_id, genre_ids) => {

    // Check if required data was provided
    if (!comic_id || !genre_ids) {
        console.log("data was not provided");
        throw { status: 400, msg: "Required data was not provided" };
    }
    
    comic_id = parseInt(comic_id);

    let response;

    try {
        // Make an asynchronous call to an auxiliary function to get required data
        response = await returnComicGenres(comic_id);
    } catch ({ status, msg }) {
        return res.status({ status, msg });
    }

    let new_genres;
    
    return new Promise((resolve, reject) => {

        // Check if there are any rows associated with the given ID
        if (response.genres) {

            // Destructure the rows associated with the given ID
            let { genres } = response;

            // Initialize an array to store the IDs of all rows associated to the given ID
            const current_genres = genres.map(({ id }) => id);
            
            // Initialize an array to store the IDs of all rows not already associated with the given ID
            new_genres = genre_ids.filter((ngid) => !current_genres.includes(ngid));

            // Initialize an array to store the IDs of all rows not included within the given array
            const unlinked_genres = current_genres.filter((cgid) => !genre_ids.includes(cgid));

            // If any, then for each unlinked row, delete it from the db & the file system
            if (unlinked_genres.length > 0) {

                // Delete the respective rows
                let sql = `DELETE FROM comic_genres WHERE genre_id = ?;`;

                unlinked_genres.forEach((ugid) => {

                    pool.getConnection((err, conn) => {

                        if (err) {
                            return reject({ status: 500, msg: "Connection failed" });
                        }

                        // Perform the database query
                        conn.query(sql, [ugid], (err, rows) => {

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

            new_genres = genre_ids;

        }



        // Create a new row with the provided data
        let sql = `INSERT INTO comic_genres (comic_id, genre_id) VALUES (?, ?);`;
                
        // Insert a new row for each new genre
        new_genres.forEach((ngid) => {
            pool.getConnection((err, conn) => {

                if (err) {
                    return reject({ status: 500, msg: "Connection failed" });
                }

                    // Perform the database query
                    conn.query(sql, [comic_id, ngid], (err, rows) => {

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
    returnGenres,
    getGenres,
    postGenre,
    updateGenreDetails,
    returnComicGenres,
    updateComicGenres
};