const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  // accessing the token - can be in autharization header / cookies
  const authToken =
    req.cookies.token || req.headers["authorization"]?.replace("Bearer ", "");

  if (!authToken) {
    return res.status(401).json({
      message: "Token is missing",
    });
  }
  try {
    const decoded = jwt.verify(authToken, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = {
  isLoggedIn,
};
