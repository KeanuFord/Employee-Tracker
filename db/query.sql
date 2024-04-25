\c employee_tracker_db;

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Tom', 'Holland', 2, null);


SELECT *  FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;
