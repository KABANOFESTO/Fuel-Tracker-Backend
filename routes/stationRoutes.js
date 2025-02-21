// routes/stationRoutes.js
const express = require("express");
const stationController = require("../controllers/stationController");
const authMiddleware = require("../middlewares/authMiddleware");
const validateStation = require("../middlewares/stationMiddleware");
const router = express.Router();

// Get all stations
router.get("/all", authMiddleware, stationController.getAllStations);

// Get a single station by ID
router.get(
  "/:id",
  authMiddleware,
  stationController.getStationById
);

// Create a new station (Admin only)
router.post(
  "/create",
  // authMiddleware,
  validateStation,
  stationController.createStation
);

// Update a station by ID
router.put("/update/:id", authMiddleware, stationController.updateStation);

// Delete a station by ID
router.delete("/delete/:id", authMiddleware, stationController.deleteStation);

module.exports = router;
