const { INTERNAL_SERVER_ERROR, CREATESUCCESS, SUCCESS } = require('../../common/exceptions')
const Repository = require('./Repository')

class SalariesManager {
    static async getSalaryByTutorId(id, next) {
        try {
            const salary = await Repository.getSalaryByTutorId(id)
            throw new SUCCESS({ salary })
        } catch (err) {
            next(err)
        }
    }

    static async postTutorSalary(payload, session, next) {
        try {
            const salary = await Repository.createSalary(payload)
            const _salary = await Repository.getSalaryById(salary.dataValues.id)
            if (!_salary) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ salary: _salary })
        } catch (err) {
            next(err)
        }
    }

    static async deleteSalary(id, next) {
        try {
            const salary = await Repository.destroy(id)
            if (salary) {
                throw new SUCCESS({ message: "Salary Record Deleted" })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SalariesManager