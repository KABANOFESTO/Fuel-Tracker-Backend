"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Drivers", "email", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    });

    await queryInterface.addColumn("Drivers", "phoneNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [10, 15],
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Drivers", "email");
    await queryInterface.removeColumn("Drivers", "phoneNumber");
  },
};
