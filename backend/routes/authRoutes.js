const express = require("express");
const {
  resetPassword,
  forgotPassword,
  login,
  register,
  refreshToken,
  logout,
} = require("../controllers/authController");
const router = express.Router();

// Register a new user
router.post("/register", register);

// Login a user
router.post("/login", login);

// Refresh access token
router.post("/refresh-token", refreshToken);

// Logout a user
router.post("/logout", logout);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password", resetPassword);

module.exports = router;
