
const Repository = require('./repository')

class GroupManager {

    static async getAllGroups(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true

            const groups = await Repository.getAllGroups(paranoid)
            if (!groups) {
                throw new SUCCESS({ groups: [] })
            } else {
                throw new SUCCESS({ groups })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = GroupManager