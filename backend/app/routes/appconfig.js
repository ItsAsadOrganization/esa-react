const { Router } = require("express");
const Manager = require("../edubiz/app_config/manager");
let appConfigRouter = Router()

appConfigRouter.get("/config", (req, res, next) => {
    try {
        const name = req.query.name
        Manager.getAppConfigByName(name, next)
    } catch (err) {
        next(err)
    }
})

appConfigRouter.put("/config", (req, res, next) => {
    try {
        const name = req.query.name
        const payload = req.body
        Manager.updateAppConfigByName(name, payload, next)
    } catch (err) {
        next(err)
    }
})

module.exports = appConfigRouter