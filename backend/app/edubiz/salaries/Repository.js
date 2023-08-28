const { Op } = require("sequelize")
const Salaries = require("../../models/salaries")

class SalaryRepository {
    static async createSalary(payload) {
        const salary = Salaries.create(payload)
        return salary
    }

    static async getSalaryById(id) {
        const salary = Salaries.findByPk(id)
        return salary
    }

    static async getSalaryByTutorId(id) {
        const salary = Salaries.findAll({
            where: {
                tutorId: {
                    [Op.eq]: id
                }
            }
        })
        return salary
    }
}

module.exports = SalaryRepository