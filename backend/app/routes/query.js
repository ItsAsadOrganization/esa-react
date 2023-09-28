
const { Router } = require("express");
const Manager = require("../edubiz/query/manager");
let queryRouter = Router()

queryRouter.get("/queries", (req, res, next) => {
    try {
        const id = req.query.id
        if(id){
            Manager.getAllQueriesByUId(id, next)
        }else{
            Manager.getAllQueries(req.session, next)
        }
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

queryRouter.delete("/query", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.delete(id, next)
    } catch (err) {
        next(err)
    }
})

queryRouter.put("/query", (req, res, next) => {
    try {
        const id = req.query.id
        const payload = req.body
        Manager.update(id, payload, next)
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

queryRouter.patch("/query", (req, res, next) => {
    try {
        const id = req.query.id
        const payload = req.body
        Manager.updateMaturity(id, payload, next)
    } catch (err) {
        next(err)
    }
})



module.exports = queryRouter