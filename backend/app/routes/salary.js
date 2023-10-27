
const { Router } = require("express");
const Manager = require("../edubiz/salaries/manager");
let salaryRouter = Router()

salaryRouter.get("/salary", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.getSalaryByTutorId(id, next)
    } catch (err) {
        next(err)
    }
})

salaryRouter.post("/salary", (req, res, next) => {
    try {
        const paylaod = req.body
        Manager.postTutorSalary(paylaod, next)
    } catch (err) {
        next(err)
    }
})

salaryRouter.delete("/salary", (req, res, next) => {
    try {
        const id = req.query.id
        Manager.deleteSalary(id, next)
    } catch (err) {
        next(err)
    }
})


module.exports = salaryRouter