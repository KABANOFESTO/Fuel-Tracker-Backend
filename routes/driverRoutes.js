// routes/driverRoutes.js
const express = require("express");
const router = express.Router();
const DriverController = require("../controllers/driverController");

// Driver routes
router.get("/all", DriverController.getAllDrivers);
router.get("/:id", DriverController.getDriverById);
router.post("/register", DriverController.createDriver);
router.put("/update/:id", DriverController.updateDriver);
router.delete("/delete/:id", DriverController.deleteDriver);

module.exports = router;
