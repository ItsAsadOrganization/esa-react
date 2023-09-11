const { SUCCESS } = require("../../common/exceptions")
const Repository = require("./repository")


class AppConfigManager {
    static async getAppConfigByName(name, next) {
        try {
            const response = await Repository.getConfigByName(name)
            throw new SUCCESS({ config: response })
        } catch (err) {
            next(err)
        }
    }


    static async updateAppConfigByName(name,payload, next) {
        try {
            await Repository.updateConfig(name, payload)
            const response = await Repository.getConfigByName(name)
            throw new SUCCESS({ config: response })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = AppConfigManager