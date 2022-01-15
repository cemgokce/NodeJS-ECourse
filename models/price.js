const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Price = sequelize.define('price', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(80),
    allowNull: true
  },
  try: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  usd: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  euro: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  // Other model options go here
  timestamps: true,
  createdAt: 'createdOn',
  updatedAt: 'updatedOn',
  tableName: 'Price'
});

module.exports = Price;