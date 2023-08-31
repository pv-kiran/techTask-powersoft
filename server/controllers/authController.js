const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { signupValidation, signinValidation } = require("../utils/validation");

const Candidate = require("../models/candidate");
const Recruiter = require("../models/recruiter");

const candidateSignup = async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;
  // checking for the existance of email
  const candidateExist = await Candidate.findOne({ email: email });
  if (candidateExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // creation of new candidate
  const newCandidate = await Candidate.create({
    ...req.body,
    password: hashedPassword,
  });

  newCandidate.password = undefined;

  res.status(201).json({
    sucess: true,
    newCandidate,
  });
};

const candidateSignin = async (req, res) => {
  // Valiadtion logic
  const { error } = signinValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;

  // checking the existance of the user
  const candidateExist = await Candidate.findOne({ email: email });
  if (candidateExist) {
    // checking the passowrd
    const isCorrectPassword = await bcrypt.compare(
      password,
      candidateExist.password
    );
    // password is correct
    if (isCorrectPassword) {
      // token configuration
      const token = jwt.sign(
        { userId: candidateExist._id },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      candidateExist.token = token;
      candidateExist.password = undefined;

      // for cookie configuration
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        user: candidateExist,
      });
    }
    // incorrect password
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }
  return res.status(404).json({
    success: false,
    message: `Email doesn't exist`,
  });
};

const candidateSignout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Success",
    });
};

const recruiterSignup = async (req, res) => {
  const { error } = signupValidation.validate(req.body);
  // validation logic
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;
  // checking for the existance of email
  const recruiterExist = await Recruiter.findOne({ email: email });
  if (recruiterExist) {
    return res
      .status(409)
      .json({ success: false, message: "Email already exists" });
  }

  // hashing the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // creation of new candidate
  const newRecruiter = await Recruiter.create({
    ...req.body,
    password: hashedPassword,
  });

  newRecruiter.password = undefined;

  res.status(201).json({
    sucess: true,
    newRecruiter,
  });
};

const recruiterSignin = async (req, res) => {
  // Valiadtion logic
  const { error } = signinValidation.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0]?.message,
    });
  }
  const { email, password } = req.body;

  // checking the existance of the user
  const recruiterExist = await Recruiter.findOne({ email: email });
  if (recruiterExist) {
    // checking the passowrd
    const isCorrectPassword = await bcrypt.compare(
      password,
      recruiterExist.password
    );
    // password is correct
    if (isCorrectPassword) {
      // token configuration
      const token = jwt.sign(
        { userId: recruiterExist._id },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      recruiterExist.token = token;
      recruiterExist.password = undefined;

      // for cookie configuration
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        user: recruiterExist,
      });
    }
    // incorrect password
    return res.status(400).json({
      success: false,
      message: "Password is incorrect",
    });
  }
  return res.status(404).json({
    success: false,
    message: `Email doesn't exist`,
  });
};

const recruiterSignout = (req, res) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logout Success",
    });
};

module.exports = {
  candidateSignup,
  candidateSignin,
  candidateSignout,
  recruiterSignup,
  recruiterSignin,
  recruiterSignout,
};
