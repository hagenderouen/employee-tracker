DROP DATABASE IF EXISTS employee_tracker_db;

CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INTEGER
);

CREATE TABLE employees (
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER
);

INSERT INTO department (name)
VALUES ('accounting'),
('sales'),
('engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('sales rep', 45000, 2),
('software engineer', 55000, 3),
('accountant', 50000, 1);

SELECT * FROM role;

INSERT INTO employees (first_name, last_name, role_id)
VALUES ('Bob', 'Smith', 2),
('Erica', 'Baidu', 1),
('Jimmy', 'John', 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('James', 'Rockefeller', 2, 1);