const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Roles = sequelize.define("roles", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    permissions: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, {
    timestamps: false
})

module.exports = Roles