const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const verifyUser = require("../middlewares/verifyUser");
const roleCheck = require("../middlewares/roleCheck");
const router = express.Router();

// Get all users with pagination
router.get("/", verifyUser, roleCheck(["admin"]), getAllUsers);

// Get a single user by ID
router.get("/:id", verifyUser, roleCheck(["admin"]), getUserById);

// Create a new user
router.post("/", verifyUser, roleCheck(["admin"]), createUser);

// Update a user by ID
router.put("/:id", verifyUser, updateUser);

// Delete a user by ID
router.delete("/:id", verifyUser, deleteUser);

module.exports = router;
