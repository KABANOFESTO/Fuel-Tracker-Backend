// src/repositories/userRepository.js
const User = require("../models").User;

exports.getAllUsers = async () => {
  return await User.findAll({ attributes: { exclude: ["password"] } });
};
