const FuelTransactionService = require("../services/FuelTransactionService");
const logger = require("../config/logger");

class FuelTransactionController {
  static async getAllTransactions(req, res) {
    try {
      const transactions = await FuelTransactionService.getAllTransactions();
      logger.info("Fetched all transactions successfully.");
      res.status(200).json(transactions);
    } catch (error) {
      logger.error(`Failed to fetch transactions: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
  static async getRecentTransactions(req, res) {
    try {
      const recentTransactions =
        await FuelTransactionService.getRecentTransactions();
      logger.info("Fetched recent transactions successfully.");
      res.status(200).json(recentTransactions);
    } catch (error) {
      logger.error(`Failed to fetch recent transactions: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  static async getTransactionById(req, res) {
    try {
      const transaction =
        await FuelTransactionService.getTransactionsByOperator(req.params.id);
      if (!transaction) {
        logger.warn(`Transaction with ID ${req.params.id} not found.`);
        return res.status(404).json({ message: "Transaction not found" });
      }
      logger.info(`Fetched transaction with ID: ${req.params.id}`);
      res.status(200).json(transaction);
    } catch (error) {
      logger.error(`Failed to fetch transaction: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  static async getTransactionsByVehicle(req, res) {
    try {
      const transactions =
        await FuelTransactionService.getTransactionsByVehicle(
          req.params.plateNumber
        );

      logger.info(
        `Fetched recent transactions (last 24h) for vehicle ${req.params.plateNumber}`
      );
      res.status(200).json(transactions);
    } catch (error) {
      logger.error(`Failed to fetch transactions by vehicle: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  static async getTransactionsByUser(req, res) {
    try {
      const transactions = await FuelTransactionService.getTransactionsByUser(
        req.params.userId
      );
      logger.info(`Fetched transactions for user ID: ${req.params.userId}`);
      res.status(200).json(transactions);
    } catch (error) {
      logger.error(`Failed to fetch transactions by user: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  static async createTransaction(req, res) {
    try {
      // Ensure the user is authenticated
      if (!req.user) {
        logger.warn("Unauthorized transaction attempt: No authenticated user.");
        return res
          .status(401)
          .json({ error: "Unauthorized: User not authenticated" });
      }

      logger.info(`Creating transaction for user ID: ${req.user.id}`);

      // Call the service and pass authenticated user
      const newTransaction = await FuelTransactionService.createTransaction(
        req.body,
        req.user
      );

      logger.info(
        `Transaction created successfully by User ID: ${req.user.id}`
      );
      res.status(201).json(newTransaction);
    } catch (error) {
      logger.error(`Transaction creation failed: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteTransaction(req, res) {
    try {
      const deleted = await FuelTransactionService.deleteTransaction(
        req.params.id
      );
      if (!deleted) {
        logger.warn(
          `Transaction with ID ${req.params.id} not found for deletion.`
        );
        return res.status(404).json({ message: "Transaction not found" });
      }
      logger.info(`Transaction with ID ${req.params.id} deleted successfully.`);
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      logger.error(`Failed to delete transaction: ${error.message}`);
      res.status(500).json({ error: error.message });
    }
  }
  static async getTransactionsByOperator(req, res) {
    try {
      const { operatorId } = req.params;
      const transactions =
        await FuelTransactionService.getTransactionsByOperator(operatorId);

      if (!transactions || transactions.length === 0) {
        logger.warn(`No transactions found for operator ID: ${operatorId}`);
        return res
          .status(404)
          .json({ message: "No transactions found for this operator." });
      }

      logger.info(`Fetched transactions for operator ID: ${operatorId}`);
      res.status(200).json(transactions);
    } catch (error) {
      logger.error(
        `Failed to fetch transactions by operator: ${error.message}`
      );
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = FuelTransactionController;
