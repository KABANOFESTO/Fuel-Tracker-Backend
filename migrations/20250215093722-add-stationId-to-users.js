'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'stationId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Only required for workers, others will be NULL
      references: {
        model: 'Stations',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // If a station is deleted, set stationId to NULL
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'stationId');
  },
};
