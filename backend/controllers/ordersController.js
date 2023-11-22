const pool = require('../dbConnectionPool');
const productsController = require('./productsController');
const { format } = require('date-fns');

// Auxiliary function that returns data without sending a response
const returnOrders = (req, res, id) => {

    return new Promise((resolve, reject) => {

        // Check if required data was provided
        if (!req.user_id) {
            return reject({ status: 401, msg: "No user was provided" });
        }

        // Obtain data from the request
        const user_id = parseInt(req.user_id);

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM orders WHERE user_id = ? AND id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM orders WHERE user_id = ?;`;
        }

        pool.getConnection((err, conn) => {
            
            if (err) {
                return reject({ status: 500, msg: "Connection failed" });
            }

            // Perform the database query
            conn.query(sql, [user_id], (err, rows) => {

                // Release the connection
                conn.release();

                if (!err) {

                    // Define an asynchronous, immediately invoked function expression
                    (async () => {

                        // Initialize an array storing the relevant data from each row
                        const orders = await Promise.all(rows.map(async ({ id, order_date, total_price, user_id }) => {

                            // Make asynchronous calls to auxiliary functions to obtain remaining data
                            const response = await productsController.returnPurchases(res, id);

                            const { purchases } = response;

                            // Initialize an object with the relevant data
                            const obj = { id, order_date, total_price, user_id, purchases };

                            return obj;

                        }));

                        return resolve({ status: 200, orders });

                    })();

                } else {
                    return reject({ status: 500, msg: "Operation failed" });
                }
                
            });

        });

    });
    
};

// Primary function which sends a response containing all requested data
const getOrders = (req, res) => {

    // Send a response according to the given data
    if (req.params.id) {

        // Obtain the ID from the request parameters
        let { id } = req.params;
        id = parseInt(id);

        // Get a specific row from auxiliary function
        returnOrders(req, res, id)
        .then(({ status, orders }) => {
            // send the data in the response
            return res.status(status).json({ orders });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });

    } else {
        // Get all rows from auxiliary function
        returnOrders(req, res)
        .then(({ status, orders }) => {
            // send the data in the response
            return res.status(status).json({ orders });
        })
        .catch(({ status, msg }) => {
            return res.status(status).json({ "message": msg });
        });
    }

};

// Primary function which creates new rows in the corresponding tables
const postOrder = async (req, res) =>  {

    // Check if required data was provided
    if (!req.user_id ||
        !req.body.purchases) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request
    const user_id = parseInt(req.user_id);
    let { purchases } = req.body;

    // Check if the selected quantities exceed the available units
    try {
        await productsController.isQuantityAvailable(res, purchases);
    } catch ({ status, msg }) {
        return res.status(status).json({ "message": msg });
    }
    
    // Initialize an array storing the prices of the given products
    const prices = await Promise.all(purchases.map(async ({ product_id }) => {

        const response = await productsController.returnProducts(res, product_id);
        const { price } = response.products[0];

        return price;

    }));
    
    // Calculate the order's total price
    const total_price = prices.reduce((a, b) => a + b);

    // Create a new row with the given data
    const sql = `INSERT INTO orders (user_id, total_price) VALUES (?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [user_id, total_price], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {

                const order_id = rows.insertId;

                console.log(order_id);

                // Define an asynchronous, immediately invoked function expression
                (async () => {

                    // Make asynchronous calls to auxiliary functions to create new rows in the association tables
                    try {

                        await productsController.addOrderProducts(res, order_id, purchases);

                        return res.status(201).json({ "message": "Order submitted successfully" });

                    } catch ({ status, msg }) {
                        return res.status(status).json({ "message": msg });
                    }

                })();

            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }
            
        });
    });

};

// Primary function which updates the order's delivery date
const updateOrderState = (req, res) => {

    // Check if required data was provided
    if (!req.params.id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the ID from the request parameters
    let { id } = req.params;
    id = parseInt(id);

    // Calculate the delivery date
    const delivery_date = format(new Date(), "yyyy-MM-dd hh:mm:ss");

    // Update the corresponding rows with the given data
    const sql = `UPDATE orders SET delivery_date = ? WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [delivery_date, id], (err, rows) => {

            if (!err) {
                return res.sendStatus(204);
            } else {
                console.log(err);
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Export all functions
module.exports = {
    getOrders,
    postOrder,
    updateOrderState
};