const express = require("express");
const router = express.Router();
const FuelTransactionController = require("../controllers/FuelTransactionController");
const authMiddleware = require("../middlewares/authMiddleware");
// Get all fuel transactions
router.get("/", FuelTransactionController.getAllTransactions);
// Get all recent fuel transactions (last 24 hours)
router.get("/recent", FuelTransactionController.getRecentTransactions);

// Get a specific fuel transaction by ID
router.get("/:id", FuelTransactionController.getTransactionById);

// Get transactions for a specific vehicle by plate number
router.get(
  "/vehicle/:plateNumber",
  FuelTransactionController.getTransactionsByVehicle
);
router.get(
  "/:operatorId",
  authMiddleware,
  FuelTransactionController.getTransactionsByOperator
);
// Get transactions recorded by a specific station worker (user with role 'station')
// router.get("/user/:userId", FuelTransactionController.getTransactionsByUser);

// Record a new fuel transaction
router.post(
  "/record",
  authMiddleware,
  FuelTransactionController.createTransaction
);

// Delete a fuel transaction by ID
router.delete("/:id", FuelTransactionController.deleteTransaction);

module.exports = router;
