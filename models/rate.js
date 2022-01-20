const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Rate = sequelize.define('rate', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    point: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
}, {
    // Other model options go here
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
    tableName: 'Rate'
});

module.exports = Rate;