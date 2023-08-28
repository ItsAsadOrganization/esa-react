const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const PaySlips = sequelize.define("payslips", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    config: {
        type: DataTypes.JSON,
        allowNull: false,
    },
}, {
    paranoid: true,
})
// tutor id

module.exports = PaySlips