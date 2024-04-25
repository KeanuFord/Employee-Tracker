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

