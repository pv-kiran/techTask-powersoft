const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const Schedule = require("../models/schedule");
const Recruiter = require("../models/recruiter");

router.get("/get/recruiters", isLoggedIn, async (req, res) => {
  try {
    const recruiters = await Recruiter.find({}, { password: 0, role: 0 });
    res.status(200).json({
      success: true,
      recruiters,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.get(
  "/get/schedules/:recruiterId/:date",
  isLoggedIn,
  async (req, res) => {
    const { recruiterId, date } = req.params;
    try {
      const schedules = await Schedule.find({
        recruiterId: recruiterId,
        meetDate: date,
        isBooked: false,
      });
      res.status(200).json({
        success: true,
        schedules,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

router.get("/schedules", isLoggedIn, async (req, res) => {
  const candidateId = req.userId;
  try {
    const schedules = await Schedule.find({
      candidateId: candidateId,
    }).populate("recruiterId", "-password");
    res.status(200).json({
      success: true,
      schedules,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/schedule/:scheduleId/book", isLoggedIn, async (req, res) => {
  const { scheduleId } = req.params;
  const { recruiterId } = req.body;
  const candidateId = req.userId;

  try {
    const schedule = await Schedule.find({ _id: scheduleId, recruiterId });
    schedule[0].candidateId = candidateId;
    schedule[0].isBooked = true;
    await schedule[0].save();
    res.json({ success: true, schedule });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

module.exports = router;
