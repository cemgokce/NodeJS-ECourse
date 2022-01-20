const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const content = require("./content");

const CourseContent = sequelize.define('courseContent', {
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
  tableName: 'CourseContent',
});

course.belongsToMany(content, { through: CourseContent, foreignKey: { allowNull: false, name: 'courseId' } });
content.belongsToMany(course, { through: CourseContent, foreignKey: { allowNull: false, name: 'contentId' } });
CourseContent.belongsTo(course);
CourseContent.belongsTo(content);
course.hasMany(CourseContent, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
content.hasMany(CourseContent, { foreingKey: { name: "contentId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CourseContent;