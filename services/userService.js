// services/userService.js
const userRepository = require("../repositories/userRepository");
const { hashPassword } = require("../utils/passwordUtils");

exports.fetchAllUsers = async () => {
  return await userRepository.getAllUsers();
};

exports.getUserById = async (id) => {
  return await userRepository.findById(id);
};

exports.createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = { ...userData, password: hashedPassword };
  return await userRepository.create(newUser);
};

exports.updateUser = async (id, userData) => {
  try {
    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }
    return await userRepository.updateUser(id, userData);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error.message || "User update failed");
  }
};
exports.deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

exports.getUserRoles = async () => {
  return await userRepository.getAvailableRoles();
};
