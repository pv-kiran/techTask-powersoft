const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
const {
  getSchedule,
  addSchedule,
} = require("../controllers/recruiterController");

// @type - GET
// description - retrieve all the schedules
router.get("/schedule", isLoggedIn, getSchedule);

// @type - POST
// description - add a new schedule by recruiter
router.post("/schedule", isLoggedIn, addSchedule);

module.exports = router;
