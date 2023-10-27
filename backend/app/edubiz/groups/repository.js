const Groups = require("../../models/groups")


class GroupRepository {
    static async getAllGroups() {
        const studnets = await Groups.findAll({
            raw: true,
            group: "createdAt"
        })
        return studnets
    }
}

module.exports = GroupRepository