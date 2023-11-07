const { Op } = require("sequelize")
const Designations = require("../../models/designation")


class DesignationReqpository {
    static async getAllDesignation() {
        const response = await Designations.findAll({})
        return response
    }

    static async createDesignation(payload) {
        const response = await Designations.create(payload)
        return response
    }

    static async getDesignatinById(id) {
        const response = await Designations.findByPk(id)
        return response
    }

    static async update(id, payload) {
        const response = await Designations.update(payload, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return response
    }

    static async remove(id) {
        const response = await Designations.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return response
    }
}

module.exports = DesignationReqpository