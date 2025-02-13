// utils/passwordUtils.js
const bcrypt = require('@node-rs/bcrypt');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (password, hash) => {
  return await bcrypt.verify(password, hash);
};

module.exports = { hashPassword, comparePassword };