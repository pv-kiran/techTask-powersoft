const mongoose = require("mongoose");

const candidateSchema = mongoose.Schema({
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
    default: "candidate",
  },
});

const Candidate = mongoose.model("candidate", candidateSchema);
module.exports = Candidate;
