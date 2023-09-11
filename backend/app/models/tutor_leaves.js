const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize")

const TutorLeaves = sequelize.define("tutor_leaves", {
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
        type: DataTypes.JSON,
    },
}, {
    paranoid: true,
})

module.exports = TutorLeaves