const { CREATESUCCESS, INTERNAL_SERVER_ERROR, SUCCESS } = require('../../common/exceptions')

const Repository = require('./repository')

class TutorsManager {
    static async getAllTutors(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true
            const tutors = await Repository.getAllTutors(paranoid)
            if (!tutors) {
                throw new SUCCESS({ tutors: [] })
            } else {
                throw new SUCCESS({ tutors })
            }
        } catch (err) {
            next(err)
        }
    }

    static async postTutor(payload, session, next) {
        try {
            const tutors = await Repository.postTutor(payload)
            const _tutors = await Repository.getTutorById(tutors.dataValues.id)
            if (!_tutors) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ tutors: _tutors })
        } catch (err) {
            next(err)
        }
    }

    static async putTutor(id, payload, next) {
        try {
            const _tutors = await Repository.putTutor(id, payload)
            if (_tutors === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const tutors = await Repository.getTutorById(id)

            throw new SUCCESS({ tutors })
        } catch (err) {
            next(err)
        }
    }

    static async deleteTutor() {

    }
}

module.exports = TutorsManager