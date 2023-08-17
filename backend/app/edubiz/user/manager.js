const { SUCCESS, NOTFOUND } = require("../../common/exceptions")
const Repository = require("./repository")


class UserManager {
    static async login(username, password, sessionData, next) {
        try {
            const response = await Repository.getLoginDetails(username, password)
            if (!response) {
                throw new NOTFOUND("User not found with provided credentials")
            } else {
                sessionData.username = username
                sessionData.password = password
                sessionData.role = response.dataValues.role
                sessionData.userid = response.dataValues.id
                throw new SUCCESS({ user: response })
            }
        } catch (err) {
            next(err)
        }
    }


    static async logout(sessionData, next) {
        try {
            await sessionData.destroy();
            throw new SUCCESS("Session Destroyed")
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserManager