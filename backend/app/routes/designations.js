
const { Router } = require("express");
const Manager = require("../edubiz/designations/manager");
let designationRouter = Router()

designationRouter.get("/designations", (req, res, next) => {
    try {
        Manager.getAllDesignations(req.session,next)
    } catch (err) {
        next(err)
    }
})

designationRouter.post("/designation", (req, res, next) => {
    try {
        Manager.postDesignations(req.body, next)
    } catch (err) {
        next(err)
    }
})

designationRouter.put("/designation", (req, res, next) => {
    try {
        const payload = req.body
        const id = req.query.id
        Manager.updateDesignations(id, payload, next)
    } catch (err) {
        next(err)
    }
})

designationRouter.delete("/designation", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.removeDesignation(id, next)
    } catch (err) {
        next(err)
    }
})

module.exports = designationRouter