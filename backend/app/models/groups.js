const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Groups = sequelize.define("groups", {
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

module.exports  = Groups