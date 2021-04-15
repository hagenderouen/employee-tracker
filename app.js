const mysql = require('mysql');
const cTable = require('console.table');
// requie('inquirer')
require('dotenv').config();
const Employee = require('./models/employee');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: process.env.MYSQL_PW,
    database: 'employee_tracker_db',
});

// READ employees
const readEmployees = () => {
    console.log('Selecting all employees...\n');
    connection.query(
        `SELECT e.id, e.first_name, e.last_name, title, salary, d.name AS department, CONCAT_WS(' ', m.first_name, m.last_name) AS manager
        FROM employee AS e
            INNER JOIN role as r
            ON e.role_id = r.id
            INNER JOIN department as d
            ON r.department_id = d.id
            LEFT JOIN employee as m
            on e.manager_id = m.id;`, (err, res) => {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
};

// CREATE employees
const createEmployee = (employee) => {
    console.log('Creating a new employee...\n');
    connection.query('INSER INTO employees SET ?', employee, (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employees updated!\n`);
        readEmployees();
    });
}

// UPDATE employees
// DELETE employees

// Departments: sales, engineering, accounting
// Roles: sales rep, software engineer, accountant

// * Functionality
// Add departments, roles, employees
// View departments, roles, employees
// Update employee roles