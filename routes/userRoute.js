const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { validateUserUpdate } = require("../middlewares/userMiddleware");


router.get("/all", authMiddleware, UserController.getAllUsers);
router.get("/:id", authMiddleware, UserController.getUserById);
router.put("/update/:id",validateUserUpdate,UserController.updateUser);
router.delete("/delete/:id", authMiddleware,UserController.deleteUser);
router.get("/roles", UserController.getRoles);
module.exports = router;
