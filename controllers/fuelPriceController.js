// controllers/fuelPriceController.js
const fuelPriceService = require("../services/fuelPriceService");

// Get all fuel prices
exports.getAllFuelPrices = async (req, res) => {
  try {
    const prices = await fuelPriceService.getAllFuelPrices();
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve fuel prices", error });
  }
};

// Get fuel prices for a specific station
exports.getFuelPricesByStation = async (req, res) => {
  try {
    const { stationId } = req.params;
    const prices = await fuelPriceService.getFuelPricesByStation(stationId);
    if (!prices) {
      return res
        .status(404)
        .json({ message: "No fuel prices found for this station" });
    }
    res.status(200).json(prices);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve fuel prices", error });
  }
};

// Set fuel price for a station
exports.setFuelPrice = async (req, res) => {
  try {
    const newPrice = await fuelPriceService.setFuelPrice(req.body);
    res.status(201).json({ message: "Fuel price set successfully", newPrice });
  } catch (error) {
    res.status(500).json({ message: "Failed to set fuel price", error });
  }
};

// Update fuel price
exports.updateFuelPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await fuelPriceService.updateFuelPrice(id, req.body);
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Fuel price not found" });
    }
    res.status(200).json({ message: "Fuel price updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update fuel price", error });
  }
};

// Remove a fuel price entry
exports.deleteFuelPrice = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await fuelPriceService.deleteFuelPrice(id);
    if (deleted === 0) {
      return res.status(404).json({ message: "Fuel price not found" });
    }
    res.status(200).json({ message: "Fuel price deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete fuel price", error });
  }
};
