const { Op } = require("sequelize")
const Students = require("../../models/students")

class StudentsRepository {
    static async getAllStudents() {
        const studnets = await Students.findAll()
        return studnets
    }

    static async createStudent(payload) {
        const studnets = await Students.create(payload)
        return studnets
    }

    static async getStudentById(id) {
        const studnets = await Students.findByPk(id)
        return studnets
    }

    static async getStudentByClass(id) {
        const studnets = await Students.findAll({
            where: {
                classId: {
                    [Op.eq]: id
                }
            }
        })
        return studnets
    }

    static async putStudent(id, payload) {
        const studnets = await Students.update(payload, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return studnets
    }


}

module.exports = StudentsRepository