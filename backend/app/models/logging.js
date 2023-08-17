const { DataTypes } = require("sequelize");
const sequelize = require("../common/sequelize");


const Logging = sequelize.define("logging", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    req_config: {
        type: DataTypes.JSON,
    },
    res_config: {
        type: DataTypes.JSON,
        allowNull: false
    },
}, {
    paranoid: true
})

module.exports = Logging