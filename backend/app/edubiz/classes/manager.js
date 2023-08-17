const { SUCCESS } = require("../../common/exceptions")
const Repository = require("./repository")

class ClassManager {

    static async getAllClasses(next) {
        try {
            const classes = await Repository.getAllClasses()
            if (!classes) {
                throw new SUCCESS({ classes: [] })
            } else {
                throw new SUCCESS({ classes })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ClassManager