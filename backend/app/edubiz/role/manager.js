const { SUCCESS, INTERNAL_SERVER_ERROR, CREATESUCCESS } = require("../../common/exceptions")
const Repository = require("./repository")

class RoleManager {
    static async getAllRoles(next) {
        try {
            const roles = await Repository.getAllRoles()
            if (!roles) {
                throw new SUCCESS({ roles: [] })
            } else {
                throw new SUCCESS({ roles })
            }
        } catch (err) {
            next(err)
        }
    }


    static async postRoles(payload, next) {
        try {
            const roles = await Repository.createRole(payload)
            const _roles = await Repository.getRoleById(roles.dataValues.id)
            if (!_roles) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ roles: _roles })
        } catch (err) {
            next(err)
        }
    }




    static async updateRole(id, payload, next) {
        try {
            const roles = await Repository.putRole(id, payload)
            if (roles === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const student = await Repository.getRoleById(id)
            throw new SUCCESS({ roles })
        } catch (err) {
            next(err)
        }
    }

    static async delete(id, next) {
        try {
            const std = await Repository.removeRole(id)
            if (std) {
                throw new SUCCESS({ message: "User Deleted" })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = RoleManager