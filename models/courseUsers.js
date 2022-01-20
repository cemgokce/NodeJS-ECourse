const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const user = require("./user");


const CourseUser = sequelize.define('courseUser', {
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
  tableName: 'CourseUser',
});

course.belongsToMany(user, { through: CourseUser, foreignKey: { allowNull: false, name: 'courseId' } });
user.belongsToMany(course, { through: CourseUser, foreignKey: { allowNull: false, name: 'userId' } });
CourseUser.belongsTo(course);
CourseUser.belongsTo(user);
course.hasMany(CourseUser, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
user.hasMany(CourseUser, { foreingKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CourseUser;