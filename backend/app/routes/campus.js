const { Router } = require("express");
const Manager = require("../edubiz/campus/manager");
let campusRouter = Router()

campusRouter.get("/campuses", (req, res, next) => {
    try {
        Manager.getAllCampuses(next)
    } catch (err) {
        next(err)
    }
})

campusRouter.post("/campus", (req, res, next) => {
    try {
        const payload = req.body
        Manager.create(payload, next)
    } catch (err) {
        next(err)
    }
})

campusRouter.put("/campus", (req, res, next) => {
    try {
        const id = req.query.id
        const payload = req.body
        Manager.updateCampus(id, payload, next)
    } catch (err) {
        next(err)
    }
})

campusRouter.delete("/campus", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.deleteCampus(id, next)
    } catch (err) {
        next(err)
    }
})

module.exports = campusRouter