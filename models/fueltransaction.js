"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FuelTransaction extends Model {
    static associate(models) {
      FuelTransaction.belongsTo(models.Station, { foreignKey: "stationId" });
      FuelTransaction.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
      FuelTransaction.belongsTo(models.User, { foreignKey: "operatorId" });
      FuelTransaction.belongsTo(models.Driver, { foreignKey: "driverId" });
    }
  }
  FuelTransaction.init(
    {
      stationId: DataTypes.INTEGER,
      vehicleId: DataTypes.INTEGER, // Changed from VehiclePlateNumber to vehicleId
      operatorId: DataTypes.INTEGER,
      driverId: DataTypes.INTEGER,
      fuel_type: DataTypes.ENUM("petrol", "diesel"),
      total_litres: DataTypes.DECIMAL,
      totalPrice: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "FuelTransaction",
    }
  );

  return FuelTransaction;
};
