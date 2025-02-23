const logger = require("../config/logger");
const FuelTransactionRepository = require("../repositories/FuelTransactionRepository");
const FuelPriceRepository = require("../repositories/fuelPriceRepository");
const StationRepository = require("../repositories/stationRepository");
const VehicleRepository = require("../repositories/vehicleRepository");
const DriverRepository = require("../repositories/DriverRepository");
const { Op } = require("sequelize");
class FuelTransactionService {
  static getAllTransactions() {
    return FuelTransactionRepository.getAllTransactions();
  }
  static getRecentTransactions() {
    return FuelTransactionRepository.getRecentTransactions();
  }

  static getTransactionById(id) {
    return FuelTransactionRepository.getTransactionById(id);
  }

  static async getTransactionsByVehicle(plateNumber) {
    return await FuelTransactionRepository.getTransactionsByVehicle(
      plateNumber
    );
  }

  static getTransactionsByUser(userId) {
    return FuelTransactionRepository.getTransactionsByUser(userId);
  }

  static async createTransaction(data, authenticatedUser) {
    try {
      if (!authenticatedUser || !authenticatedUser.id) {
        throw new Error("Unauthorized: Invalid user data");
      }

      logger.info(`Creating transaction for User ID: ${authenticatedUser.id}`);

      const stationExists = await StationRepository.getStationById(
        data.stationId
      );
      if (!stationExists) {
        logger.warn(
          `Transaction failed: Station ID ${data.stationId} not found.`
        );
        throw new Error("Station not found");
      }

      const vehicleExists = await VehicleRepository.getVehicleByPlate(
        data.vehiclePlateNumber
      );
      if (!vehicleExists) {
        logger.warn(
          `Transaction failed: Vehicle PlateNumber ${data.vehiclePlateNumber} not found.`
        );
        throw new Error("Vehicle not found");
      }

      const driverExists = await DriverRepository.getDriverById(data.driverId);
      if (!driverExists) {
        logger.warn(
          `Transaction failed: Driver ID ${data.driverId} not found.`
        );
        throw new Error("Driver not found");
      }

      const fuelPrice = await FuelPriceRepository.getFuelPriceByTypeAndStation(
        data.fuel_type,
        data.stationId
      );
      if (!fuelPrice) {
        logger.warn(
          `Fuel price not found for Station ID ${data.stationId} and fuel type ${data.fuel_type}.`
        );
        throw new Error("Fuel price not found");
      }

      const totalPrice = data.total_litres * fuelPrice.price;

      // Fetch vehicleId from vehicleExists
      const vehicleId = vehicleExists.id;

      const transactionData = {
        stationId: data.stationId,
        vehicleId, // Use vehicleId instead of vehiclePlateNumber
        driverId: data.driverId,
        operatorId: authenticatedUser.id,
        fuel_type: data.fuel_type,
        total_litres: data.total_litres,
        totalPrice,
      };

      const newTransaction = await FuelTransactionRepository.createTransaction(
        transactionData
      );
      logger.info(
        `Transaction created successfully by User ID: ${authenticatedUser.id}, Transaction ID: ${newTransaction.id}`
      );
      return newTransaction;
    } catch (error) {
      logger.error(`Transaction creation failed: ${error.message}`);
      throw error;
    }
  }

  static async deleteTransaction(id) {
    try {
      const deleted = await FuelTransactionRepository.deleteTransaction(id);
      if (!deleted) {
        logger.warn(`Delete failed: Transaction ID ${id} not found.`);
        throw new Error("Transaction not found");
      }
      logger.info(`Transaction ID ${id} deleted successfully.`);
      return { message: "Transaction deleted successfully" };
    } catch (error) {
      logger.error(`Transaction deletion failed: ${error.message}`);
      throw error;
    }
  }

  static async getTransactionsByOperator(operatorId) {
    if (!operatorId) throw { status: 400, message: "Operator ID is required." };

    return await FuelTransactionRepository.findByOperatorId(operatorId);
  }
}

module.exports = FuelTransactionService;
