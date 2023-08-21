const { Op } = require("sequelize")
const Students = require("../../models/students")
const Voucher = require("../../models/voucher")

class StudentsRepository {
    static async getAllStudents(paranoid) {
        const studnets = await Students.findAll({
            paranoid: paranoid
        })
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

    static async removeRecord(id) {
        const students = await Voucher.findAll({
            where: {
                studentId: {
                    [Op.eq]: id
                }
            }
        }).then(async (Instances) => {
            console.log("\n\n\n\n", { Instances })
            if (Instances.length > 0) {
                Instances.forEach((instance) => {
                    instance.destroy()
                })
            }
            return await Students.destroy({
                where: {
                    id: {
                        [Op.eq]: id
                    }
                },
            })
        })
        return students
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