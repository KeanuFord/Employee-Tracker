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