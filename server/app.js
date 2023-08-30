// for initializing express app
const express = require("express");
// function to connect with databse
const { connectDB } = require("./db/connection");
// for using the envioronment variable through out the application
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 4000;

// application middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes for authentication - candidate and recruiter
const candidateAuth = require("./routes/candidateAuth");
const recruiterAuth = require("./routes/recruiterAuth");

// application route setup - authenticatoin
app.use("/api/candidate/auth", candidateAuth);
app.use("/api/recruiter/auth", recruiterAuth);

// database connection and running the server app
const connect = async () => {
  // connecting the db
  await connectDB();
  // runniing the application
  app.listen(4000, () => {
    console.log(`server is running at ${PORT}`);
  });
};

connect();
