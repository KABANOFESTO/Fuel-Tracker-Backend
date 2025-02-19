"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Driver.belongsTo(models.Vehicle, { foreignKey: "vehicleId" });
    }
  }

  Driver.init(
    {
      name: DataTypes.STRING,
      licenseNumber: DataTypes.STRING,
      vehicleId: DataTypes.INTEGER,
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isNumeric: true,
          len: [10, 15], // Adjust based on phone number format
        },
      },
    },
    {
      sequelize,
      modelName: "Driver",
    }
  );

  return Driver;
};
