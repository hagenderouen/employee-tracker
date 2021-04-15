-- View all employees -- 
SELECT e.id, e.first_name, e.last_name, title, salary, d.name AS department, CONCAT_WS(' ', m.first_name, m.last_name) AS manager
FROM employee AS e
	INNER JOIN role as r
    ON e.role_id = r.id
    INNER JOIN department as d
    ON r.department_id = d.id
    LEFT JOIN employee as m
    on e.manager_id = m.id;