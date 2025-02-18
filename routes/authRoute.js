const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { validateRegister } = require("../middlewares/userMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");

router.post(
  "/register",
  (req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
  },
  upload.single("picture"), // 🟢 Ensure multer runs after logging
  AuthController.register
);

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);
router.put("/change-password", authMiddleware, AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
module.exports = router;
