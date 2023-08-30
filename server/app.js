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

// enabling cors -
const cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));

// parsing the cookie data
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// routes for authentication - candidate and recruiter
const authRoute = require("./routes/auth");
// routes for candidates
const candidateRoutes = require("./routes/candidate");
// routes for recruiters
const recruiterRoutes = require("./routes/recruiter");

// application route setup - authenticatoin
app.use("/api/auth", authRoute);
// appication route setup - candidate features
app.use("/api/candidate", candidateRoutes);

// appication route setup - recruiter features
app.use("/api/recruiter", recruiterRoutes);

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
