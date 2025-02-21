const DriverService = require("../services/driverService");

class DriverController {
  static async getAllDrivers(req, res) {
    try {
      const drivers = await DriverService.getAllDrivers();
      res.status(200).json(drivers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getDriverById(req, res) {
    try {
      const driver = await DriverService.getDriverById(req.params.id);
      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }
      res.status(200).json(driver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createDriver(req, res) {
    try {
      const { name, licenseNumber, vehicleId, email, phoneNumber } = req.body;

      if (!email || !phoneNumber) {
        return res
          .status(400)
          .json({ message: "Email and phone number are required" });
      }

      const newDriver = await DriverService.createDriver({
        name,
        licenseNumber,
        vehicleId,
        email,
        phoneNumber,
      });

      res.status(201).json(newDriver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateDriver(req, res) {
    try {
      const { licensenumber } = req.params;
      const licenseNumber = licensenumber;

      if (!licenseNumber) {
        return res.status(400).json({ message: "License number is required" });
      }

      const updatedDriver = await DriverService.updateDriver(
        licenseNumber,
        req.body
      );

      if (!updatedDriver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      res.status(200).json(updatedDriver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteDriver(req, res) {
    try {
      const deleted = await DriverService.deleteDriver(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Driver not found" });
      }
      return res.status(200).json({ message: "Driver deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to delete driver", error: error.message });
    }
  }

  static async getDriverByVehicleId(req, res) {
    try {
      const { vehicleId } = req.params;

      if (!vehicleId) {
        return res.status(400).json({ message: "Vehicle ID is required" });
      }

      const driver = await DriverService.getDriverByVehicleId(vehicleId);

      if (!driver) {
        return res
          .status(404)
          .json({ message: "Driver not found for the given vehicle ID" });
      }

      res.status(200).json(driver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = DriverController;
