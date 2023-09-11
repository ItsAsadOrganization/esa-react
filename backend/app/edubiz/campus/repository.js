const Campus = require("../../models/campus")


class CampusRepository {

    static async createCampus(payload) {
        const response = Campus.create(payload)
        return response
    }

    static async updateCampus(id, payload) {
        const response = Campus.update(payload, {
            where: { id }
        })
        return response
    }

    static async getCampusById(id) {
        const response = Campus.findAll({
            where: { id }
        })
        return response
    }

    static async getCampuses() {
        const response = Campus.findAll({})
        return response
    }

    static async removeCampus() {
        const response = Campus.destroy({
            where: { id }
        })
        return response
    }

}

module.exports = CampusRepository