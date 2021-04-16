const connection = require('./connection');
const cTable = require('console.table');

// READ all departments
const readDepartments = (cb) => {
    connection.query(
        'SELECT * FROM department', (err, res) => {
            if (err) cb(err, null);
            connection.end();
            cb(null, res);
        }
    );
}

// CREATE department

// UPDATE department
// DELETE department