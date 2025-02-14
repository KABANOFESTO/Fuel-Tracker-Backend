// FuelTransactionRepository.js
const {
  FuelTransaction,
  Vehicle,
  User,
  Driver,
  Station,
  FuelPrice,
} = require("../models");

class FuelTransactionRepository {
  static async getAllTransactions() {
    return await FuelTransaction.findAll({
      include: [Vehicle, User, Driver, Station],
    });
  }

  static async getTransactionById(id) {
    return await FuelTransaction.findByPk(id, {
      include: [Vehicle, User, Driver, Station],
    });
  }

  static async getTransactionsByVehicle(plateNumber) {
    return await FuelTransaction.findAll({
      include: [
        { model: Vehicle, where: { plateNumber } },
        User,
        Driver,
        Station,
      ],
    });
  }

  static async getTransactionsByUser(userId) {
    return await FuelTransaction.findAll({
      where: { operatorId: userId },
      include: [Vehicle, Driver, Station],
    });
  }

  static async createTransaction(data) {
    // Create the fuel transaction directly since calculations are done in the service
    return await FuelTransaction.create({
      stationId: data.stationId,
      vehicleId: data.vehicleId,
      driverId: data.driverId,
      operatorId: data.operatorId,
      fuel_type: data.fuel_type,
      total_litres: data.total_litres,
      totalPrice: data.totalPrice,
      fuelPriceId: data.fuelPriceId,
    });
  }

  static async deleteTransaction(id) {
    const deleted = await FuelTransaction.destroy({ where: { id } });
    return deleted === 1;
  }
}

module.exports = FuelTransactionRepository;
