const Classes = require("../../models/classes")

class ClassesRepository {
    static async getAllClasses() {
        const classes = await Classes.findAll()
        return classes
    }
}

module.exports = ClassesRepository