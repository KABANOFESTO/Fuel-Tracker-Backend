// services/fuelPriceService.js
const fuelPriceRepository = require("../repositories/fuelPriceRepository");

exports.getAllFuelPrices = () => fuelPriceRepository.getAllFuelPrices();

exports.getFuelPricesByStation = (stationId) =>
  fuelPriceRepository.getFuelPricesByStation(stationId);

exports.setFuelPrice = (data) => fuelPriceRepository.setFuelPrice(data);

exports.updateFuelPrice = (id, data) =>
  fuelPriceRepository.updateFuelPrice(id, data);

exports.deleteFuelPrice = (id) => fuelPriceRepository.deleteFuelPrice(id);
exports.getFuelPriceByStationId = async (stationId) => {
  return await fuelPriceRepository.findFuelPriceByStationId(stationId);
};

exports.getFuelPricesByTypeAndStation = async (fuelType, stationId) => {
  return await fuelPriceRepository.getFuelPriceByTypeAndStation(
    fuelType,
    stationId
  );
};
