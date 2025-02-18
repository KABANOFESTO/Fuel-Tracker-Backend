// src/repositories/userRepository.js
const User = require("../models").User;

exports.createUser = async (userData) => {
  return await User.create({
    ...userData,
    forcePasswordChange: true, // New users must change password
  });
};

exports.findByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};
