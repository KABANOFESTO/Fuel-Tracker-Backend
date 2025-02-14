// FuelTransactionService.js
const FuelTransactionRepository = require('../repositories/FuelTransactionRepository');
const { FuelPrice } = require('../models');

class FuelTransactionService {
  static getAllTransactions() {
    return FuelTransactionRepository.getAllTransactions();
  }

  static getTransactionById(id) {
    return FuelTransactionRepository.getTransactionById(id);
  }

  static getTransactionsByVehicle(plateNumber) {
    return FuelTransactionRepository.getTransactionsByVehicle(plateNumber);
  }

  static getTransactionsByUser(userId) {
    return FuelTransactionRepository.getTransactionsByUser(userId);
  }

  static async createTransaction(data) {
    // Fetch the fuel price based on fuel type and station
    const fuelPrice = await FuelPrice.findOne({
      where: {
      fuelType: data.fuel_type,
      stationId: data.stationId
      }
    });
    if (!fuelPrice) {
      throw new Error('Fuel price not found for the specified type and station');
    }

    // Calculate total cost = total_litres * fuel price
    data.totalPrice = data.total_litres * fuelPrice.price;
    console.log(data);
    return FuelTransactionRepository.createTransaction(data);
  }


  static deleteTransaction(id) {
    return FuelTransactionRepository.deleteTransaction(id);
  }
}

module.exports = FuelTransactionService;