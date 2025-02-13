// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// Protect this route with middleware
router.get("/users", authMiddleware, userController.getAllUsers);
router.post("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);
module.exports = router;
