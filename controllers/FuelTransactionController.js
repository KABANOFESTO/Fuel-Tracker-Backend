// FuelTransactionController.js
const FuelTransactionService = require("../services/FuelTransactionService");

class FuelTransactionController {
  static async getAllTransactions(req, res) {
    try {
      const transactions = await FuelTransactionService.getAllTransactions();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const transaction = await FuelTransactionService.getTransactionById(
        req.params.id
      );
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTransactionsByVehicle(req, res) {
    try {
      const transactions =
        await FuelTransactionService.getTransactionsByVehicle(
          req.params.plateNumber
        );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getTransactionsByUser(req, res) {
    try {
      const transactions = await FuelTransactionService.getTransactionsByUser(
        req.params.userId
      );
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createTransaction(req, res) {
    try {
      const newTransaction = await FuelTransactionService.createTransaction(
        req.body
      );
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTransaction(req, res) {
    try {
      const deleted = await FuelTransactionService.deleteTransaction(
        req.params.id
      );
      if (!deleted) {
        return res.status(404).json({ message: "Transaction not found" });
      }
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FuelTransactionController;
