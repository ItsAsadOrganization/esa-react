const { SUCCESS, NOTFOUND, UNAUTHORIZED } = require("../../common/exceptions")
const VoucherManager = require("../vouchers/manager")
const Repository = require("./repository")


class UserManager {
    static async login(username, password, sessionData, next) {
        try {
            const response = await Repository.getLoginDetails(username, password)
            if (!response) {
                throw new UNAUTHORIZED("User not found with provided credentials")
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
            const users = await Repository.getAllUsers(true)
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

    static async updateUser(id, payload, next) {
        try {
            const u = await Repository.update(id, payload)
            const user = await Repository.getUserById(id)
            throw new SUCCESS({ user })
        } catch (err) {
            next(err)
        }
    }

    static async updatePassword(id, payload, next) {
        try {
            const u = await Repository.updatePassword(id, payload)
            const user = await Repository.getUserById(id)
            throw new SUCCESS({ user })
        } catch (err) {
            next(err)
        }
    }

    static async delete(id, next) {
        try {
            const u = await Repository.delete(id)
            throw new SUCCESS({ user: "Record Deleted" })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserManager