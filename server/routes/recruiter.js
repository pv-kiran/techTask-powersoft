const express = require("express");
const router = express.Router();

const Recruiter = require("../models/recruiter");
const { isLoggedIn } = require("../middlewares/authMiddleware");

router.get("/", isLoggedIn, (req, res) => {
  res.json({ message: "Authorized" });
});

module.exports = router;
