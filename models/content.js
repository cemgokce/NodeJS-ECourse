const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Content = sequelize.define('content', {
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
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    file: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
}, {
    // Other model options go here
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
    tableName: 'Content'
});

module.exports = Content;