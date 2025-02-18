const authService = require("../services/authService");
const logger = require("../config/logger");

// const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    console.log("Complete req.file:", req.file);

    // Set pictureUrl to null if no file is provided
    const pictureUrl = req.file ? req.file.path : null;
    console.log("Cloudinary URL being saved:", pictureUrl);

    const user = await authService.registerUser(req.body, pictureUrl);
    logger.info(`User registered: ${user.email}`);

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    logger.error(
      `Registration failed for ${req.body.email || "unknown"}: ${error.message}`
    );
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await authService.loginUser({ email, password });
    logger.info(`User logged in: ${email}`);
    res.status(200).json({ token });
  } catch (error) {
    logger.error(`Login failed for ${email}: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    const newAccessToken = await authService.refreshAccessToken(refreshToken);
    res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    logger.error(`Failed to refresh token: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.logout = async (req, res) => {
  const { token: refreshToken } = req.body; // Accept 'token' as refreshToken

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is missing" });
  }

  try {
    const response = await authService.logoutUser(refreshToken);
    res.status(200).json(response);
  } catch (error) {
    console.error(`Logout failed: ${error.message}`);
    res.status(400).json({ message: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id; // User ID from JWT authentication

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both old and new passwords are required" });
    }

    await authService.changePassword(userId, oldPassword, newPassword);
    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await authService.forgotPassword(email);
    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    await authService.resetPassword(token, newPassword);
    res.status(200).json({ message: "Password successfully reset." });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
