// Middlewares/Auth.js
const jwt = require("jsonwebtoken");

const ensecureAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "Unauthorised, JWT Token is required" });
  }
  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorised, JWT Token is expired or invalid" });
  }
};

module.exports = ensecureAuthenticated;
