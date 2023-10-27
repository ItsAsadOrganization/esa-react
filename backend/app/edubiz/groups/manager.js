
const Repository = require('./repository')

class GroupManager {

    static async getAllGroups(session, next) {
        try {
            const groups = await Repository.getAllGroups()
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