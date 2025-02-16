// repositories/fuelPriceRepository.js
const FuelPrice = require("../models").FuelPrice;

exports.getAllFuelPrices = async () => await FuelPrice.findAll();

exports.getFuelPricesByStation = async (stationId) =>
  await FuelPrice.findAll({ where: { stationId } });

exports.setFuelPrice = async (data) => await FuelPrice.create(data);

exports.updateFuelPrice = async (id, data) =>
  await FuelPrice.update(data, { where: { id } });

exports.getFuelPriceByTypeAndStation = async (fuelType, stationId) => {
  return await FuelPrice.findOne({ where: { fuelType, stationId } });
};
exports.deleteFuelPrice = async (id) =>
  await FuelPrice.destroy({ where: { id } });
