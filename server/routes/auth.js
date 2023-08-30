const express = require("express");
const router = express.Router();

// controllers
const {
  candidateSignup,
  candidateSignin,
  candidateSignout,
  recruiterSignup,
  recruiterSignin,
  recruiterSignout,
} = require("../controllers/authController");

// @ type - POST
// description - route for candidate signup
router.post("/candidate/signup", candidateSignup);

// @ type - POST
// description - route for candidate signin
router.post("/candidate/signin", candidateSignin);

// @ type - GET
// description - route for candidate signout
router.get("/candidate/signout", candidateSignout);

// @ type - POST
// description - route for recruiter signup
router.post("/recruiter/signup", recruiterSignup);

// @ type - POST
// description - route for recruiter signin
router.post("/recruiter/signin", recruiterSignin);

// @ type - POST
// description - route for recruiter signout
router.get("/recruiter/signout", recruiterSignout);

module.exports = router;
