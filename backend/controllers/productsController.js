const pool = require('../dbConnectionPool');
const { returnCategories } = require('./categoriesController');
const { returnAgeRatings } = require('./ageRatingsController');
const { returnCountries } = require('./countriesController');
const seriesController = require('./seriesController');
const clothesController = require('./clothesController');
const collectiblesController = require('./collectiblesController');
const comicsController = require('./comicsController');
const ratingsController = require('./ratingsController');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');

const baseURL = `http://localhost:${process.env.PORT}/images/products/`;
const basePath = path.join(__dirname, '..', 'public', 'images', 'products');

// Configure image processing & storage
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
const returnProducts = (res, id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM products WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM products;`;
        }

        pool.getConnection((err, conn) => {

            if (err) {
                console.log(err);
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
                        const products = await Promise.all(rows.map(async ({ id, name, description, quantity, price, category_id, age_rating_id, country_id }) => {

                            // Make asynchronous calls to auxiliary functions to obtain remaining data
                            try {
                                const { categories } = await returnCategories(category_id);
                                const { age_ratings } = await returnAgeRatings(age_rating_id);
                                const { countries } = await returnCountries(country_id);
                                const { series } = await seriesController.returnCollaborations(id);
                                const { product_images } = await returnProductImages(id);
                                const { averageRating: rating } = await ratingsController.calculateAverageRating(res, id);

                                // Obtain the category name
                                const category_name = categories[0].name;

                                let response;
                                let category_details;

                                // Obtain category details based on the product's category
                                switch(category_name) {

                                    case "comics":

                                        response = await comicsController.returnCategoryDetails(id);

                                        category_details = response.item;

                                        break;

                                    case "collectibles":

                                        response = await collectiblesController.returnCategoryDetails(id);

                                        category_details = response.item;

                                        break;

                                    case "clothes":

                                        response = await clothesController.returnCategoryDetails(id);

                                        category_details = response.item;

                                        break;

                                }

                                // Process the obtained information
                                const images = product_images.map((ipth) => baseURL + ipth);
                                const category = categories[0];
                                const age_rating = age_ratings[0];
                                const country = countries[0];

                                // Initialize an object with the relevant data
                                const obj = { id, name, description, quantity, price, rating, category, category_details, age_rating, country, series, images };

                                return obj;

                            } catch (err) {
                                console.log(err);
                                return reject({ status: 500, msg: "Something went wrong" });
                            }

                        }));

                        return resolve({ status: 200, products });

                    })();
                } else {
                    console.log(err);
                    return reject({ status: 500, msg: "Operation failed"});
                }

            });
        });

    });

};

// Primary function which sends a response containing all requested data
const getProducts = (req, res) => {

    // Send a response according to the given data
    if (req.params.id) {

        // Obtain the ID from the request parameters
        let { id } = req.params;
        id = parseInt(id);

        // Get a specific row from auxiliary function
        returnProducts(res, id)
        .then(({ status, products }) => {
            // send the data in the response
            return res.status(status).json({ products });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });

    } else {
        // Get all rows from auxiliary function
        returnProducts(res)
        .then(({ status, products }) => {
            // send the data in the response
            return res.status(status).json({ products });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });
    }

};

// Primary function which creates new rows in the corresponding tables
const postProduct = (req, res) => {

    // Check if required data was provided
    if (!req.body.name || 
        !req.body.description || 
        !req.body.category_id || 
        !req.body.age_rating_id || 
        !req.body.country_id || 
        !req.body.series_ids || 
        !req.body.quantity || 
        !req.body.price) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request body
    let { 
        name,
        description,
        category_id,
        age_rating_id,
        country_id,
        series_ids,
        quantity,
        price,
    } = req.body;

    // Parse the given data to the corresponding datatypes
    category_id = parseInt(category_id);
    age_rating_id = parseInt(age_rating_id);
    country_id = parseInt(country_id);
    series_ids = series_ids.map(sid => parseInt(sid));
    quantity = parseInt(quantity);
    price = parseFloat(price);

    // Create a new row with the provided data
    let sql = `INSERT INTO products (name, description, category_id, age_rating_id, country_id, quantity, price) VALUES (?, ?, ?, ?, ?, ?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ status: 500, msg: "Connection failed "});
        }

        // Perform the database query
        conn.query(sql, [name, description, category_id, age_rating_id, country_id, quantity, price], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {

                const product_id = rows.insertId;

                // Define an asynchronous, immediately invoked function expression
                (async () => {

                    // Make asynchronous calls to auxiliary functions to create new rows in the association tables
                    try {
                        
                        await seriesController.updateCollaborations(res, product_id, series_ids);
                        await ratingsController.addRating(product_id);

                        // Pass in the category ID to an auxiliary function to obtain the category name
                        const { categories } = await returnCategories(category_id);
                        const category_name = categories[0].name;

                        // Insert category details based on the product's category
                        switch(category_name) {
                            case "comics":

                                await comicsController.addCategoryDetails(req, res, product_id);

                                return res.status(201).json({ "message" : "Product added successfully", "product_id": product_id });

                            case "collectibles":

                                await collectiblesController.addCategoryDetails(req, res, product_id);

                                return res.status(201).json({ "message" : "Product added successfully", "product_id": product_id });

                            case "clothes":

                                await clothesController.addCategoryDetails(req, res, product_id);

                                return res.status(201).json({ "message" : "Product added successfully", "product_id": product_id });

                        }

                    } catch ({ status, msg }) {
                        console.log("error: ", err);
                        return res.status(500).json({ "message": "Operation failed" });
                    }

                })();

            } else {
                console.log("errorr: ", err);
                return res.status(500).json({ "message": "Operation failed" });
            }
        });

    });

};

