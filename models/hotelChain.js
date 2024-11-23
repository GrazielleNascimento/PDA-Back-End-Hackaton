const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const HotelChain = sequelize.define(
  'HotelChain',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'hotel_chains',
    timestamps: true,
  }
);

module.exports = HotelChain;
