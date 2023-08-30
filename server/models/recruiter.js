const mongoose = require("mongoose");

const recruiterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Recruiter = mongoose.model("candidate", recruiterSchema);
module.exports = Recruiter;
