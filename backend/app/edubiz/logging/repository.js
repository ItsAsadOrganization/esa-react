const Logging = require("../../models/logging");


class LoggingRepository {
    static async getLogs() {
        const response = await Logging.findAll({
            order: [
                ["id", "DESC"]
            ]
        })
        return response
    } 
}

module.exports = LoggingRepository