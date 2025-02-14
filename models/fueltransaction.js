"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FuelTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FuelTransaction.belongsTo(models.Station, { foreignKey: "stationId" });
      FuelTransaction.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
      FuelTransaction.belongsTo(models.User, { foreignKey: "operatorId" });
      FuelTransaction.belongsTo(models.Driver, { foreignKey: "driverId" });
      FuelTransaction.belongsTo(models.FuelPrice, { foreignKey: "fuelPriceId" }); // New association
    }
  }
  FuelTransaction.init(
    {
      stationId: DataTypes.INTEGER,
      vehicleId: DataTypes.INTEGER,
      operatorId: DataTypes.INTEGER, // User who recorded the transaction
      driverId: DataTypes.INTEGER, // Driver of the vehicle
      fuel_type: DataTypes.ENUM("petrol", "diesel"), // Fuel type
      total_litres: DataTypes.DECIMAL, // Total litres refueled
      totalPrice: DataTypes.DECIMAL, // Calculated price based on FuelPrice table
      fuelPriceId: DataTypes.INTEGER, // Reference to FuelPrice
    },
    {
      sequelize,
      modelName: "FuelTransaction",
    }
  );

  return FuelTransaction;
};
