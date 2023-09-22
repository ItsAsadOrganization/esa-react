const { SUCCESS, NOTFOUND } = require("../../common/exceptions")
const VoucherManager = require("../vouchers/manager")
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
                sessionData.role = response.roleId
                sessionData.userid = response.id
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

    static async getAllUsers(next) {
        try {
            const users = await Repository.getAllUsers(false)
            throw new SUCCESS({ users })
        } catch (err) {
            next(err)
        }
    }
    
    static async createUser(payload, next) {
        try {
            const u = await Repository.create(payload)
            const user = await Repository.getUserById(u.dataValues.id) 
            throw new SUCCESS({ user })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserManager