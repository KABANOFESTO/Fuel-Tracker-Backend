// controllers/driverController.js
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
      const newDriver = await DriverService.createDriver(req.body);
      res.status(201).json(newDriver);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateDriver(req, res) {
    try {
      const updatedDriver = await DriverService.updateDriver(
        req.params.id,
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
        console.error("Error deleting driver:", error);
        res.status(500).json({ message: "Failed to delete driver", error: error.message });
    }
}

}

module.exports = DriverController;
