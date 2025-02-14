// services/driverService.js
const DriverRepository = require("../repositories/driverRepository");

class DriverService {
  static async getAllDrivers() {
    return await DriverRepository.getAllDrivers();
  }

  static async getDriverById(id) {
    return await DriverRepository.getDriverById(id);
  }

  static async createDriver(driverData) {
    return await DriverRepository.createDriver(driverData);
  }

  static async updateDriver(id, updateData) {
    return await DriverRepository.updateDriver(id, updateData);
  }

  static async deleteDriver(id) {
    return await DriverRepository.deleteDriver(id);
  }
}

module.exports = DriverService;
