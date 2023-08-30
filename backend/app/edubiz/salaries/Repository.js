const { Op } = require("sequelize")
const Salaries = require("../../models/salaries")

class SalaryRepository {
    static async createSalary(payload) {
        const salary = await Salaries.create(payload)
        return salary
    }

    static async getSalaryById(id) {
        const salary = await  Salaries.findByPk(id)
        return salary
    }
   
    static async getSalaries() {
        const salary = await Salaries.findAll({})
        return salary
    }

    static async getSalaryByTutorId(id) {
        const salary = await Salaries.findOne({
            where: {
                tutorId: {
                    [Op.eq]: id
                }
            }
        })
        return salary
    }

    static async destroy(id) {
        const salary = await Salaries.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return salary
    }
}

module.exports = SalaryRepository