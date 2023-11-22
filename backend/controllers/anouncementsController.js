const pool = require('../dbConnectionPool');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();
const multer = require('multer');

const baseURL = `http://localhost:${process.env.PORT}/images/anouncements/`;
const basePath = path.join(__dirname, '..', 'public', 'images', 'anouncements');

// Configure middleware for image processing & storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, basePath);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    }
});

// Create an instance of multer
const upload = multer({ storage: storage });

// Auxiliary function that returns data without sending a response
const returnAnouncements = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM anouncements WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM anouncements;`;
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

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const anouncements = await Promise.all(rows.map(async ({ id, title, content, subject, pub_date }) => {

                            // Make asynchronous calls to auxiliary functions to obtain remaining data
                            const { anouncement_images } = await returnAnouncementImages(id);

                            // Set the URLs for the given anouncement images
                            const images = anouncement_images.map((ipth) => baseURL + ipth);

                            // Initialize an object with the relevant data
                            const obj = { id, title, content, subject, pub_date, images };

                            return obj;

                        }));

                        return resolve({ status: 200, anouncements });

                    })();
                } else {
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Primary function which sends a response containing all requested data
const getAnouncements = (req, res) => {

    // Send a response according to the given data
    if (req.params.id) {

        // Obtain the ID from the request parameters
        let { id } = req.params;
        id = parseInt(id);

        // Get a specific row from auxiliary function
        returnAnouncements(id)
        .then(({ status, anouncements }) => {
            // send the data in the response
            return res.status(status).json({ anouncements });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });

    } else {
        // Get all rows from auxiliary function
        returnAnouncements()
        .then(({ status, anouncements }) => {
            // send the data in the response
            return res.status(status).json({ anouncements });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });
    }

};

// Primary function which creates new rows in the corresponding tables
const postAnouncement = (req, res) => {

    // Check if required data was provided
    if(!req.body.title || !req.body.content || !req.body.subject) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { title, content, subject } = req.body;

    // Create a new row with the given data
    const sql = `INSERT INTO anouncements (title, content, subject) VALUES (?, ?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [title, content, subject], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Anouncement posted successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateAnouncementDetails = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.body.title && !req.body.content && !req.body.subject) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let id = parseInt(req.params.id);

    let data;
    let sql;

    // Formulate the query based on provided data
    if (req.body.title) {

        data = req.body.title;

        // Update the specified column with the given data
        sql = `UPDATE anouncements SET title = ? WHERE id = ?;`;

    } else if (req.body.content) {

        data = req.body.content;

        // Update the specified column with the given data
        sql = `UPDATE anouncements SET content = ? WHERE id = ?;`;

    } else {

        data = req.body.subject;

        // Update the specified column with the given data
        sql = `UPDATE anouncements SET subject = ? WHERE id = ?;`;

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

// Auxiliary function which returns all images associated to the provided ID
const returnAnouncementImages = (anouncement_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!anouncement_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        anouncement_id = parseInt(anouncement_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM anouncement_images WHERE anouncement_id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [anouncement_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Initialize an array storing the relevant data from each row
                    const anouncement_images = rows.map(({ path }) => path);

                    return resolve({ status: 200, anouncement_images });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Primary function which updates the images associated with the provided ID
const updateAnouncementImages = (req, res) => {

    // Check if required data was provided
    if (!req.params.id || !req.files) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let { id } = req.params;
    id = parseInt(id);

    // Initialize an array with the filenames of the given images
    const images = req.files.map(f => f.filename);

    // Obtain the filenames of the images currently associated with the given ID
    returnAnouncementImages(id)
        .then(({ anouncement_images: current_images }) => {

            // Create an array with the images not already associated with the given ID
            const new_images = images.filter((nipth) => !current_images.includes(nipth));

            // Check if there are any images currently associated with the given ID
            if(current_images.length > 0) {

                // Create an array of images that were not included in the new images array
                erased_images = current_images.filter((cipth) => !images.includes(cipth));

                // If any, then for each erased image, delete it from the db & the file system
                if (erased_images.length > 0) {

                    // Delete the image with the given path
                    let sql = `DELETE FROM anouncement_images WHERE path = ?;`;

                    erased_images.forEach((eipth) => {

                        pool.getConnection((err, conn) => {

                            if (err) {
                                return res.status(500).json({ "message": "Connection failed" });
                            }

                            // Perform the database query
                            conn.query(sql, [eipth], (err, rows) => {

                                // Release the connection
                                conn.release();

                                if (err) {
                                    return res.status(500).json({ "message": "Operation failed "});
                                }

                            });
                        });

                        // Get the image's full path
                        image_path = path.join(basePath, eipth);

                        // Remove the image with the given path from the file system
                        fs.unlink(image_path, (err) => {
                            if (err) {
                                return console.log(`File deletion failed for: ${eipth}`);
                            }
                            console.log(`Deleted: ${image_path}`);
                        });

                    });

                }
            }

            // Create a new row with the provided data
            let sql = `INSERT INTO anouncement_images (anouncement_id, path) VALUES (?, ?);`;
                
            // Insert a new row for each new image
            new_images.forEach((nipth) => {
                pool.getConnection((err, conn) => {

                    if (err) {
                        return res.status(500).json({ "message": "Connection failed" });
                    }

                    // Perform the database query
                    conn.query(sql, [id, nipth], (err, rows) => {

                        // Release the connection
                        conn.release();

                        if (err) {
                            return res.status(500).json({ "message": "Operation failed" });
                        }

                    });

                });
            });

            return res.sendStatus(204);
            
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });

};

// Export all functions 
module.exports = {
    returnAnouncements,
    getAnouncements,
    postAnouncement,
    updateAnouncementDetails,
    returnAnouncementImages,
    updateAnouncementImages,
    upload
};