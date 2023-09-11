
const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Students = sequelize.define("students", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
        father_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    father_cnic: {
        type: DataTypes.STRING,
    },
    cnic: {
        type: DataTypes.STRING,
    },
    phone_1: {
        type: DataTypes.STRING,
    },
    phone_2: {
        type: DataTypes.STRING,
    },
    phone_3: {
        type: DataTypes.STRING,
    },
    avatar: {
        type: DataTypes.TEXT("long"),
    }
}, {
    initialAutoIncrement: 1000,
    paranoid: true,
})

module.exports = Students