const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config')

const Role = sequelize.define('role', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  }
}, {
  // Other model options go here
  timestamps: true,
  createdAt: 'createdOn',
  updatedAt: 'updatedOn',
  tableName: 'Role'
});


module.exports = Role;