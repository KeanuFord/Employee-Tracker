\c employee_tracker_db;

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Tom', 'Holland', 2, null);


SELECT employee.id, employee.first_name, employee.last_name, title, salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employees employee
JOIN role
ON role_id = role.id
JOIN department
ON department_id = department.id
LEFT JOIN employees manager
manager.id = employee.manager_id;