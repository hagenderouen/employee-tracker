const cTable = require('console.table');
const Employee = require('../models/employee');
const connection = require('./connection');

// READ employees
const readEmployees = () => {
    console.log('\n');
    connection.query(
        `SELECT e.id, e.first_name, e.last_name, title, salary, d.name AS department, CONCAT_WS(' ', m.first_name, m.last_name) AS manager
        FROM employees AS e
            INNER JOIN role as r
            ON e.role_id = r.id
            INNER JOIN department as d
            ON r.department_id = d.id
            LEFT JOIN employees as m
            on e.manager_id = m.id;`, (err, res) => {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
};

// CREATE employees
const createEmployee = (employee) => {
    console.log('Creating a new employee...\n');
    connection.query(
        'INSERT INTO employees SET ?',
        employee,
        (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employees updated!`);
        readEmployees();
    });
    
}

// UPDATE employees
const updateEmployee = (employee) => {
    console.log('Updating employee...\n');
    connection.query(
        'UPDATE employees SET ? WHERE ?',
        [
            employee, 
            {
                id: employee.id
            }
        ],
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee updated!`);
            readEmployees();
        }
    );
}

// DELETE employees
const deleteEmployee = (employee) => {
    console.log('Deleting employee...\n');
    connection.query(
        'DELETE FROM employees WHERE ?',
        {
            id: employee.id
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee deleted!`);
            readEmployees();
        }
    );
}
