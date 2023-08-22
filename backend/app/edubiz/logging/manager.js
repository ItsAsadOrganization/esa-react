const { SUCCESS } = require("../../common/exceptions")
const Repository = require("./repository")


class LoggingManager {
    static async getLogs(next) {
        try {
            const logs = await Repository.getLogs()
            if (!logs) {
                throw new SUCCESS({ logs: [] })
            } else {
                throw new SUCCESS({ logs })
            }
        } catch (err) {
            next(err)
        }
    }
}


module.exports = LoggingManager