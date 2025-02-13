// services/userService.js
const userRepository = require("../repositories/userRepository");

exports.fetchAllUsers = async () => {
  return await userRepository.getAllUsers();
};
