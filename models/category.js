const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Category = sequelize.define('category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
}, {
  // Other model options go here
  timestamps: true,
  createdAt: 'createdOn',
  updatedAt: 'updatedOn',
  tableName: 'Category'
});

module.exports = Category;