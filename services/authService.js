const userRepository = require("../repositories/userRepository");
const refreshTokenRepository = require("../repositories/refreshTokenRepository");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");

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
  const user = await userRepository.findById(userId);
  if (!user) throw new Error("User not found");

  // Verify the old password
  const isMatch = await comparePassword(oldPassword, user.password);
  if (!isMatch) throw new Error("Incorrect old password");

  // Hash the new password
  const hashedPassword = await hashPassword(newPassword);

  // Update password in the database
  return await userRepository.updatePassword(userId, hashedPassword);
};
