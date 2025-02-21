const driverRepository = require("../repositories/DriverRepository");

class DriverService {
  static async getAllDrivers() {
    return await driverRepository.getAllDrivers();
  }
  // get by id
  static async getDriverById(id) {
    return await driverRepository.getDriverById(id);
  }

  static async createDriver(driverData) {
    return await driverRepository.createDriver(driverData);
  }

  static async updateDriver(licenseNumber, updateData) {
    return await driverRepository.updateDriverByLicenseNumber(
      licenseNumber,
      updateData
    );
  }

  static async deleteDriver(id) {
    return await driverRepository.deleteDriver(id);
  }
  // New method to get driver by vehicleId
  static async getDriverByVehicleId(vehicleId) {
    return await driverRepository.getDriverByVehicleId(vehicleId);
  }
}

module.exports = DriverService;
