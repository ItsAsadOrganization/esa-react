const logger = require("../../common/logging");
const Users = require("../../models/users");

class UserRepository {

    static async getLoginDetails(username, password) {
        const user = await Users.findOne({
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