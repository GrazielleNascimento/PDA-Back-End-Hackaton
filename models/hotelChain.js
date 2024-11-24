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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'hotel_chains',
    timestamps: false,
  }
);

module.exports = HotelChain;
