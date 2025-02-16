// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { validateRegister } = require("../middlewares/userMiddleware");
router.post("/register", validateRegister, AuthController.register);
router.post("/login", AuthController.login);
// Protect this route with middleware
router.post("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);

module.exports = router;
