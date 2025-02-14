// services/vehicleService.js
const vehicleRepository = require("../repositories/vehicleRepository");

exports.getAllVehicles = () => vehicleRepository.getAllVehicles();

exports.getVehicleById = (id) => vehicleRepository.getVehicleById(id);

exports.getVehicleByPlate = (plateNumber) =>
  vehicleRepository.getVehicleByPlate(plateNumber);

exports.createVehicle = (data) => vehicleRepository.createVehicle(data);

exports.updateVehicle = (id, data) => vehicleRepository.updateVehicle(id, data);

exports.deleteVehicle = (id) => vehicleRepository.deleteVehicle(id);
