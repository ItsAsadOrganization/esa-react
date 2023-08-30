const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Salaries = sequelize.define("salaries", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    salary: {
        type: DataTypes.JSON,
    },
}, {
    paranoid: true,
})

//tutor id
module.exports = Salaries