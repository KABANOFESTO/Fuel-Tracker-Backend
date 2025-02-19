"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Step 1: Add the columns with allowNull: true
    await queryInterface.addColumn("Drivers", "email", {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null values
      unique: true,
    });

    await queryInterface.addColumn("Drivers", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: true, // Temporarily allow null values
      unique: true,
    });

    // Step 2: Assign a unique default value for existing rows
    await queryInterface.sequelize.query(`
      UPDATE "Drivers"
      SET "email" = CONCAT('user_', id, '@example.com')
      WHERE "email" IS NULL;
    `);

    await queryInterface.sequelize.query(`
      UPDATE "Drivers"
      SET "phoneNumber" = CONCAT('078', LPAD(id::TEXT, 7, '0'))
      WHERE "phoneNumber" IS NULL;
    `);

    // Step 3: Change allowNull to false
    await queryInterface.changeColumn("Drivers", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn("Drivers", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Drivers", "email");
    await queryInterface.removeColumn("Drivers", "phoneNumber");
  },
};
