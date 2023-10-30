const logger = require("../../common/logging");
const Roles = require("../../models/roles");
const Users = require("../../models/users");

class UserRepository {

    static async getLoginDetails(username, password) {
        const user = await Users.findOne({
            raw: true,
            include: [
                {
                    model: Roles,
                    attributes: ["name", "permissions"]
                }
            ],
            where: {
                email: username,
                password: password
            }
        })
        return user
    }

    static async getAllUsers() {
        const user = await Users.findAll({
            include: [
                {
                    model: Roles,
                    attributes: ["name"]
                }
            ],
            raw: true,
        })
        return user
    }

    static async create(payload) {
        const user = await Users.create(payload)
        return user
    }

    static async update(id, payload) {
        const user = await Users.update({
            name: payload.name,
            email: payload.email,
            roleId: payload.roleId
        }, { where: { id } })
        return user
    }

    static async updatePassword(id, payload) {
        const user = await Users.update({
            password: payload.password
        }, {
            where: { id },
            individualHooks: true,
        })
        return user
    }

    static async delete(id) {
        const user = await Users.destroy({ where: { id } })
        return user
    }

    static async getUserById(id) {
        const user = await Users.findByPk(id, {
            raw: true,
            attributes: { exclude: ['password'] },
            include: [
                { model: Roles, attributes: ["name"] }
            ]
        })
        return user
    }
}

module.exports = UserRepository