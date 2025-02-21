"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    static associate(models) {
      Station.hasMany(models.User, {
        foreignKey: "stationId",
        as: "workers",
      });
      Station.hasMany(models.FuelPrice, { foreignKey: "stationId" });
      Station.hasMany(models.FuelTransaction, { foreignKey: "stationId" });
    }
  }
  Station.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Station",
    }
  );

  return Station;
};
