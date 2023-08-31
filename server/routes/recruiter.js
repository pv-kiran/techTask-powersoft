const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/authMiddleware");
const Schedule = require("../models/schedule");

// @type - GET
// description - retrieve all the schedules
router.get("/schedule", isLoggedIn, async (req, res) => {
  const recruiterId = req.userId;
  try {
    const schedules = await Schedule.find({ recruiterId: recruiterId });
    res.status(200).json({
      status: true,
      schedules,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      errorInfo: "Internal Server Error",
    });
  }
});

// @type - POST
// description - add a new schedule by recruiter
router.post("/schedule", isLoggedIn, async (req, res) => {
  const recruiterId = req.userId;
  const { start, end, title, description } = req.body;
  try {
    const newSchedule = await Schedule.create({
      recruiterId,
      start: new Date(start),
      end: new Date(end),
      title,
      description,
    });
    res.status(201).json({ newSchedule });
  } catch (err) {
    res.status(500).json({ errorInf: "Internal Server Error" });
  }
});

module.exports = router;
