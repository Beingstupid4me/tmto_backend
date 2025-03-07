// Routes/TechnologiesRouter.js
const express = require("express");
const ensecureAuthenticated = require("../Middlewares/Auth");

const router = express.Router();

// Example secured GET route
router.get("/", ensecureAuthenticated, (req, res) => {
  // You might return technology data here.
  res.status(200).json({ message: "Access granted to technologies route." });
});

module.exports = router;
