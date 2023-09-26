const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Queries = sequelize.define("queries", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
    },
    student_name: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING
    },
    config: {
        type: DataTypes.JSON
    }
}, {
    paranoid: true,
})

module.exports = Queries