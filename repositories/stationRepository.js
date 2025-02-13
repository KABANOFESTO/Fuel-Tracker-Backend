// repositories/stationRepository.js
const Station = require("../models").Station;

exports.getAllStations = async () => Station.findAll();
exports.getStationById = async (id) => Station.findByPk(id);
exports.createStation = async (data) => Station.create(data);
exports.updateStation = async (id, data) =>
  Station.update(data, { where: { id } });
exports.deleteStation = async (id) => Station.destroy({ where: { id } });
