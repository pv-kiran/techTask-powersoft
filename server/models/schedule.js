const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "recruiter",
  },
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "candidate",
  },
  meetDate: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
});

const Schedule = mongoose.model("schedule", scheduleSchema);
module.exports = Schedule;
