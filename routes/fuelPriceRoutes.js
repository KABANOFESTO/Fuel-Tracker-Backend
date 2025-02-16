// routes/fuelPriceRoutes.js
const express = require("express");
const router = express.Router();
const fuelPriceController = require("../controllers/fuelPriceController");
// const authMiddleware = require("../middlewares/authMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");
const fuelPriceMiddleware = require("../middlewares/fuelPriceMiddleware");
console.log("FuelPriceController:", fuelPriceController);

// Get all fuel prices
router.get("/all", fuelPriceController.getAllFuelPrices);

// Get fuel prices for a specific station
router.get("/:stationId", fuelPriceController.getFuelPricesByStation);

// Set fuel price for a station (Admin only)
router.post("/setPrice", fuelPriceMiddleware, fuelPriceController.setFuelPrice);

// Update fuel price
router.put("/update/:id",fuelPriceController.updateFuelPrice);

// Delete fuel price
router.delete("/delete/:id", fuelPriceController.deleteFuelPrice);

module.exports = router;
