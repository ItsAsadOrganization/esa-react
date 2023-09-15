const { SUCCESS, INTERNAL_SERVER_ERROR, CREATESUCCESS } = require("../../common/exceptions")
const NotificationRepository = require("../notification/repository")
const Repository = require("./repository")

class StudentsManager {
    static async getAllStudents(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true
            const students = await Repository.getAllStudents(paranoid)
            if (!students) {
                throw new SUCCESS({ students: [] })
            } else {
                throw new SUCCESS({ students })
            }
        } catch (err) {
            next(err)
        }
    }
    
    static async getAllStudentsWithClasses( next) {
        try {
            const students = await Repository.getAllStudentsWithClasses()
            if (!students) {
                throw new SUCCESS({ students: [] })
            } else {
                throw new SUCCESS({ students })
            }
        } catch (err) {
            next(err)
        }
    }
    static async getAllStudents(session, next) {
        try {
            const sessionData = session.user
            const paranoid = sessionData.role === "superadmin" ? false : true
            const students = await Repository.getAllStudents(paranoid)
            if (!students) {
                throw new SUCCESS({ students: [] })
            } else {
                throw new SUCCESS({ students })
            }
        } catch (err) {
            next(err)
        }
    }

    static async postStudent(payload, session, next) {
        try {
            const student = await Repository.createStudent(payload)
            const _student = await Repository.getStudentById(student.dataValues.id)
            if (!_student) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            await NotificationRepository.saveNotifications({
                title: "Student Admission",
                description: `A new student has been admitted with id ${student.dataValues.id}`,
            })
            throw new CREATESUCCESS({ student: _student })
        } catch (err) {
            next(err)
        }
    }

    static async getStudentById(id, next) {
        try {
            const _student = await Repository.getStudentById(id)
            if (!_student) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ student: _student })
        } catch (err) {
            next(err)
        }
    }

    static async getStudentByClassId(id, next) {
        try {
            const _student = await Repository.getStudentByClass(id)
            if (!_student) {
                throw new INTERNAL_SERVER_ERROR("Error inserting user record")
            }
            throw new SUCCESS({ student: _student })
        } catch (err) {
            next(err)
        }
    }

    static async updateStudent(id, payload, next) {
        try {
            const _student = await Repository.putStudent(id, payload)
            if (_student === 0) {
                throw new INTERNAL_SERVER_ERROR("Error updating record")
            }
            const student = await Repository.getStudentById(id)
            await NotificationRepository.saveNotifications({
                title: "Record Update",
                description: `Student record has been updated with id ${id}`,
            })

            throw new SUCCESS({ student })
        } catch (err) {
            next(err)
        }
    }

    static async delete(id, next) {
        try {
            const std = await Repository.removeRecord(id)
            if (std) {
                await NotificationRepository.saveNotifications({
                    title: "Record Deletion",
                    description: `Student record has been deleted with id ${id}`,
                })
                throw new SUCCESS({ message: "User Deleted" })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = StudentsManager