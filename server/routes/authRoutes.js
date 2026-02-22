const express = require("express");
const router = express.Router();

const { registerUser, LoginUser } = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", LoginUser);

// Logout
router.post("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
