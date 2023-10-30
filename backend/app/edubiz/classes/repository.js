const { Op } = require("sequelize")
const Classes = require("../../models/classes")

class ClassesRepository {
    static async getAllClasses() {
        const classes = await Classes.findAll({})
        return classes
    }

    static async createClass(payload) {
        const classes = await Classes.create(payload)
        return classes
    }

    static async getClassById(id) {
        const classes = await Classes.findByPk(id)
        return classes
    }

    static async updateClass(id, payload) {
        const classes = await Classes.update(payload, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return classes
    }

    static async delete(id) {
        const classes = await Classes.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return classes
    }
}

module.exports = ClassesRepository