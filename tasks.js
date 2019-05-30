const express = require("express");
const serverless = require("serverless-http");

const app = express(); // get a new express application

// do we want it to respond to get request, post request etc
const itinerary = [
  {
    "id": 1,
    "date": "06 / 08 / 2019",
    "title": "Theatre Tickets",
    "price": 80,
    "completed": true
  },

  {
    "id": 2,
    "date": "07 / 08 / 2019",
    "title": "Hotel",
    "price": 75,
    "completed": false
  }];

app.get("/tasks", function (request, response) {
  console.log(request);
  const username = request.query.username;
  response.json({
    tasks: itinerary
  })

}); // when called will receive object about request and object about response

module.exports.handler = serverless(app);