// Primary function which updates the corresponding rows
const updateProductDetails = async (req, res) => {

    // Check if required data was provided
    if (!req.params.id ||
        !req.body.name && 
        !req.body.description && 
        !req.body.quantity &&
        !req.body.price &&
        !req.body.age_rating_id &&
        !req.body.country_id &&
        !req.body.series_ids) {
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
        sql = `UPDATE products SET name = ? WHERE id = ?;`;

    } else if (req.body.description) {

        data = req.body.description;

        // Update the specified column with the given data
        sql = `UPDATE products SET description = ? WHERE id = ?;`;

    } else if (req.body.quantity) {

        data = req.body.quantity;

        // Update the specified column with the given data
        sql = `UPDATE products SET quantity = ? WHERE id = ?;`;

    }  else if (req.body.price) {

        data = req.body.price;

        // Update the specified column with the given data
        sql = `UPDATE products SET price = ? WHERE id = ?;`;

    }  else if (req.body.age_rating_id) {

        data = req.body.age_rating_id;

        // Update the specified column with the given data
        sql = `UPDATE products SET age_rating_id = ? WHERE id = ?;`;

    }  else if (req.body.country_id) {

        data = req.body.country_id;

        // Update the specified column with the given data
        sql = `UPDATE products SET country_id = ? WHERE id = ?;`;

    }  else if (req.body.series_ids) {

        data = req.body.series_ids;

        try {

            await seriesController.updateCollaborations(res, id, series_ids);

            return res.sendStatus(204);

        } catch ({ status, msg }) {
            return res.status(status).json({ "message": msg });
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
                return res.sendStatus(204);
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });

    });

};

// Auxiliary function which returns all images associated to the provided ID
const returnProductImages = (product_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        product_id = parseInt(product_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM product_images WHERE product_id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [product_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Initialize an array storing the relevant data from each row
                    const product_images = rows.map(({ path }) => path);

                    return resolve({ status: 200, product_images });

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Primary function which updates the images associated with the provided ID
const updateProductImages = (req, res) => {

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
    returnProductImages(id)
        .then(({ product_images: current_images }) => {

            // Create an array with the images not already associated with the given ID
            const new_images = images.filter((nipth) => !current_images.includes(nipth));

            // Check if there are any images currently associated with the given ID
            if(current_images.length > 0) {

                // Create an array of images that were not included in the new images array
                erased_images = current_images.filter((cipth) => !images.includes(cipth));

                // If any, then for each erased image, delete it from the db & the file system
                if (erased_images.length > 0) {

                    // Delete the image with the given path
                    let sql = `DELETE FROM product_images WHERE path = ?;`;

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
            let sql = `INSERT INTO product_images (product_id, path) VALUES (?, ?);`;
                
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
                        } else {
                            return res.sendStatus(204);
                        }

                    });

                });
            });
            
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });

};

