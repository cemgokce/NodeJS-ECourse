const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const price = require("./price");

const CoursePrices = sequelize.define('coursePrices', {
  // Model attributes are defined here
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  }
}, {
  // Other model options go here
  timestamps: true,
  createdAt: 'createdOn',
  updatedAt: 'updatedOn',
  tableName: 'CoursePrices',
});

course.belongsToMany(price, { through: CoursePrices, foreignKey: { allowNull: false, name: 'courseId' } });
price.belongsToMany(course, { through: CoursePrices, foreignKey: { allowNull: false, name: 'priceId' } });
CoursePrices.belongsTo(course);
CoursePrices.belongsTo(price);
course.hasMany(CoursePrices, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
price.hasMany(CoursePrices, { foreingKey: { name: "priceId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CoursePrices;