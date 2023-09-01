const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const {
  getRecruiters,
  recruiterScheduleBydate,
  getCandidateSchedule,
  bookSchedule,
} = require("../controllers/candidateController");

router.get("/get/recruiters", isLoggedIn, getRecruiters);

router.get(
  "/get/schedules/:recruiterId/:date",
  isLoggedIn,
  recruiterScheduleBydate
);

router.get("/schedules", isLoggedIn, getCandidateSchedule);

router.post("/schedule/:scheduleId/book", isLoggedIn, bookSchedule);

module.exports = router;
