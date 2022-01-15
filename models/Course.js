const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Course = sequelize.define('course', {
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  // Other model options go here
  timestamps: true,
  createdAt: 'createdOn',
  updatedAt: 'updatedOn',
  tableName: 'Course'
});

module.exports = Course;