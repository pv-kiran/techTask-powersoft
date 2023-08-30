const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/authMiddleware");
const Candidate = require("../models/candidate");

router.get("/", isLoggedIn, (req, res) => {
  res.json({ message: "Authorized" });
});

module.exports = router;
