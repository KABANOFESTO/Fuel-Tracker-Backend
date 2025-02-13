"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Station extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Station.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Station",
    }
  );
  Station.associate = (models) => {
    Station.belongsTo(models.User, { foreignKey: "userId" });
    Station.hasMany(models.FuelPrice, { foreignKey: "stationId" });
    Station.hasMany(models.FuelTransaction, { foreignKey: "stationId" });
  };

  return Station;
};
