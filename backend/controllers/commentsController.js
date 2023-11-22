const pool = require('../dbConnectionPool');
const { returnUsers } = require('./usersController');

// Auxiliary function that returns data without sending a response
const returnComments = (id) => {

    return new Promise((resolve, reject) => {

        let sql;

        // Formulate the query based on provided input
        if (id) {

            id = parseInt(id);

            // Get the row with the specified ID
            sql = `SELECT * FROM comments WHERE id = ${id};`;

        } else {
            // Get all rows
            sql = `SELECT * FROM comments;`;
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
                        const comments = await Promise.all(rows.map(async ({ id, user_id, product_id, content, pub_date, votes }) => {

                            // Make asynchronous calls to auxiliary functions to obtain remaining data
                            const response = await returnUsers("id", user_id);

                            // Process the obtained information
                            const user = response.users[0];
        
                            // Initialize an object with the relevant data
                            const obj = { id, user, product_id, content, pub_date, votes };

                            return obj;

                        }));

                        return resolve({ status: 200, comments });

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
const getComments = (req, res) => {

    // Get all rows from auxiliary function
    returnComments()
    .then(({ status, comments }) => {
        // send the data in the response
        return res.status(status).json({ comments });
    })
    .catch(({ status, msg }) => {
        return res.status(status).json({ "message": msg });
    });

};

// Primary function which creates new rows in the corresponding tables
const postComment = (req, res) => {

    // Check if required data was provided
    if (!req.user_id || 
        !req.body.product_id || 
        !req.body.content) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request
    const user_id = parseInt(req.user_id);
    const product_id = parseInt(req.body.product_id);
    const { content } = req.body

    // Format the given content
    const formatted_content = content.join('\n');

    // Create a new row with the given data
    const sql = `INSERT INTO comments (user_id, product_id, content) VALUES (?, ?, ?);`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [user_id, product_id, formatted_content], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(201).json({ "message": "Comment posted successfully"});
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which updates the corresponding rows
const updateCommentDetails = async (req, res) => {

    // Check if required data was provided
    if (!req.user_id || !req.params.id || !req.body.content) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain the user ID from the request
    const user_id = parseInt(req.user_id);

    // Obtain the ID from the request parameters
    const id = parseInt(req.params.id);

    // Obtain data from the request body
    let content = req.body.content;

    // Format the given content
    const formatted_content = content.join('\n');
   
    // Update the specified column with the given data
    let sql = `UPDATE comments SET content = ? WHERE user_id = ? AND id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [formatted_content, user_id, id], (err, rows) => {

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

// Primary function which updates comment votes
const updateCommentVotes = async (req, res) => {

    // Check if required data was provided
    if (!req.params.id || 
        !req.body.vote) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request
    let { id } = req.params;
    id = parseInt(id);

    // Check if provided data is in the correct format
    if (!req.body.vote === 1 && !req.body.vote === -1) {
        return res.status(400).json({ "message": "Invalid vote" });
    }

    const { vote } = req.body;

    // Get the comment's current votes;
    const response = await returnComments(id);

    // Check if the referenced comment exists
    if (!response.comments) {
        return res.status(400).json({ "message": "Comment not found" });
    }

    // Obtain the current votes of the given comment
    let current_votes = response.comments[0].votes;
    current_votes = parseInt(current_votes);

    // Increase or decrease the current votes based on the given vote
    switch (vote) {
        case 1:
            current_votes += 1;
            break;
        case -1:
            current_votes -= 1;
            break;
    }

    // Update the corresponding rows with the given data
    const sql = `UPDATE comments SET votes = ? WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed "});
        }

        // Perform the database query
        conn.query(sql, [current_votes, id], (err, rows) => {

            // Release the connection
            conn.release();

            if (!err) {
                return res.status(204).json({ "message": "Votes updated successfully" });
            } else {
                return res.status(500).json({ "message": "Operation failed" });
            }

        });

    });

};

// Primary function which deletes the corresponding rows
const deleteComment = async (req, res) => {

    // Check if required data was provided
    if (!req.user_id ||
        !req.role ||
        !req.params.id) {
        return res.status(400).json({ "message": "Required data was not provided" });
    }

    // Obtain data from the request
    const given_user_id = parseInt(req.user_id);
    const { role } = req;

    // Obtain the ID from the request parameters
    let { id } = req.params;
    id = parseInt(id);
    
    try {

        // Obtain the ID of the user who posted the comment
        const response = await returnComments(id);
        const { id: user_id } = response.comments[0].user.id;

        // Determine if the given user has permission to delete the referenced comment
        if (given_user_id !== user_id && role !== "admin") {
            return res.status(401).json({ "message": "Permission denied" })
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Operation failed" });
    }

    const sql = `DELETE FROM comments WHERE id = ?;`;

    pool.getConnection((err, conn) => {

        if (err) {
            return res.status(500).json({ "message": "Connection failed" });
        }

        // Perform the database query
        conn.query(sql, [id], (err, rows) => {

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
    returnComments,
    getComments,
    postComment,
    updateCommentDetails,
    updateCommentVotes,
    deleteComment
};