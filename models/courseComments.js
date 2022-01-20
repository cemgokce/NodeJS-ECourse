const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const comment = require("./comment");

const CourseComment = sequelize.define('courseComment', {
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
  tableName: 'CourseComment',
});

course.belongsToMany(comment, { through: CourseComment, foreignKey: { allowNull: false, name: 'courseId' } });
comment.belongsToMany(course, { through: CourseComment, foreignKey: { allowNull: false, name: 'commentId' } });
CourseComment.belongsTo(course);
CourseComment.belongsTo(comment);
course.hasMany(CourseComment, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
comment.hasMany(CourseComment, { foreingKey: { name: "commentId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CourseComment;