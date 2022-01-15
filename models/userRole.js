const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize.config");
const user = require("./user");
const role = require("./role");
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
user.belongsToMany(role, { through: UserRole, foreignKey: { allowNull: false, name: 'userId' } });
role.belongsToMany(user, { through: UserRole, foreignKey: { allowNull: false, name: 'roleId' } });
UserRole.belongsTo(user);
UserRole.belongsTo(role);
user.hasMany(UserRole, { foreingKey: { name: "userId", allowNull: false }, onDelete: "CASCADE" });
role.hasMany(UserRole, { foreingKey: { name: "roleId", allowNull: false }, onDelete: "CASCADE" });

module.exports = UserRole;
