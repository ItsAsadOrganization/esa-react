const Groups = require("../../models/groups")


class GroupRepository {
    static async getAllGroups(paranoid) {
        const studnets = await Groups.findAll({
            raw: true,
            paranoid: paranoid,
            group: "createdAt"
        })
        return studnets
    }
}

module.exports = GroupRepository