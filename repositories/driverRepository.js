const { Driver } = require("../models");

class DriverRepository {
  static async getAllDrivers() {
    return await Driver.findAll();
  }

  static async getDriverById(id) {
    return await Driver.findByPk(id);
  }

  static async createDriver(driverData) {
    return await Driver.create(driverData);
  }

  static async getDriverByLicenseNumber(licenseNumber) {
    return await Driver.findOne({ where: { licenseNumber } });
  }

  static async updateDriverByLicenseNumber(licenseNumber, updateData) {
    const driver = await Driver.findOne({ where: { licenseNumber } });
    if (!driver) return null;
    return await driver.update(updateData);
  }

  static async deleteDriver(id) {
    const driver = await Driver.findByPk(id);
    if (!driver) return false;
    await driver.destroy();
    return true;
  }
  // New method to get driver by vehicleId
  static async getDriverByVehicleId(vehicleId) {
    return await Driver.findOne({ where: { vehicleId } });
  }
}
module.exports = DriverRepository;
