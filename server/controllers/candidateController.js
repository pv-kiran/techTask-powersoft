const Schedule = require("../models/schedule");
const Recruiter = require("../models/recruiter");

const getRecruiters = async (req, res) => {
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
};
const recruiterScheduleBydate = async (req, res) => {
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
};
const getCandidateSchedule = async (req, res) => {
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
};
const bookSchedule = async (req, res) => {
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
};

module.exports = {
  getRecruiters,
  recruiterScheduleBydate,
  getCandidateSchedule,
  bookSchedule,
};
