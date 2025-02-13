"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FuelPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FuelPrice.init(
    {
      fuelType: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      stationId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "FuelPrice",
    }
  );
  FuelPrice.associate = (models) => {
    FuelPrice.belongsTo(models.Station, { foreignKey: "stationId" });
  };

  return FuelPrice;
};
