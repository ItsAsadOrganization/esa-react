const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const AppConfig = sequelize.define("app_config", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
    },
    config: {
        type: DataTypes.TEXT('long'),
    },
}, {
    paranoid: true,
})

module.exports = AppConfig