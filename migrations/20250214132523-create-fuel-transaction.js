"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("FuelTransactions", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      stationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Stations",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      vehicleId: {
        type: Sequelize.INTEGER, // Changed from VehiclePlateNumber (STRING) to vehicleId (INTEGER)
        allowNull: false,
        references: {
          model: "Vehicles",
          key: "id", // Referencing vehicleId instead of plateNumber
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      operatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Drivers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      fuel_type: {
        type: Sequelize.ENUM("petrol", "diesel"),
        allowNull: false,
      },
      total_litres: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FuelTransactions");
  },
};
