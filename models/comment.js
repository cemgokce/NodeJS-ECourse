const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');

const Comment = sequelize.define('comment', {
    id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    // Other model options go here
    timestamps: true,
    createdAt: 'createdOn',
    updatedAt: 'updatedOn',
    tableName: 'Comment'
});

module.exports = Comment;
