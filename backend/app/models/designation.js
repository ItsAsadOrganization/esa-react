
const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Designations = sequelize.define("designations", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    paranoid: true,
})

module.exports = Designations