// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const User = require("./models/User.js");

// Create an Express application
const app = express();

// Set the port for the server to listen on
const port = 3030;

// Construct the path to the .env file
const envPath = path.join(__dirname, "config", ".env");

// Load environment variables from the .env file
require("dotenv").config({ path: envPath });
const dburl = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
  .connect(dburl)
  .then(console.log("Database is well connected"))
  .catch((err) => {
    console.dir(err);
  });

// Middleware for parsing URL-encoded form data in the request body.
app.use(express.urlencoded({ extended: true }));

//__________________________________________________________________________________

// Route to retrieve all users
app.get("/users", (req, res) => {
  User.find()
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("Users not found!");
      }
    })
    .catch((error) => {
      console.dir(error);
      res.status(500).send("Error occured");
    });
});

//__________________________________________________________________________________

// Route to create a new user
app.post("/new-user", (req, res) => {
  const newUser = req.body;

  User.create(newUser)
    .then((data) => res.send(data))
    .catch((error) => {
      console.dir(error);
      res.status(500).send("Error occured");
    });
});

//__________________________________________________________________________________

// Route to update a user by ID
app.put("/user/:id", (req, res) => {
  const idToFind = req.params.id;
  const newData = req.body;
  
  User.findByIdAndUpdate(idToFind, newData, { new: true })
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("User not found!");
      }
    })
    .catch((error) => {
      console.dir(error);
      res.status(500).send("Error occured");
    });
});

//__________________________________________________________________________________

// Route to delete a user by ID
app.delete("/delete/:id", (req, res) => {
  const idToFind = req.params.id;
  User.findByIdAndDelete(idToFind)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send("User not found!");
      }
    })
    .catch((error) => {
      console.dir(error);
      res.status(500).send("Error occured");
    });
});

//__________________________________________________________________________________

// Start the server and listen on the specified port
app.listen(port, (err) => {
  if (err) {
    console.dir(err);
  } else {
    console.log(`Server running on port ${port}`);
  }
});
