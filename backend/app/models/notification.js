const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Notifications = sequelize.define("notification", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
    },
    description: {
        type: DataTypes.TEXT('long'),
    },
    is_read: {
        type: DataTypes.TEXT('long'),
    },
    api_uri: {
        type: DataTypes.TEXT('long'),
    }
}, {
    paranoid: true,
})

module.exports = Notifications