// repositories/vehicleRepository.js
const Vehicle = require("../models").Vehicle;

exports.getAllVehicles = async () => await Vehicle.findAll();

exports.getVehicleById = async (id) => await Vehicle.findByPk(id);

exports.getVehicleByPlate = async (plateNumber) =>
  await Vehicle.findOne({ where: { plateNumber } });

exports.createVehicle = async (data) => await Vehicle.create(data);

exports.updateVehicle = async (id, data) =>
  await Vehicle.update(data, { where: { id } });

exports.deleteVehicle = async (id) =>
  await Vehicle.destroy({ where: { id } });