// Auxiliary function which returns all rows associated with the given ID
const returnPurchases = (res, order_id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!order_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        order_id = parseInt(order_id);
        
        // Get all rows associated with the given ID
        const sql = `SELECT * FROM order_products WHERE order_id = ?;`;

        pool.getConnection((err, conn) => {

            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [order_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const purchases = await Promise.all(rows.map(async ({ product_id, quantity, price_instance }) => {

                            // Fetch the rows with the given ID
                            const response = await returnProducts(res, product_id);
                            const product = response.products[0];

                            const obj = { product, quantity, price_instance };


                            return obj;

                        }));

                        return resolve({ status: 200, purchases });

                    })();

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });

};

// Auxiliary function which creates rows associated with the provided ID
const addOrderProducts = (res, order_id, purchases) => {
    
    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!order_id || 
            !purchases) {
            return resolve({ status: 400, msg: "Required data was not provided" });
        }
        
        order_id = parseInt(order_id);

        // Insert a new row for each purchase made
        purchases.forEach(({ product_id, quantity }) => {

            // Define an asynchronous, immediately invoked function expression
            (async () => {

                // Decrease the product quantity by the given quantity
                try {
                    await decreaseProductQuantity(res, product_id, quantity);
                } catch ({ status, msg }) {
                    return reject({ status, msg });
                }

                // Obtain the product's price instance (The price at the moment the order was made)
                const response = await returnProducts(res, product_id);
                const product = response.products[0];
                const price_instance = product.price;

                // Create a new row with the provided data
                let sql = `INSERT INTO order_products (order_id, product_id, quantity, price_instance) VALUES (?, ?, ?, ?);`;

                pool.getConnection((err, conn) => {

                    if (err) {
                        return reject({ status: 500, msg: "Connection failed" });
                    }
    
                    // Perform the database query
                    conn.query(sql, [order_id, product_id, quantity, price_instance], (err, rows) => {

                        // Release the connection
                        conn.release();

                        if (!err) {
                            return resolve({ status: 201, msg: "Order products added successfully" });
                        } else {
                            return reject({ status: 500, msg: "Operation failed" });
                        }

                    });

                });

            })();

        });

    });

};

// Auxiliary function used to automatically decrease the product quantity by one
const decreaseProductQuantity = (res, product_id, quantity) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!product_id) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        // Define an asynchronous, immediately invoked function expression
        (async () => {

            // Obtain the given product's current quantity
            const response = await returnProducts(res, product_id);
            
            let { quantity: current_quantity } = response.products[0];

            // Check if the given quantity is less than or equal to the current quantity
            if (quantity <= current_quantity) {

                // Decrease the current quantity by the given quantity
                current_quantity -= quantity;

            } else {
                return reject({ status: 400, msg: "Selected quantity excedes available units" });
            }

            // Update the corresponding row with the current quantity
            const sql = `UPDATE products SET quantity = ? WHERE id = ?;`;

            pool.getConnection((err, conn) => {
                
                if (err) {
                    return reject({ status: 500, msg: "Connection failed" });
                }

                conn.query(sql, [current_quantity, product_id], (err, rows) => {
                    if (!err) {

                        console.log("continuity check 4");

                        return resolve({ status: 204, msg: "Data updated successfully" });
                    } else {
                        return reject({ status: 500, msg: "Operation failed" });
                    }
                })

            });

        })();

    });

};

// Auxiliary function which performs data checks
const isQuantityAvailable = (res, purchases) => {
    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!purchases) {
            return reject({ status: 400, msg: "Required data was not provided" });
        }

        // For each provided purchase, check if the quantity exceeds the product's available units
        purchases.forEach(({ product_id, quantity }) => {
            (async () => {

                // Obtain the given product's current quantity
                const response = await returnProducts(res, product_id);

                // Check if the given quantity is less than or equal to the current quantity
                let { quantity: current_quantity } = response.products[0];

                if (quantity <= current_quantity) {

                    return resolve({ status: 204 });

                } else {
                    return reject({ status: 400, msg: "Selected quantity excedes available units" });
                }

            })();
        });

    });
};

// Primary function which restores all products' available units to the desired quantity
const resetStockProducts = (req, res) => {

    // Check if required data was provided
    if (!req.params.quantity) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    let { quantity } = req.params;
    quantity = parseInt(quantity);

    // Update all rows with the given data
    const sql = `UPDATE products SET quantity = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [quantity], (err, rows) => {

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
    returnProducts,
    getProducts,
    postProduct,
    updateProductDetails,
    returnProductImages,
    updateProductImages,
    returnPurchases,
    addOrderProducts,
    isQuantityAvailable,
    resetStockProducts,
    upload
};