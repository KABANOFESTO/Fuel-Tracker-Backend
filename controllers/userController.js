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
