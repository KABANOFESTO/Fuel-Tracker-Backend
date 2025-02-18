const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateUserUpdate } = require("../middlewares/userMiddleware");
const upload = require("../middlewares/upload");

router.get("/all", authMiddleware, UserController.getAllUsers);
router.get("/:id", authMiddleware, UserController.getUserById);
router.put(
  "/update/:id",
  (req, res, next) => {
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);
    next();
  },
  upload.single("picture"),
  validateUserUpdate,
  UserController.updateUser
);
router.delete("/delete/:id", authMiddleware, UserController.deleteUser);
router.get("/roles", UserController.getRoles);
module.exports = router;
