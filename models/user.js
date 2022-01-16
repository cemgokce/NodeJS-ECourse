const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const User = sequelize.define('user', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING(80),
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(80),
    allowNull: true
  },
  password: {
    type: DataTypes.STRING(80),
    allowNull: true
  }
}, {
  // Other model options go here
  timestamps: true,
  createdAt: 'createdOn',
  updatedAt: 'updatedOn',
  tableName: 'User'
});

module.exports = User;