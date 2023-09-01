const Schedule = require("../models/schedule");

const getSchedule = async (req, res) => {
  const recruiterId = req.userId;
  try {
    const schedules = await Schedule.find({
      recruiterId: recruiterId,
    }).populate("candidateId", "-password");
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
};

const addSchedule = async (req, res) => {
  const recruiterId = req.userId;
  const { start, end, title, description } = req.body;
  try {
    const newSchedule = await Schedule.create({
      recruiterId,
      meetDate: new Date(start).toDateString(),
      start: new Date(start),
      end: new Date(end),
      title,
      description,
    });
    res.status(201).json({ newSchedule });
  } catch (err) {
    res.status(500).json({ errorInf: "Internal Server Error" });
  }
};

module.exports = {
  getSchedule,
  addSchedule,
};
