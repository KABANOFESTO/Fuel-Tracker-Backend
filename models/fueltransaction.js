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
    }
  }
  FuelTransaction.init(
    {
      amount: DataTypes.DECIMAL,
      stationId: DataTypes.INTEGER,
      vehicleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FuelTransaction",
    }
  );
  FuelTransaction.associate = (models) => {
    FuelTransaction.belongsTo(models.Station, { foreignKey: "stationId" });
    FuelTransaction.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
  };

  return FuelTransaction;
};
