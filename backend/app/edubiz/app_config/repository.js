const AppConfig = require("../../models/app_config")


class AppConfigRepository {
    static async getConfigByName(name) {
        const response = await AppConfig.findAll({
            attributes: ["name", "config"],
            where: {
                name: name
            }
        })
        return response
    }

    static async updateConfig(name, payload) {
        const response = await AppConfig.update(payload, {
            where: {
                name: name
            }
        })
        return response
    }
}

module.exports = AppConfigRepository