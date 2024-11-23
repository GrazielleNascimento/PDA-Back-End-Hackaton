const { DataTypes } = require('sequelize');
const { sequelize } = require('../config');
const Category = require('./category');
const HotelChain = require('./hotelChain');

const Hotel = sequelize.define(
  'Hotel',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    stars: { 
      type: DataTypes.INTEGER, 
      allowNull: false 
    },
    latitude: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    longitude: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT, 
      allowNull: true 
    },
    address: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    district: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    city: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    state: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    country: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    placeid: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    thumb: { 
      type: DataTypes.STRING, 
      allowNull: true 
    },
    images: { 
      type: DataTypes.JSON, 
      allowNull: true 
    },
    amenities: { 
      type: DataTypes.JSON,
    },
    pois: { 
      type: DataTypes.JSON, 
      allowNull: true 
    },
    reviews: { 
      type: DataTypes.JSON, 
      allowNull: true 
    },
    createdat: { 
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: DataTypes.NOW 
    },
    updatedat: { 
      type: DataTypes.DATE, 
      allowNull: true 
    },
  },
  {
    tableName: 'hotels',
    timestamps: true,
  }
);

// Relacionamentos
Hotel.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
Hotel.belongsTo(HotelChain, { foreignKey: 'hotelChainId', as: 'hotelChain' });

module.exports = Hotel;
