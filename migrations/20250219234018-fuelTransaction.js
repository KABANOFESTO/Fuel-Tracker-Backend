"use strict";

/** @type {import('sequelize-cli').Migration} */
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
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Vehicles",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      operatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      driverId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Drivers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      fuel_type: {
        type: Sequelize.ENUM("petrol", "diesel"),
        allowNull: false,
      },
      total_litres: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      totalPrice: {
        type: Sequelize.DECIMAL,
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

    // PostgreSQL trigger to auto-update `updatedAt`
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW."updatedAt" = NOW();
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_update_fuel_transactions
      BEFORE UPDATE ON "FuelTransactions"
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
    `);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("FuelTransactions");

    // Remove the trigger and function
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_update_fuel_transactions ON "FuelTransactions";
      DROP FUNCTION IF EXISTS update_updated_at_column();
    `);
  },
};
