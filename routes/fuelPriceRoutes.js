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
// Get fuel prices for a specific station by both fuel type and station
router.get("/getfuelprice", fuelPriceController.getFuelPricesByStation);

// Set fuel price for a station (Admin only)
router.post("/setPrice", fuelPriceMiddleware, fuelPriceController.setFuelPrice);

// Update fuel price
router.put("/update/:id", fuelPriceController.updateFuelPrice);

// Delete fuel price
router.delete("/delete/:id", fuelPriceController.deleteFuelPrice);
router.get(
  "/station/:stationId",
  authMiddleware,
  fuelPriceController.getFuelPriceByStationId
);

module.exports = router;
