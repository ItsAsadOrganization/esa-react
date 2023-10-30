const { Router } = require("express");
const Manager = require("../edubiz/tutors/manager");
let tutorRouter = Router()

tutorRouter.get("/tutors", (req, res, next) => {
    try {
        Manager.getAllTutors(next)
    } catch (err) {
        next(err)
    }
})

tutorRouter.post("/tutor", (req, res, next) => {
    try {
        const payload = req.body
        Manager.postTutor(payload, next)
    } catch (err) {
        next(err)
    }
})

tutorRouter.put("/tutor", (req, res, next) => {
    try {
        const payload = req.body
        const id = req.query.id
        Manager.putTutor(id, payload, next)
    } catch (err) {
        next(err)
    }
})

module.exports = tutorRouter