const { Router } = require("express");
const Manager = require("../edubiz/student/manager");
const { NOTFOUND } = require("../common/exceptions");
let studentsRouter = Router()

studentsRouter.get("/students", (req, res, next) => {
    try {
        Manager.getAllStudents(req.session, next)
    } catch (err) {
        next(err)
    }
})

studentsRouter.post("/student", async (req, res, next) => {
    try {
        const payload = req.body
        const session = req.session
        Manager.postStudent(payload, session, next)
    } catch (err) {
        next(err)
    }
})

studentsRouter.get("/student", (req, res, next) => {
    try {
        const userId = req.query.id
        const class_id = req.query.class_id
        if(userId){
            Manager.getStudentById(userId, next)
        } else if(class_id) {
            Manager.getStudentByClassId(class_id, next)
        }
    } catch (err) {
        next(err)
    }
})

studentsRouter.put("/student", (req, res, next) => {
    try {
        const payload = req.body
        const id = req.query.id
        Manager.updateStudent(id, payload, next)
    } catch (err) {
        next(err)
    }
})


studentsRouter.delete("/student", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.delete(id, next)
    } catch (err) {
        next(err)
    }
})


module.exports = studentsRouter