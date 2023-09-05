
const { Router } = require("express");
const Manager = require("../edubiz/payslips/manager");
let paySlipRouter = Router()

paySlipRouter.get("/generate", (req, res, next) => {
    try {
        Manager.generatePaySlips(next)
    } catch (err) {
        next(err)
    }
})

paySlipRouter.get("/payslips", (req, res, next) => {
    try {
        Manager.getPaySlips(next)
    } catch (err) {
        next(err)
    }
})

paySlipRouter.put("/payslip", (req, res, next) => {
    try {
        const id = req.query.id
        const payload = req.body
        Manager.updatePaySlip(id, payload, next)
    } catch (err) {
        next(err)
    }
})


module.exports = paySlipRouter