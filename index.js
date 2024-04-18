const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const { Pool } = require('pg');

//Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Static directory
app.use(express.static('public'));

// Connect to database
const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: 'password',
      host: 'localhost',
      database: 'employee_tracker_db',
      port: 5432
    },
    console.log(`Connected to the employee_tracker_db database.`)
  )
  
app.get('/api/employees', (req, res) => {
    res.send('Hello World');
});

app.get('*', (req, res) => {
    res.status(404).send('page not found!');
});

pool.connect().then(()=> {
    app.listen(PORT, function () {
    console.log(`App listening on PORT ${PORT}`);
    });
});