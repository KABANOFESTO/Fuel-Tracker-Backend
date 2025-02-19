// FuelTransactionRepository.js
const {
  FuelTransaction,
  Vehicle,
  User,
  Driver,
  Station,
  FuelPrice,
} = require("../models");
const { Op } = require("sequelize");

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
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

    return await FuelTransaction.findAll({
      where: {
        createdAt: {
          [Op.gte]: twentyFourHoursAgo, // Only fetch transactions in the last 24 hours
        },
      },
      include: [
        {
          model: Vehicle,
          where: { plateNumber },
        },
        User,
        Driver,
        Station,
      ],
      order: [["createdAt", "DESC"]],
    });
  }

  static async getTransactionsByUser(userId) {
    return await FuelTransaction.findAll({
      where: { operatorId: userId },
      include: [Vehicle, Driver, Station],
    });
  }

  static async createTransaction(data) {
    return await FuelTransaction.create({
      stationId: data.stationId,
      vehicleId: data.vehicleId, // Use vehicleId instead of vehiclePlateNumber
      driverId: data.driverId,
      operatorId: data.operatorId,
      fuel_type: data.fuel_type,
      total_litres: data.total_litres,
      totalPrice: data.totalPrice,
    });
  }

  static async deleteTransaction(id) {
    const deleted = await FuelTransaction.destroy({ where: { id } });
    return deleted === 1;
  }

  static async findByOperatorId(operatorId) {
    return await FuelTransaction.findAll({
      where: { operatorId },
      order: [["createdAt", "DESC"]], // Order by latest transactions
    });
  }
}

module.exports = FuelTransactionRepository;
