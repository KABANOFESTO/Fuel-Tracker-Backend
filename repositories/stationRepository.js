// repositories/stationRepository.js
const Station = require("../models").Station;

exports.getAllStations = async () => Station.findAll();
exports.getStationById = async (id) => Station.findByPk(id);
exports.createStation = async (data) => Station.create(data);
exports.updateStation = async (id, data) => {
  const result = await Station.update(data, { where: { id } });
  console.log(`Update result for ID ${id}:`, result);
  return result;
};
exports.deleteStation = async (id) => {
  const result = await Station.destroy({ where: { id } });
  console.log(`Delete result for ID ${id}:`, result);
  return result;
};
