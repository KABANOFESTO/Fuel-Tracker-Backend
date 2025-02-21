// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const DriverController = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  validateDriverName,
  validateLicenseNumber,
  validateVehicleId,
  handleValidationErrors,
} = require("../middlewares/driverMiddleware");
// Driver routes
router.get("/all", authMiddleware, DriverController.getAllDrivers);
router.get("/:id", authMiddleware, DriverController.getDriverById);
router.post(
  "/register",
  validateDriverName,
  validateLicenseNumber,
  validateVehicleId,
  handleValidationErrors,
  authMiddleware,
  DriverController.createDriver
);
router.put(
  "/update/:licensenumber",
  validateDriverName,
  validateLicenseNumber,
  validateVehicleId,
  handleValidationErrors,
  authMiddleware,
  DriverController.updateDriver
);
router.delete(
  "/delete/:id",
  // validateLicenseNumber,
  DriverController.deleteDriver
);
// New route to get driver by vehicleId
router.get(
  "/vehicle/:vehicleId",
  authMiddleware,
  DriverController.getDriverByVehicleId
);
module.exports = router;
