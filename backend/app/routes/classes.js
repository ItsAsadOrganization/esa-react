const { Router } = require("express");
const Manager = require("../edubiz/classes/manager");
let classesRouter = Router()

classesRouter.get("/classes", (req, res, next) => {
    try {
        Manager.getAllClasses(next)
    } catch (err) {
        next(err)
    }
})


module.exports = classesRouter