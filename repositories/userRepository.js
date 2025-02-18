// src/repositories/userRepository.js
const User = require("../models").User;

// Get all users
exports.getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ["password"] } });
};

// Find user by ID
exports.findById = async (id) => {
  return await User.findByPk(id);
};

// Find user by email
exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Create a new user
exports.createUser = async (userData) => {
  return await User.create(userData);
};

// Update user by ID
exports.updateUser = async (id, updateData) => {
  return await User.update(updateData, { where: { id } });
};

// Delete user by ID
exports.deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};

// Check if email already exists
exports.emailExists = async (email) => {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

// Get users by role
exports.getUsersByRole = async (role) => {
  return await User.findAll({
    where: { role },
    attributes: { exclude: ["password"] },
  });
};

// Get available roles
exports.getAvailableRoles = async () => {
  return await User.findAll({
    attributes: ["role"],
    group: ["role"],
  });
};
