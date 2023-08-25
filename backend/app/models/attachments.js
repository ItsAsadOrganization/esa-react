
const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Attachments = sequelize.define("attachments", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    asset_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    destination: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    paranoid: true,
})

 // id, std/tut id, attachment name, attachment destination

module.exports = Attachments