const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize.config');
const course = require("./Course");
const brief = require("./brief");


const CourseBrief = sequelize.define('courseBrief', {
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
  tableName: 'CourseBrief',
});

course.belongsToMany(brief, { through: CourseBrief, foreignKey: { allowNull: false, name: 'courseId' } });
brief.belongsToMany(course, { through: CourseBrief, foreignKey: { allowNull: false, name: 'briefId' } });
CourseBrief.belongsTo(course);
CourseBrief.belongsTo(brief);
course.hasMany(CourseBrief, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });
brief.hasMany(CourseBrief, { foreingKey: { name: "briefId", allowNull: false }, onDelete: "CASCADE" });

module.exports = CourseBrief;