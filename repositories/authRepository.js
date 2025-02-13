// src/repositories/userRepository.js
const User = require("../models").User;

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
