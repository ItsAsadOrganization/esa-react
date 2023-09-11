
const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Tutor = sequelize.define("tutor", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cnic: {
        type: DataTypes.STRING,
    },
    contact: {
        type: DataTypes.STRING,
    },
    emergency_contact: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    joining_date: {
        type: DataTypes.STRING,
    }
}, {
    paranoid: true,
    initialAutoIncrement: 10000
})

module.exports = Tutor