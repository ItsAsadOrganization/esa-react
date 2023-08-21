const { SUCCESS, INTERNAL_SERVER_ERROR, CREATESUCCESS } = require("../../common/exceptions")
const Repository = require("./repository")
const StudentsRepository = require("../student/repository")

class ClassManager {

    static async getAllClasses(paranoid, next) {
        try {
            const classes = await Repository.getAllClasses(paranoid)
            if (!classes) {
                throw new SUCCESS({ classes: [] })
            } else {
                throw new SUCCESS({ classes })
            }
        } catch (err) {
            next(err)
        }
    }

    static async postClassInfo(payload, next) {
        try {
            const classes = await Repository.createClass(payload)
            const _classes = await Repository.getClassById(classes.dataValues.id)
            if (!_classes) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new CREATESUCCESS({ classes: _classes })
        } catch (err) {
            next(err)
        }
    }

    static async updateClassInfo(id, payload, next) {
        try {
            const classes = await Repository.updateClass(id, payload)
            if (classes === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const _classes = await Repository.getClassById(id)

            throw new SUCCESS({ classes: _classes })
        } catch (err) {
            next(err)
        }
    }


    static async deleteClass(id, next) {
        try {
            const studentsInClass = await StudentsRepository.getStudentByClass(id, next)
            if (studentsInClass.length > 0) {
                throw new INTERNAL_SERVER_ERROR({ message: "Failed! there are number of students associated with this class. Please delete those records and try again" })
            }
            const classes = await Repository.delete(id)
            if (classes) {
                throw new SUCCESS({ message: "Class Deleted" })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ClassManager