// controllers/userController.js
const userService = require("../services/userService");
const logger = require("../config/logger");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    logger.error(`Failed to fetch users: ${error.message}`);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Failed to get user by ID: ${error.message}`);
    res.status(500).json({ message: "Failed to get user" });
  }
};

// Create new user (Admin only)
exports.createUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const newUser = await userService.createUser({
      username,
      email,
      password,
      role,
    });
    res.status(201).json(newUser);
  } catch (error) {
    logger.error(`Failed to create user: ${error.message}`);
    res.status(500).json({ message: "Failed to create user" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    console.log("Complete req.file:", req.file);

    // Set pictureUrl to null if no file is provided
    const pictureUrl = req.file ? req.file.path : null;
    console.log("Cloudinary URL being updated:", pictureUrl);

    const updates = {
      ...req.body,
      picture: pictureUrl || undefined, // Ensure null is stored if no picture
    };

    const updatedUser = await userService.updateUser(id, updates);
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    logger.error(`Failed to update user: ${error.message}`);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await userService.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Failed to delete user: ${error.message}`);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

// Get available roles
exports.getRoles = async (req, res) => {
  try {
    const roles = await userService.getUserRoles();
    res.status(200).json(roles);
  } catch (error) {
    logger.error(`Failed to get roles: ${error.message}`);
    res.status(500).json({ message: "Failed to get roles" });
  }
};
