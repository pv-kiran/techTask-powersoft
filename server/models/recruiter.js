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
  token: {
    type: String,
  },
  role: {
    type: String,
    default: "recruiter",
  },
});

const Recruiter = mongoose.model("recruiter", recruiterSchema);
module.exports = Recruiter;
