const logger = require("../../common/logging");
const Roles = require("../../models/roles");
const Users = require("../../models/users");

class UserRepository {

    static async getLoginDetails(username, password) {
        const user = await Users.findOne({
            raw: true,
            include:[
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
        const user = await Users.findAll()
        return user
    }
}

module.exports = UserRepository