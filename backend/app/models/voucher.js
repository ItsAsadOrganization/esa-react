const { DataTypes } = require("sequelize");
const sequelize = require("../common/sequelize");


const Voucher = sequelize.define("voucher", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date_issued: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    date_expiry: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    config: {
        type: DataTypes.JSON,
        allowNull: false
    },
    payment_mode: {
        type: DataTypes.JSON,
    },
    is_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    paranoid: true
})

module.exports = Voucher