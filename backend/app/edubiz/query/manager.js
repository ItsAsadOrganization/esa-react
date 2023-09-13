
const { INTERNAL_SERVER_ERROR, SUCCESS, CREATESUCCESS } = require('../../common/exceptions')
const NotificationRepository = require('../notification/repository')
const Repository = require('./repository')

class QueryManager {

    static async getAllQueries(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true

            const queries = await Repository.getAllQueries(paranoid)
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
            console.log("\n\n\n", payload)
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


    static async closeQuery(studentId, payload, next) {
        try {
            payload["comment"] = `Conversation has been closed by Asad Mehmood`
            await Repository.postQuery(payload)
            const query = await Repository.updateEnded(studentId)
            await NotificationRepository.saveNotifications({
                title: "Query Closed",
                description: `Query conversation has been closed for student having ID: `+studentId,
            })
            throw new SUCCESS({ query : "Conversation closed" })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = QueryManager