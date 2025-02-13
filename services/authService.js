const userRepository = require("../repositories/authRepository");
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");

exports.registerUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  return await userRepository.createUser({
    ...userData,
    password: hashedPassword,
  });
};

exports.loginUser = async ({ email, password }) => {
  const user = await userRepository.findByEmail(email);
  if (!user) throw new Error("User not found");

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) throw new Error("Invalid password");

  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
