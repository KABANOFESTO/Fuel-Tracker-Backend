// services/stationService.js
const stationRepository = require('../repositories/stationRepository');

exports.getAllStations = () => stationRepository.getAllStations();
exports.getStationById = (id) => stationRepository.getStationById(id);
exports.createStation = (data) => stationRepository.createStation(data);
exports.updateStation = (id, data) => stationRepository.updateStation(id, data);
exports.deleteStation = (id) => stationRepository.deleteStation(id);