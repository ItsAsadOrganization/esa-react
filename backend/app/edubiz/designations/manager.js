const { SUCCESS, CREATESUCCESS, INTERNAL_SERVER_ERROR } = require("../../common/exceptions")
const Reqpository = require("./repository")



class DesignationManager {
    static async getAllDesignations(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true

            const designations = await Reqpository.getAllDesignation(paranoid)
            if (!designations) {
                throw new SUCCESS({ designations: [] })
            } else {
                throw new SUCCESS({ designations })
            }

        } catch (err) {
            next(err)
        }
    }

    static async postDesignations(payload, next) {
        try {
            const _designations = await Reqpository.createDesignation(payload)
            const designation = await Reqpository.getDesignatinById(_designations.dataValues.id)
            if (!designation) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ designation })
        } catch (err) {
            next(err)
        }
    }

    static async updateDesignations(id, payload, next) {
        try {
            const _designations = await Reqpository.update(id, payload)
            const designation = await Reqpository.getDesignatinById(id)
            if (!designation) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ designation })
        } catch (err) {
            next(err)
        }
    }
    
    static async removeDesignation(id, next) {
        try {
            const designation = await Reqpository.remove(id)
            if (!designation) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ message: "Deleted Successfully" })
        } catch (err) {
            next(err)
        }
    }

}


module.exports = DesignationManager