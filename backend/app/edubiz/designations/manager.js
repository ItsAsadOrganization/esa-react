const { SUCCESS, CREATESUCCESS, INTERNAL_SERVER_ERROR } = require("../../common/exceptions")
const NotificationRepository = require("../notification/repository")
const Reqpository = require("./repository")



class DesignationManager {
    static async getAllDesignations(next) {
        try {
            const designations = await Reqpository.getAllDesignation()
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
            await NotificationRepository.saveNotifications({
                title: "Designation Created",
                description: `A new designation has been added with name ${payload.name}`,
            })
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
            await NotificationRepository.saveNotifications({
                title: "Designation Update",
                description: `Designation ${payload.name} Updated`,
            })
            throw new SUCCESS({ designation: _designations })
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
            await NotificationRepository.saveNotifications({
                title: "Designation Deleted",
                description: `Designation dispersed with name ${payload.name}`,
            })
            throw new SUCCESS({ message: "Deleted Successfully" })
        } catch (err) {
            next(err)
        }
    }

}


module.exports = DesignationManager