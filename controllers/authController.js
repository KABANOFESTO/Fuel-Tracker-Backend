const authService = require("../services/authService");
const logger = require("../config/logger");

exports.register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    logger.info(`User registered: ${user.email}`);
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    logger.error(`Registration failed for ${req.body.email}: ${error.message}`);
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
