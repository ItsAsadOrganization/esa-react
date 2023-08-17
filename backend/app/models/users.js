const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")
const crypto = require("crypto")

const Users = sequelize.define("users", {
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    initialAutoIncrement: 190000,
    paranoid: true,
    hooks: {
        beforeCreate: (user) => {
            const hashedPassword = crypto.createHash("md5").update(user.password).digest("hex")
            user.password = hashedPassword
        },
        beforeUpdate: (user) => {
            const hashedPassword = crypto.createHash("md5").update(user.password).digest("hex")
            user.password = hashedPassword
        },
        beforeFind: (options) => {
            if (options.where && options.where.password) {
                options.where.password = crypto.createHash('md5').update(options.where.password).digest('hex');
            }
        }
    }
})

module.exports = Users