
const { Router } = require("express");
const Manager = require("../edubiz/query/manager");
let queryRouter = Router()

queryRouter.get("/queries", (req, res, next) => {
    try {
        Manager.getAllQueries(req.session, next)
    } catch (err) {
        next(err)
    }
})

queryRouter.get("/query", (req, res, next) => {
    try {
        const studentId = req.query.id
        Manager.getQuery(studentId, next)
    } catch (err) {
        next(err)
    }
})

queryRouter.put("/query", (req, res, next) => {
    try {
        const studentId = req.query.id
        const payload = req.body
        Manager.closeQuery(studentId,payload, next)
    } catch (err) {
        next(err)
    }
})

queryRouter.post("/query", (req, res, next) => {
    try {
        const payload = req.body
        Manager.postQuery(payload, next)
    } catch (err) {
        next(err)
    }
})



module.exports = queryRouter