const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const { validateRegister } = require("../middlewares/userMiddleware");
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
router.post(
  "/change-password",
  validateRegister,
  AuthController.changePassword
);
module.exports = router;
