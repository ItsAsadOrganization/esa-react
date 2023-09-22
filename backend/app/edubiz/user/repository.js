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

    static async getAllUsers(panaroid) {
        const user = await Users.findAll({
            include: [
                {
                    model: Roles,
                    attributes: ["name"]
                }
            ],
            raw: true,
            paranoid: panaroid
        })
        return user
    }

    static async create(payload) {
        const user = await Users.create(payload)
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