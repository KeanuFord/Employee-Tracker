const inquirer = require('inquirer');
const { Pool } = require('pg');


// Connect to database
const pool = new Pool(
    {
        // TODO: Enter PostgreSQL username
        user: 'postgres',
        // TODO: Enter PostgreSQL password
        password: 'password',
        host: 'localhost',
        database: 'employee_tracker_db',
    },
    console.log(`Connected to the employee_tracker_db database.`)
)
pool.connect();

function start() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: [
                    'View all employees',
                    'View all departments',
                    'View all roles',
                    'Add an employee',
                    'Add a department',
                    'Add a role',
                    'Update an employee role',
                    'Exit'
                ]
            }
        ])
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    viewEmployees();
                    break;
                case 'View all departments':
                    viewDepartments();
                    break;
                case 'View all roles':
                    viewRoles();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    pool.end();
                    break;
            }
        });
}

start();

function viewEmployees() {
    pool.query(
      `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, title, salary,  CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employees employee
      JOIN roles role
      ON role_id = role.id
      JOIN departments department
      ON department_id = department.id
      LEFT JOIN employees manager
      ON manager.id = employee.manager_id;`,
        (err, res) => {
            if (err) throw err;
            console.table(res.rows);
            start();
        }
    );
}

function viewDepartments() {
    pool.query(
        `SELECT * FROM departments`,
        (err, res) => {
            if (err) throw err;
            console.table(res.rows);
            start();
        }
    );
}

function viewRoles() {
    pool.query(
        `SELECT roles.id, title, salary, department.name AS department
        FROM roles
        JOIN departments department
        ON department_id = department.id;`,
        (err, res) => {
            if (err) throw err;
            console.table(res.rows);
            start();
        }
    );
}

function addEmployee() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter employee first name:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter employee last name:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter employee role ID:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter employee manager ID:'
            }
        ])
        .then((answer) => {
            pool.query(
                `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                VALUES ($1, $2, $3, $4)`,
                [answer.first_name, answer.last_name, answer.role_id, answer.manager_id],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee ${answer.first_name} ${answer.last_name} added.`);
                    start();
                }
            );
        });
}

function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter department name:'
            }
        ])
        .then((answer) => {
            pool.query(
                `INSERT INTO departments (name)
                VALUES ($1)`,
                [answer.name],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Department ${answer.name} added.`);
                    start();
                }
            );
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter role title:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter role salary:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter department ID:'
            }
        ])
        .then((answer) => {
            pool.query(
                `INSERT INTO roles (title, salary, department_id)
                VALUES ($1, $2, $3)`,
                [answer.title, answer.salary, answer.department_id],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Role ${answer.title} added.`);
                    start();
                }
            );
        });
}

function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter employee ID:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter new role ID:'
            }
        ])
        .then((answer) => {
            pool.query(
                `UPDATE employees
                SET role_id = $1
                WHERE id = $2`,
                [answer.role_id, answer.employee_id],
                (err, res) => {
                    if (err) throw err;
                    console.log(`Employee ${answer.employee_id} role updated.`);
                    start();
                }
            );
        });
}