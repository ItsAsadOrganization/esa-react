const Groups = require("../../models/groups")


class GroupRepository {
    static async getAllGroups(paranoid) {
        const studnets = await Groups.findAll({
            paranoid: paranoid
        })
        return studnets
    }
}

module.exports = GroupRepository