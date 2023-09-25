const { Op } = require("sequelize")
const Roles = require("../../models/roles")

class RoleRepository {
    static async getAllRoles() {
        const roles = await Roles.findAll({
            raw: true
        })
        return roles
    }

    static async createRole(payload) {
        const role = await Roles.create(payload)
        return role
    }

    static async getRoleById(id) {
        const role = await Roles.findByPk(id)
        return role
    }

    static async removeRole(id) {
        return await Roles.destroy({
            where: {
                id: {
                    [Op.eq]: id
                }
            },
        })
    }

    static async putRole(id, payload) {
        const role = await Roles.update(payload, {
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        })
        return role
    }


}

module.exports = RoleRepository