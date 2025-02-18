const userRepository = require("../repositories/userRepository");
const authRepository = require("../repositories/authRepository");
const refreshTokenRepository = require("../repositories/refreshTokenRepository");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const sendWelcomeEmail = require("../services/emailService");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.registerUser = async (userData, pictureUrl) => {
  try {
    console.log(
      "Data received for registration:",
      userData,
      "Picture URL:",
      pictureUrl
    );

    // Check if the user already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists.");
    }

    // Validate that 'station_worker' role requires a stationId
    if (userData.role === "station_worker" && !userData.stationId) {
      throw new Error("A stationId is required for a station worker.");
    }

    const defaultPassword = "DefaultPass123@";
    const hashedPassword = await hashPassword(defaultPassword);

    // Store Cloudinary URL in the database
    const user = await userRepository.createUser({
      ...userData,
      password: hashedPassword,
      forcePasswordChange: true,
      picture: pictureUrl || null, // Ensure null is stored if no picture
    });

    // Send email with login details
    await sendWelcomeEmail(userData.email, userData.name, defaultPassword);

    return user;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error(error.message || "User registration failed");
  }
};

exports.loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) throw new Error("Invalid password");

  // Generate Tokens
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  const refreshToken = jwt.sign(
    { id: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
  );

  // 🛑 Clear old refresh token if exists
  await refreshTokenRepository.deleteByUserId(user.id);

  // ✅ Save the new refresh token
  await refreshTokenRepository.createRefreshToken({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(
      Date.now() + parseInt(process.env.JWT_REFRESH_EXPIRES_IN) * 1000
    ),
  });

  return { accessToken, refreshToken };
};

exports.refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error("Missing refresh token");

  const tokenEntry = await refreshTokenRepository.findByToken(refreshToken);
  if (!tokenEntry) throw new Error("Invalid refresh token");

  // Verify the refresh token
  try {
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new Error("Invalid or expired refresh token");
  }

  const user = await userRepository.findById(tokenEntry.userId);
  if (!user) throw new Error("User not found");

  const newAccessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return newAccessToken;
};

exports.logoutUser = async (refreshToken) => {
  if (!refreshToken) throw new Error("Missing refresh token");

  const tokenEntry = await refreshTokenRepository.findByToken(refreshToken);
  if (!tokenEntry) {
    throw new Error("Invalid or already logged-out token");
  }

  // Delete the refresh token from the database
  await refreshTokenRepository.deleteByToken(refreshToken);

  return { message: "Logged out successfully" };
};
exports.changePassword = async (userId, oldPassword, newPassword) => {
  console.log(`my used id is ${userId}`);
  const user = await userRepository.findById(userId);
  if (!user) throw new Error("User not found");

  console.log("Stored Hashed Password:", user.password);

  // 🔹 Ensure correct password comparison
  const isMatch = await comparePassword(oldPassword, user.password);
  console.log("Password Comparison Result:", isMatch);

  if (!isMatch) throw new Error("Incorrect old password");

  // 🔹 Hash the new password properly
  const hashedPassword = await hashPassword(newPassword);
  if (!hashedPassword || typeof hashedPassword !== "string") {
    throw new Error("Password hashing failed");
  }

  return await authRepository.updatePassword(userId, hashedPassword);
};

exports.forgotPassword = async (email) => {
  if (!email) throw { status: 400, message: "Email is required." };

  const user = await userRepository.findByEmail(email);
  if (!user) throw { status: 404, message: "User not found." };

  // Generate reset token
  const resetToken = crypto.randomBytes(32).toString("hex");
  await userRepository.updateResetToken(user.id, resetToken);

  // Send email with reset link
  const resetLink = `http://127.0.0.1:5501/reset.html?token=${resetToken}`;
  const subject = "Reset Password";
  const body = `Hello,\n\nClick the link below to reset your password:\n${resetLink}\n\nIf you did not request this, ignore this email.\n\nBest,\nYour Team`;

  await emailService.sendSimpleEmail(user.email, subject, body);
};

exports.resetPassword = async (token, newPassword) => {
  if (!token || !newPassword) throw { status: 400, message: "Token and new password are required." };

  const user = await userRepository.findByResetToken(token);
  if (!user) throw { status: 400, message: "Invalid or expired reset token." };

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await userRepository.updatePassword(user.id, hashedPassword);
};
