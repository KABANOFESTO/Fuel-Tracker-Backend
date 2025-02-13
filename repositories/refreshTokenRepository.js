// repositories/refreshTokenRepository.js
const { RefreshToken } = require("../models");

// Create a new refresh token
exports.createRefreshToken = async ({ userId, token }) => {
  return await RefreshToken.create({ userId, token });
};

// Find refresh token by token string
exports.findByToken = async (token) => {
  return await RefreshToken.findOne({ where: { token } });
};

// Delete refresh token by token string
exports.deleteByToken = async (token) => {
  return await RefreshToken.destroy({ where: { token } });
};

// Delete all tokens for a user (useful during logout from all devices)
exports.deleteByUserId = async (userId) => {
  return await RefreshToken.destroy({ where: { userId } });
};
