const DriverRepository = require("../repositories/DriverRepository");

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

  static async updateDriver(licenseNumber, updateData) {
    return await DriverRepository.updateDriverByLicenseNumber(
      licenseNumber,
      updateData
    );
  }

  static async deleteDriver(id) {
    return await DriverRepository.deleteDriver(id);
  }
  // New method to get driver by vehicleId
  static async getDriverByVehicleId(vehicleId) {
    return await DriverRepository.getDriverByVehicleId(vehicleId);
  }
}

module.exports = DriverService;
