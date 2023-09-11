const sequelize = require("../common/sequelize");
const { DataTypes } = require("sequelize");
const Tutor = require("./tutor");
const Students = require("./students");

const StudentsAttendance = sequelize.define("students_attendance", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        unique: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        comment: "1 for in and 0 for out"
    },
}, {
    paranoid: true,
})

module.exports = StudentsAttendance