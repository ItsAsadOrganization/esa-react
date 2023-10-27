
const { INTERNAL_SERVER_ERROR, SUCCESS, CREATESUCCESS } = require('../../common/exceptions')
const NotificationRepository = require('../notification/repository')
const Repository = require('./repository')

class QueryManager {

    static async getAllQueries(next) {
        try {
            const queries = await Repository.getAllQueries()
            if (!queries) {
                throw new SUCCESS({ queries: [] })
            } else {
                throw new SUCCESS({ queries })
            }

        } catch (err) {
            next(err)
        }
    }

    static async getAllQueriesByUId(id, next) {
        try {
            const queries = await Repository.getAllQueriesByUId(id)
            if (!queries) {
                throw new SUCCESS({ queries: [] })
            } else {
                throw new SUCCESS({ queries })
            }

        } catch (err) {
            next(err)
        }
    }


    static async postQuery(payload, next) {
        try {
            const query = await Repository.postQuery(payload)
            const _student = await Repository.getQueryById(query.dataValues.id)
            if (!_student) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            await NotificationRepository.saveNotifications({
                title: "New Query",
                description: `A new query has been added. Tracking Id ${query.dataValues.id}`,
            })
            throw new CREATESUCCESS({ query })
        } catch (err) {
            next(err)
        }
    }


    static async getQuery(studentId, next) {
        try {
            const query = await Repository.getQueryByStudentId(studentId)
            throw new SUCCESS({ query })
        } catch (err) {
            next(err)
        }
    }


    static async update(id, payload, next) {
        try {
            const query = await Repository.updateEnded(id, payload)
            throw new SUCCESS({ query: "Updated" })
        } catch (err) {
            next(err)
        }
    }

    static async updateMaturity(id, payload, next) {
        try {
            const query = await Repository.updateMaturity(id, payload)
            throw new SUCCESS({ query: "Updated" })
        } catch (err) {
            next(err)
        }
    }

    static async delete(id, next) {
        try {
            const query = await Repository.delete(id)
            throw new SUCCESS({ query: "Deleted Query" })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = QueryManager