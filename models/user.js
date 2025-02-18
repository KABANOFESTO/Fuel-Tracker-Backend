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
        validate: { isEmail: true },
      },
      password: DataTypes.STRING,
      forcePasswordChange: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // User must change password on first login
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isIn: [["admin", "station_worker", "viewer"]] },
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
            if (this.role !== "station_worker" && value) {
              throw new Error("Only station workers can have a stationId");
            }
          },
        },
      },
      picture: {
        type: DataTypes.STRING, // Store file path or URL
        allowNull: true, // User may not upload a picture
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
