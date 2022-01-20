const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const rate = require("./rate");


const CourseRate = sequelize.define('courseRate', {
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
  tableName: 'CourseRate',
});

course.belongsToMany(rate, { through: CourseRate, foreignKey: { allowNull: false, name: 'courseId' } });
rate.belongsToMany(course, { through: CourseRate, foreignKey: { allowNull: false, name: 'rateId' } });
CourseRate.belongsTo(course);
CourseRate.belongsTo(rate);
course.hasMany(CourseRate, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
rate.hasMany(CourseRate, { foreingKey: { name: "rateId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CourseRate;