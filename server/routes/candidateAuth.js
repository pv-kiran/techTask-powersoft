const express = require("express");
const router = express.Router();

router.post("/signup", (req, res) => {
  console.log(req.body);
});

router.post("/signin", (req, res) => {
  console.log(req.body);
});

router.post("/signout", (req, res) => {
  res.json({ signout: true });
});

module.exports = router;
