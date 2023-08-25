const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Salaries = sequelize.define("salaries", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    incrementValue: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    salary: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
}, {
    paranoid: true,
})

//tutor id
module.exports = Salaries