const connection = require('./config/connection');

const readMain = (cb) => {
    connection.query(
        `SELECT e.id, e.first_name, e.last_name, title, salary, d.name AS department, CONCAT_WS(' ', m.first_name, m.last_name) AS manager
        FROM employees AS e
            INNER JOIN role as r
            ON e.role_id = r.id
            INNER JOIN department as d
            ON r.department_id = d.id
            LEFT JOIN employees as m
            on e.manager_id = m.id;`, (err, res) => {
      if (err) {
          connection.end();
          cb(err, null);
      } else {
        connection.end();
        cb(null, res);
      }
      
    });
};

const createOne = (tableName, data, cb) => {
    console.log(`Inserting into ${tableName}...\n`);
    connection.query(
        'INSERT INTO ?? SET ?',
        [
            tableName,
            data
        ],
        (err, res) => {
        if (err) {
            connection.end();
            cb(err, null);
        } else {
            connection.end();
            console.log(`${res.affectedRows} ${tableName} updated!`);
            cb(null, res);
        }
        
    });  
};

const updateOneById = (tableName, data, cb) => {
    console.log(`Updating ${tableName}...\n`);
    connection.query(
        'UPDATE ?? SET ? WHERE ?',
        [
            tableName,
            data, 
            {
                id: data.id
            }
        ],
        (err, res) => {
            if (err) {
                connection.end();
                cb(err, null);
            } else {
                connection.end();
                console.log(`${res.affectedRows} ${tableName} updated!`);
                cb(null, res);
            }
            
        }
    );
};

const deleteOneById = (tableName, data, cb) => {
    console.log(`Deleting from ${tableName}...\n`);
    connection.query(
        'DELETE FROM ?? WHERE ?',
        [
            tableName,
            {
                id: data.id
            }
        ],
        (err, res) => {
            if (err) {
                connection.end();
                cb(err, null);
            } else {
                connection.end();
                console.log(`${res.affectedRows} employee deleted!`);
                cb(null, res);
            }   
            
        }
    );
};

const readAll = (tableName, cb) => {
    connection.query(
        'SELECT * FROM ??', tableName, (err, res) => {
            if (err) {
                connection.end();
                cb(err, null);
            } else {
                connection.end();
                cb(null, res);
            }
            
        }
    );
};

module.exports = {
    readMain,
    createOne,
    updateOneById,
    deleteOneById,
    readAll
}

