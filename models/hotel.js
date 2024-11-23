const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config');

const Hotel = sequelize.define(
  'Hotel',
  {
    name: { type: DataTypes.STRING, allowNull: false },
    stars: { type: DataTypes.INTEGER, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    address: { type: DataTypes.STRING, allowNull: false },
    district: { type: DataTypes.STRING, allowNull: true },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    placeId: { type: DataTypes.STRING, allowNull: false },
    thumb: { type: DataTypes.STRING, allowNull: true },
    images: { type: DataTypes.JSON, allowNull: true },
    amenities: { type: DataTypes.JSON, allowNull: true },
    pois: { type: DataTypes.JSON, allowNull: true },
    reviews: { type: DataTypes.JSON, allowNull: true },
    category: { type: DataTypes.STRING, allowNull: false }, 
  },
  {
    tableName: 'hotels',
    timestamps: true,
  }
);

module.exports = Hotel;
