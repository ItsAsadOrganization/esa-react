const { Router } = require("express");
const Manager = require("../edubiz/classes/manager");
let classesRouter = Router()

classesRouter.get("/classes", (req, res, next) => {
    try {
        const sessionData = req.session.user
        const paranoid = sessionData.role === "superadmin" ? false : true
        Manager.getAllClasses(paranoid, next)
    } catch (err) {
        next(err)
    }
})


classesRouter.post("/class", (req, res, next) => {
    try {
        const payload = req.body
        Manager.postClassInfo(payload, next)
    } catch (err) {
        next(err)
    }
})


classesRouter.put("/class", (req, res, next) => {
    try {
        const payload = req.body
        const id = req.query.id
        Manager.updateClassInfo(id, payload, next)
    } catch (err) {
        next(err)
    }
})

classesRouter.delete("/class", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.deleteClass(id, next)
    } catch (err) {
        next(err)
    }
})


module.exports = classesRouter