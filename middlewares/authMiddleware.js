const { verifyToken } = require("../utils/jwtUtils");

const authMiddleware = (req, res, next) => {
  console.log("Auth Middleware Invoked");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token);
    console.log("Decoded Token:", decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token Verification Failed:", error.message);
    res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

module.exports = authMiddleware;
