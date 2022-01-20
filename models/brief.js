const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Brief = sequelize.define('brief', {
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
}, {
    // Other model options go here
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
    tableName: 'Brief'
});

module.exports = Brief;