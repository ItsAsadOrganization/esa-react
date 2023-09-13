const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const Queries = sequelize.define("queries", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    contact_medium: {
        type: DataTypes.ENUM(['pc', 'im','wc', 'wm', 'wvn']),
        comment: "Accepts Phone Call, Instant Message, WhatsApp Call, WhatsApp Message, Whatsapp Voice Note"
    },
    comment: {
        type: DataTypes.TEXT('long')
    },
    follow_up: {
        type: DataTypes.DATEONLY,
        default: null
    },
    ended: {
        type: DataTypes.BOOLEAN,
        default: false
    },
}, {
    paranoid: true,
})
// tutor id

module.exports = Queries