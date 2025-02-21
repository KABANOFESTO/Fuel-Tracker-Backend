// controllers/stationController.js
const stationService = require("../services/stationService");
const logger = require("../config/logger");
exports.getAllStations = async (req, res) => {
  try {
    const stations = await stationService.getAllStations();
    res.status(200).json(stations);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve stations", error });
  }
};

exports.getStationById = async (req, res) => {
  try {
    const station = await stationService.getStationById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });
    res.status(200).json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve station", error });
  }
};

exports.createStation = async (req, res) => {
  try {
    const station = await stationService.createStation(req.body);
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: "Failed to create station", error });
  }
};

exports.updateStation = async (req, res) => {
  try {
    console.log(req.params.id);  // Debugging line

    const updated = await stationService.updateStation(req.params.id, req.body);
    console.log(req.params.id);  // Debugging line
    if (updated[0] === 0) {
      return res.status(404).json({ message: "Station not found" });
    }
    res.status(200).json({ message: "Station updated successfully" });
    
  } catch (error) {
    res.status(500).json({ message: "Failed to update station", error });
  }
};

exports.deleteStation = async (req, res) => {
  try {
    const deleted = await stationService.deleteStation(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Station not found" });
    res.status(200).json({ message: "Station deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete station", error });
  }
};
