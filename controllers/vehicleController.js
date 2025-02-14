// controllers/vehicleController.js
const vehicleService = require("../services/vehicleService");

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await vehicleService.getAllVehicles();
    res.status(200).json(vehicles);
  } catch (error) {
    next(error);
  }
};

exports.getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

exports.getVehicleByPlate = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.getVehicleByPlate(
      req.params.plateNumber
    );
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json(vehicle);
  } catch (error) {
    next(error);
  }
};

exports.createVehicle = async (req, res, next) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (error) {
    next(error);
  }
};

exports.updateVehicle = async (req, res, next) => {
  try {
    const updated = await vehicleService.updateVehicle(req.params.id, req.body);
    if (!updated[0])
      return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({ message: "Vehicle updated successfully" });
  } catch (error) {
    next(error);
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const deleted = await vehicleService.deleteVehicle(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Vehicle not found" });
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    next(error);
  }
};
