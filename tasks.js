const express = require("express");
const serverless = require("serverless-http");

const app = express(); // get a new express application

// do we want it to respond to get request, post request etc

app.get("/tasks", function (request, response) {
  console.log(request);
  const username = request.query.username;
  response.json({
    message: `Username ${username} requested the tasks`
})
}); // when called will receive object about request and object about response

module.exports.handler = serverless(app);