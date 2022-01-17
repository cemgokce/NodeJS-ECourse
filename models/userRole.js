const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const User = require("./User");
const Role = require("./Role");
const UserRole = sequelize.define("userRole", {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    //   userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Users',
    //         key: 'id'
    //     }
    //   },
    //   roleId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Roles',
    //         key: 'id'
    //     }
    //   }
},
    {
        // Other model options go here
        timestamps: true,
        tableName: "UserRoles",
    }
);

// Relationship with other tables. Essential for including join tables in to the query.
User.belongsToMany(Role, { through: UserRole, foreignKey: { allowNull: false, name: 'userId' } });
Role.belongsToMany(User, { through: UserRole, foreignKey: { allowNull: false, name: 'roleId' } });
UserRole.belongsTo(User);
UserRole.belongsTo(Role);
User.hasMany(UserRole, { foreingKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });
Role.hasMany(UserRole, { foreingKey: { name: "roleId", allowNull: false }, onDelete: "CASCADE" });

module.exports = UserRole;
