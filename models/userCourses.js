const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const User = require("./user");
const Course = require("./Course");


const UserCourse = sequelize.define("userCourse", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    }
},
    {
        // Other model options go here
        timestamps: true,
        tableName: "UserCourse",
    }
);

// Relationship with other tables. Essential for including join tables in to the query.
User.belongsToMany(Course, { through: UserCourse, foreignKey: { allowNull: false, name: 'userId' } });
Course.belongsToMany(User, { through: UserCourse, foreignKey: { allowNull: false, name: 'courseId' } });
UserCourse.belongsTo(User);
UserCourse.belongsTo(Course);
User.hasMany(UserCourse, { foreingKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });
Course.hasMany(UserCourse, { foreingKey: { name: "courseId", allowNull: false }, onDelete: "CASCADE" });

module.exports = UserCourse;
