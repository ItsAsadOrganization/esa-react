
const { Router } = require("express");
const Manager = require("../edubiz/role/manager");
let roleRouter = Router()

roleRouter.get("/roles", (req, res, next) => {
    try {
        Manager.getAllRoles(next)
    } catch (err) {
        next(err)
    }
})

roleRouter.post("/role", (req, res, next) => {
    try {
        Manager.postRoles(req.body, next)
    } catch (err) {
        next(err)
    }
})

roleRouter.put("/role", (req, res, next) => {
    try {
        const payload = req.body
        const id = req.query.id
        Manager.updateRole(id, payload, next)
    } catch (err) {
        next(err)
    }
})

roleRouter.delete("/role", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.delete(id, next)
    } catch (err) {
        next(err)
    }
})

module.exports = roleRouter