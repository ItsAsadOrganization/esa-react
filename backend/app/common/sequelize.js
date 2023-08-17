const { Sequelize } = require("sequelize");
const logger = require("./logging");
// const Users = require("../models/users");


let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        port: process.env.DB_PORT || 5432,
        define: {
            timestamps: true,
            freezeTableName: true
        },
    },

);

module.exports = sequelize