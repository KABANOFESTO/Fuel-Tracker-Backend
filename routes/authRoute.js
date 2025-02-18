const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { validateRegister } = require("../middlewares/userMiddleware");
const upload = require("../middlewares/upload");

router.post(
  "/register",
  upload.single("picture"), // This must come FIRST to handle the file upload
  AuthController.register
);

router.post("/login", AuthController.login);
router.post("/refresh-token", AuthController.refreshToken);
router.delete("/logout", AuthController.logout);

module.exports = router;
