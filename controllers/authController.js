const authService = require("../services/authService");
const logger = require("../config/logger");

// const authService = require("../services/authService");

exports.register = async (req, res) => {
  try {
    console.log("Complete req.file:", req.file);

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Profile picture is required." });
    }

    // Get the Cloudinary URL (correct way)
    const pictureUrl = req.file.path;
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
