const { SUCCESS, INTERNAL_SERVER_ERROR, CREATESUCCESS } = require("../../common/exceptions")
const Repository = require("./repository")


class CampusManager {
    static async create(payload, next) {
        try {
            const campuses = await Repository.createCampus(payload)
            const _campuses = await Repository.getCampusById(campuses.dataValues.id)
            if (!_campuses) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ campuses: _campuses })
        } catch (err) {
            next(err)
        }
    }

    static async getAllCampuses(next) {
        try {
            const campuses = await Repository.getCampuses()
            throw new SUCCESS({ campuses })
        } catch (err) {
            next(err)
        }
    }

    static async updateCampus(id, payload, next) {
        try {
            const campuses = await Repository.updateCampus(id, payload)

            if (campuses === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const _classes = await Repository.getCampusById(id)

            throw new SUCCESS({ campus: _classes })
        } catch (err) {
            next(err)
        }
    }

    static async deleteCampus(id, next) {
        try {
            const campuses = await Repository.deleteCampus(id)
            throw new SUCCESS({ campus: campuses })
        } catch (err) {
            next(err)
        }
    }


}
module.exports = CampusManager