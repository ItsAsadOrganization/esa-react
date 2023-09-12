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
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    group_id: {
        type: DataTypes.INTEGER,
    }
}, {
    paranoid: true,
})

module.exports = Notifications