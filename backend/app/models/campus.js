const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Campus = sequelize.define("campus", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING(255),
    },
}, {
    paranoid: true,
})

module.exports = Campus