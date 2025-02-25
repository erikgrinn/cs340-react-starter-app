const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8500;



// Middleware:

// If on FLIP, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173 
// EX (FLIP/classwork) http://flip3.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json());

// API Routes for backend CRUD:
// app.use("/api/diagnostic", require("./routes/diagnosticRoutes"));

// Add your Connect DB Activitiy Code Below:
//...

// define a new GET request with express:
/*
    ROUTES
*/
// app.get('/', function(req, res)
//     {
//         // Define our queries
//         query1 = 'DROP TABLE IF EXISTS diagnostic;';
//         query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
//         query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working for myONID!")'; //replace with your ONID
//         query4 = 'SELECT * FROM diagnostic;';

//         // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

//         // DROP TABLE...
//         db.pool.query(query1, function (err, results, fields){

//             // CREATE TABLE...
//             db.pool.query(query2, function(err, results, fields){

//                 // INSERT INTO...
//                 db.pool.query(query3, function(err, results, fields){

//                     // SELECT *...
//                     db.pool.query(query4, function(err, results, fields){

//                         // Send the results to the browser
//                         let base = "<h1>MySQL Results:</h1>"
//                         res.send(base + JSON.stringify(results));
//                     });
//                 });
//             });
//         });
//     });

// Match to your database config route
const db = require('./database/config.js')
// trying wihtout db.pool?
app.get('/api/diagnostic', async (req, res) => {
  try {
    // Await your database queries here
    await db.query('DROP TABLE IF EXISTS diagnostic;');
    await db.query('CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);');
    await db.query('INSERT INTO diagnostic (text) VALUES ("MySQL is working!")');
    const [results] = await db.query('SELECT * FROM diagnostic;');
    // using [results] and not pool can make cleaner output
    // console.log("Query results:", results); // Debugging log


    // res.json() automatically stringifies the JavaScript object to JSON
    res.json(results);


  } catch (error) {
    // Handle Errors
    console.error('Database operation failed:', error);
    res.status(500).send('Server error!');
  }
});

//...
// End Connect DB Activity Code.


const os = require("os");
const hostname = os.hostname();

app.listen(PORT, () => {
  // flip server should automatically match whatever server you're on 
  console.log(`Server running:  http://${hostname}:${PORT}...`);
});
