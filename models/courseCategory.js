const {DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const category = require("./category");

const CourseCategory = sequelize.define('courseCategory', {
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
  tableName: 'CourseCategory',
});

course.belongsToMany(category, { through: CourseCategory, foreignKey:{allowNull:false, name:'courseId'}});
category.belongsToMany(course, { through: CourseCategory, foreignKey:{allowNull:false, name:'categoryId'}});
CourseCategory.belongsTo(course);
CourseCategory.belongsTo(category);

module.exports = CourseCategory;