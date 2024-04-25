\c employee_tracker_db;

INSERT INTO departments (name) VALUES
    ('Engineering'),
    ('Sales'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (title, salary, department_id) VALUES
    ('Senior Software Engineer', 120000, 1),
    ('Software Engineer', 100000, 1),
    ('Sales Lead', 80000, 2),
    ('Salesperson', 60000, 2),
    ('Account Manager', 90000, 3),
    ('Accountant', 70000, 3),
    ('Legal Team Lead', 80000, 4),
    ('Lawyer', 90000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('John', 'Doe', 1, null),
    ('Mike', 'Smith', 2, 1),
    ('Jane', 'Doe', 3, null),
    ('Karen', 'Jones', 4, 3),
    ('Alice', 'Williams', 5, null),
    ('Bob', 'Brown', 6, 5),
    ('Charlie', 'Green', 7, null),
    ('David', 'White', 8, 7);
