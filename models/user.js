"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Station, {
        foreignKey: "stationId",
        as: "station",
        constraints: false, // Allow NULL for other roles
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [["admin", "station_worker", "manager", "customer"]],
        },
      },
      stationId: {
        type: DataTypes.INTEGER,
        allowNull: true, // NULL for non-workers
        references: {
          model: "Stations",
          key: "id",
        },
        validate: {
          async isValidStation(value) {
            if (this.role === "station_worker" && !value) {
              throw new Error("stationId is required for station workers");
            }
            if (
              this.role !== "station_worker" &&
              value !== null &&
              value !== undefined
            ) {
              throw new Error("Only station workers can have a stationId");
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
