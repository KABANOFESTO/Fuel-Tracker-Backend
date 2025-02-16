"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vehicle.init(
    {
      plateNumber: DataTypes.STRING,
      model: DataTypes.STRING,
      fuelType: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Vehicle",
    }
  );
  Vehicle.associate = (models) => {
    Vehicle.hasOne(models.Driver, {
      foreignKey: "vehicleId",
      onDelete: "CASCADE",
    });
    Vehicle.hasMany(models.FuelTransaction, {
      foreignKey: "vehicleId",
      onDelete: "CASCADE",
    });
  };

  return Vehicle;
};
