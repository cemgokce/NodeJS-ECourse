const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const price = require("./price");


const CoursePrice = sequelize.define('coursePrice', {
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
  tableName: 'CoursePrice',
});

course.belongsToMany(price, { through: CoursePrice, foreignKey: { allowNull: false, name: 'courseId' } });
price.belongsToMany(course, { through: CoursePrice, foreignKey: { allowNull: false, name: 'priceId' } });
CoursePrice.belongsTo(course);
CoursePrice.belongsTo(price);
course.hasMany(CoursePrice, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
price.hasMany(CoursePrice, { foreingKey: { name: "priceId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CoursePrice;