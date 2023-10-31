const conn = require('dbConnection');

// Auxiliary function which returns the data where required, without sending a response.
const returnCountries = (req, res) => {
    const { id } = req.params;

    let sql;

    if  (id) {
        sql = `SELECT * FROM countries WHERE id = ${id}`;
    } else {
        sql = `SELECT * FROM countries`;
    }
    

    conn.query(sql, (err, rows) => {
        if (!err) {
            // Initialize an array to store the objects 
            const countries = [];

            // Destructure the desired properties from each row
            rows.map(({ id, name}) => {
                const obj = { id, name }; // Create an object containing the desired properties
                countries.push(obj); // Append the object to the array
            })

            return countries;
        } else {
            return res.status(500).json({ "message": "Operation Failed" });
        }
    })
};

// Primary function that sends a response with the data
const getCountries = (req, res) => {
    const countries = returnCountries(req, res); // Get data from auxiliary function
    return res.status(200).json({ countries }); // send the data in the response
};

// Primary function that adds a new row to the database
const postCountry = (req, res) => {

    const { name } = req.body; // Get the data from the request body
    const sql = `INSERT INTO countries (name) VALUES ("?")`; // Formulate the query

    conn.query(sql, [name], (err, rows) => {
        if (!err) {
            return res.status(201).json({ "message": "Country Added Successfully"});
        } else {
            return res.status(500).json({ "message": "Operation Failed" });
        }
    });
};

module.exports = {
    returnCountries,
    getCountries,
    postCountry
};