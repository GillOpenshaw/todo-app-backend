const express = require("express");
const serverless = require("serverless-http");
const mysql = require("mysql"); // connect to database

const app = express(); // get a new express application

const connection = mysql.createConnection({
  host: process.env.DB_HOST, // from RDS
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
}); // add values for this to work from end point

// Connect to mysql via command line

// do we want it to respond to get request, post request etc


app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM Tasks", function (err, result, fields) { //error result fields
    if (err !== null) { // Response 200 is ok, all good
      console.log("Error fetching tasks", err);
      // Respond to end client with suitable response
      // Use .status then sets status code but not response
      // Use .send then also sends an error message response
      response.send(500);
      // Otherwise, send the success response
    } else {
      response.json({ tasks: result });
    } // returns database items to browser. EndPoint
  });
}); // when called will receive object about request and object about response

// app.post("/tasks", function(request, response) {
  
//   const taskToBeSaved = request.body;

//   connection.query("INSERT INTO Tasks SET ?", taskToBeSaved, function (error, results, fields) {
//     if (error) {
//       console.log("Error saving new task", error);
//       response.status(500).json ({
//         error: error
//       });
//     } else {
//       response.json({
//         taskId: results.insertId
//       });
//     }
//   });
// });

// access id with request.params.id linked with yml file
app.delete("/tasks/:id", function (request, response) {
  const taskId = request.params.id;
  console.log(taskId);
  // sanitise user input with the taskId
  connection.query("DELETE FROM Tasks WHERE TaskId =  ?", [taskId], function (err, result, fields) {
    if (err !== null) { 
      console.log("Something wrong deleting tasks", err);
      response.send(500);
    } else {
    response.send("Item Deleted")
  }
});
});

module.exports.handler = serverless(app);

//environment variables can be accessed from the code but are not in the code e.g. for password not to be hardcoded.

// go to lambda and set environment variables
